import React, { useEffect, useRef, useState, useMemo } from 'react';
import QRCode from 'qrcode';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './QRCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';

interface QRCardProps {
  title: string;
  description?: string;
  url: string;
  icon: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  background?: CardBackground;
  borderAccent?: BorderAccent;
}

// Хелпер: вытащить owner/repo из GitHub URL (поддерживает https, git+, .git и т.п.)
function extractGitHubRepo(repoUrl?: string): string | null {
  if (!repoUrl) return null;
  const normalized = repoUrl
    .replace(/^git\+/, '')
    .replace(/^git:/, 'https:')
    .replace(/\.git$/, '');

  try {
    const url = new URL(normalized);
    if (url.hostname !== 'github.com') return null;
    const parts = url.pathname.replace(/^\/+/, '').split('/');
    if (parts.length >= 2) {
      const owner = parts[0];
      const repo = parts[1];
      return `${owner}/${repo}`;
    }
  } catch {
    // ignore
  }
  return null;
}

// Хелпер: извлечь имя пакета из npm-URL
function parseNpmPackageName(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (!['www.npmjs.com', 'npmjs.com'].includes(u.hostname)) return null;
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('package');
    if (idx !== -1 && parts[idx + 1]) {
      // Поддерживает @scope/name
      const pkg = decodeURIComponent(parts.slice(idx + 1).join('/'));
      return pkg || null;
    }
  } catch {
    // ignore
  }
  return null;
}

// Хелпер: извлечь ID статьи из Habr URL (поддерживает /ru/articles/{id}/ и /post/{id}/)
function parseHabrArticleId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (!u.hostname.endsWith('habr.com')) return null;
    // Пробуем найти числовой ID в пути
    // Примеры путей: /ru/articles/926944/, /ru/post/926944/
    const m = u.pathname.match(/\/(?:[a-z]{2}\/)?(?:articles|post)\/(\d+)(?:\/|$)/i);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

const QRCard: React.FC<QRCardProps> = ({
  title,
  description,
  url,
  icon,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  cardVariant = 'default',
  background,
  borderAccent
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const expandedCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const npmPackageName = useMemo(() => parseNpmPackageName(url), [url]);
  const directGithubRepo = useMemo(() => extractGitHubRepo(url), [url]);
  const habrArticleId = useMemo(() => parseHabrArticleId(url), [url]);

  // Метрики
  const [weeklyDownloads, setWeeklyDownloads] = useState<number | null>(null);
  const [downloadsError, setDownloadsError] = useState<string | null>(null);
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [githubError, setGithubError] = useState<string | null>(null);

  // Метрики Habr
  const [habrViews, setHabrViews] = useState<number | null>(null);
  const [habrVotes, setHabrVotes] = useState<number | null>(null);
  const [habrBookmarks, setHabrBookmarks] = useState<number | null>(null);
  const [habrError, setHabrError] = useState<string | null>(null);

  // Добавляем отдельные состояния для лайков/дизлайков
  const [habrLikes, setHabrLikes] = useState<number | null>(null);
  const [habrDislikes, setHabrDislikes] = useState<number | null>(null);
  const [habrTitle, setHabrTitle] = useState<string | null>(null);

  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  // Флаги "однократной" загрузки для каждого источника
  const downloadsLoadedRef = useRef(false);
  const githubLoadedRef = useRef(false);
  const habrLoadedRef = useRef(false);
  useEffect(() => {
    // Обычный QR код
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 120,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [url]);

  useEffect(() => {
    // Увеличенный QR код - генерируется только когда нужен
    if (expandedCanvasRef.current && isExpanded) {
      QRCode.toCanvas(expandedCanvasRef.current, url, {
        width: 250,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [url, isExpanded]);

  const handleQRClick = async () => {
    setIsExpanded(!isExpanded);
    
    // Генерируем увеличенный QR код при открытии
    if (!isExpanded && expandedCanvasRef.current) {
      await QRCode.toCanvas(expandedCanvasRef.current, url, {
        width: 250,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  };

  // Загрузка weekly downloads (только для npm ссылок)
  useEffect(() => {
    let cancelled = false;
    if (!npmPackageName || !isActive || downloadsLoadedRef.current) {
      return;
    }

    const loadDownloads = async () => {
      setDownloadsError(null);
      try {
        const resp = await fetch(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(npmPackageName)}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data: { downloads: number } = await resp.json();
        if (!cancelled) {
          setWeeklyDownloads(typeof data.downloads === 'number' ? data.downloads : null);
          downloadsLoadedRef.current = true;
        }
      } catch (e: any) {
        if (!cancelled) {
          setDownloadsError(e?.message || 'Ошибка загрузки');
          setWeeklyDownloads(null);
        }
      }
    };

    loadDownloads();
    return () => { cancelled = true; };
  }, [npmPackageName, isActive]);

  // Загрузка GitHub stars:
  // - если URL — GitHub, парсим сразу
  // - если URL — npm, пытаемся найти репозиторий через npm registry
  useEffect(() => {
    let cancelled = false;

    if (!isActive || githubLoadedRef.current) {
      return;
    }

    const resolveRepoAndLoadStars = async () => {
      setGithubError(null);
      let repo = directGithubRepo || null;

      try {
        if (!repo && npmPackageName) {
          const regResp = await fetch(`https://registry.npmjs.org/${encodeURIComponent(npmPackageName)}`);
          if (regResp.ok) {
            const reg: { repository?: { url?: string }, homepage?: string } = await regResp.json();
            repo = extractGitHubRepo(reg?.repository?.url || reg?.homepage || '');
          }
        }

        if (repo) {
          const ghResp = await fetch(`https://api.github.com/repos/${repo}`);
          if (!ghResp.ok) throw new Error(`HTTP ${ghResp.status}`);
          const gh: { stargazers_count: number } = await ghResp.json();
          if (!cancelled) {
            setGithubStars(typeof gh.stargazers_count === 'number' ? gh.stargazers_count : null);
            githubLoadedRef.current = true;
          }
        } else {
          if (!cancelled) setGithubStars(null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setGithubError(e?.message || 'Ошибка GitHub');
          setGithubStars(null);
        }
      }
    };

    resolveRepoAndLoadStars();
    return () => { cancelled = true; };
  }, [directGithubRepo, npmPackageName, isActive]);

  // Загрузка метрик Habr (просмотры, лайки, дизлайки, закладки) — только основной JSON без counters
  useEffect(() => {
    let cancelled = false;

    if (!isActive || !habrArticleId || habrLoadedRef.current) {
      return;
    }

    async function tryFetchJson(urls: string[]) {
      for (const u of urls) {
        try {
          const resp = await fetch(u);
          if (!resp.ok) continue;
          const data = await resp.json();
          return data as any;
        } catch {
          // пробуем следующий
        }
      }
      return null;
    }

    function toNum(v: any): number | null {
      const n = typeof v === 'string' ? Number(v) : v;
      return typeof n === 'number' && Number.isFinite(n) ? n : null;
    }

    function extractFromJson(d: any) {
      const stats = d?.statistics ?? d?.data?.statistics ?? null;

      const views =
        toNum(stats?.readingCount) ??
        toNum(d?.readingCount) ??
        null;

      const likes =
        toNum(stats?.votesCountPlus) ??
        toNum(d?.votesCountPlus) ??
        null;

      const dislikes =
        toNum(stats?.votesCountMinus) ??
        toNum(d?.votesCountMinus) ??
        null;

      const bookmarks =
        toNum(stats?.favoritesCount) ??
        toNum(d?.favoritesCount) ??
        null;

      // Бэкап: суммарные голоса (в UI не показываем)
      const votes =
        toNum(stats?.votesCount) ??
        toNum(d?.votesCount) ??
        toNum(stats?.score) ??
        toNum(d?.score) ??
        null;

      // NEW: пробуем достать заголовок
      const title: string | null =
        (typeof d?.title === 'string' ? d.title : null) ??
        (typeof d?.data?.title === 'string' ? d.data.title : null) ??
        null;

      return { views, likes, dislikes, bookmarks, votes, title };
    }

    const loadHabr = async () => {
      setHabrError(null);

      try {
        // Единственный запрос к основному эндпоинту
        const main = await tryFetchJson([
          `https://habr.com/kek/v2/articles/${habrArticleId}/`,
        ]);

        if (main) {
          const { views, likes, dislikes, bookmarks, votes, title } = extractFromJson(main);
          const anyFound = [views, likes, dislikes, bookmarks].some(v => v != null);
          if (!cancelled && anyFound) {
            setHabrViews(views);
            setHabrLikes(likes);
            setHabrDislikes(dislikes);
            setHabrBookmarks(bookmarks);
            setHabrVotes(votes);
            // NEW: сохраняем заголовок
            if (typeof title === 'string' && title.trim()) {
              setHabrTitle(title.trim());
            }
            habrLoadedRef.current = true;
            return;
          }
        }

        if (!cancelled) {
          setHabrError('Недоступны метрики Habr');
        }
      } catch (e: any) {
        if (!cancelled) {
          setHabrError(e?.message || 'Ошибка Habr');
        }
      }
    };

    loadHabr();
    return () => { cancelled = true; };
  }, [habrArticleId, isActive]);

  // Мини-логотипы
const GitHubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// ОБНОВЛЕНО: npm — используем надёжный SVG CDN с запасным источником
const NpmIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <img
    src="https://www.vectorlogo.zone/logos/npmjs/npmjs-icon.svg"
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    referrerPolicy="no-referrer"
    onError={(e) => {
      const img = e.currentTarget as HTMLImageElement;
      // запасной источник — simple-icons
      img.onerror = null;
      img.src = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/npm.svg";
    }}
    style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
  />
);

const HabrIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <img
    src="https://habr.com/favicon.ico"
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'text-bottom', borderRadius: 2 }}
  />
);

  // NEW: Иконка и подпись для ссылки (GitHub/NPM/Habr) — оригинальные логотипы
  const linkMeta = useMemo(() => {
    if (habrArticleId) {
      return {
        icon: <HabrIcon size={16} />,
        label: habrTitle ?? `Habr #${habrArticleId}`
      };
    }
    if (npmPackageName) {
      return {
        icon: <NpmIcon size={16} />,
        label: npmPackageName
      };
    }
    if (directGithubRepo) {
      return {
        icon: <GitHubIcon size={16} />,
        label: directGithubRepo
      };
    }
    return {
      icon: <span aria-hidden="true">🔗</span>,
      label: url
    };
  }, [habrArticleId, habrTitle, npmPackageName, directGithubRepo, url]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <CardWrapper 
        variant={cardVariant} 
        size="medium"
        hoverable={true}
        background={background}
        borderAccent={borderAccent}
        className={`${styles.qrContent} ${animationClasses}`}
      >
        <div className={styles.qrCodeWrapper}>
          <canvas 
            ref={canvasRef} 
            className={styles.qrCode} 
            onClick={handleQRClick}
            style={{
              cursor: 'pointer',
              opacity: isExpanded ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>
        
        <div className={styles.qrInfo} style={{
          opacity: isExpanded ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          <h3>{icon} {title}</h3>
          {description && <p className={styles.qrDescription}>{description}</p>}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.qrLink}
          >
            <span aria-hidden="true" style={{ marginRight: 6 }}>{linkMeta.icon}</span>
            <span>{linkMeta.label}</span>
          </a>

          {/* Метрики: Habr → просмотры/голоса/закладки, npm → downloads + stars, GitHub → только stars */}
          {habrArticleId ? (
            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'nowrap', alignItems: 'center' }}>
              <div title="Просмотры" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span aria-hidden="true">👁️</span>
                <strong>{habrError ? '—' : (habrViews != null ? new Intl.NumberFormat().format(habrViews) : '—')}</strong>
              </div>
              <div title="Лайки" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span aria-hidden="true">👍</span>
                <strong>{habrError ? '—' : (habrLikes != null ? new Intl.NumberFormat().format(habrLikes) : '—')}</strong>
              </div>
              <div title="Дизлайки" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span aria-hidden="true">👎</span>
                <strong>{habrError ? '—' : (habrDislikes != null ? new Intl.NumberFormat().format(habrDislikes) : '—')}</strong>
              </div>
              <div title="Закладки" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span aria-hidden="true">🔖</span>
                <strong>{habrError ? '—' : (habrBookmarks != null ? new Intl.NumberFormat().format(habrBookmarks) : '—')}</strong>
              </div>
            </div>
          ) : ((npmPackageName) || (directGithubRepo)) && (
            <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'nowrap', alignItems: 'center' }}>
              {npmPackageName && (
                <div title="Скачивания за последнюю неделю" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span aria-hidden="true">📥</span>
                  <strong>{downloadsError ? '—' : (weeklyDownloads != null ? new Intl.NumberFormat().format(weeklyDownloads) : '—')}</strong>
                </div>
              )}
              <div title="Звезды GitHub" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span aria-hidden="true">⭐</span>
                <strong>{githubError ? '—' : (githubStars != null ? new Intl.NumberFormat().format(githubStars) : '—')}</strong>
              </div>
            </div>
          )}
        </div>
      </CardWrapper>
      
      {/* Увеличенный QR код поверх всего содержимого */}
      {isExpanded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background-secondary)',
          zIndex: 10,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            padding: 'var(--space-16)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}>
            <canvas 
              ref={expandedCanvasRef} 
              onClick={handleQRClick}
              style={{
                cursor: 'pointer',
                display: 'block',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// В конце файла: оставляем только экспорт, удаляем внешний linkMeta и второй return/JSX
export default QRCard;