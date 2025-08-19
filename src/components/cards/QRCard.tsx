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
  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

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
    if (!npmPackageName) {
      setWeeklyDownloads(null);
      setDownloadsError(null);
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
  }, [npmPackageName]);

  // Загрузка GitHub stars:
  // - если URL — GitHub, парсим сразу
  // - если URL — npm, пытаемся найти репозиторий через npm registry
  useEffect(() => {
    let cancelled = false;

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
  }, [directGithubRepo, npmPackageName]);

  // Загрузка метрик Habr (просмотры, лайки, дизлайки, закладки) — только JSON, без HTML-фолбэка
  useEffect(() => {
    let cancelled = false;

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

      // Оставляем агрегированную метрику голосов как бэкап (не показываем в UI)
      const votes =
        toNum(stats?.votesCount) ??
        toNum(d?.votesCount) ??
        toNum(stats?.score) ??
        toNum(d?.score) ??
        null;

      return { views, likes, dislikes, bookmarks, votes };
    }

    const loadHabr = async () => {
      setHabrError(null);
      setHabrViews(null);
      setHabrVotes(null);
      setHabrBookmarks(null);
      setHabrLikes(null);
      setHabrDislikes(null);

      if (!habrArticleId) return;

      try {
        // 1) Основной JSON
        const main = await tryFetchJson([
          `https://habr.com/kek/v2/articles/${habrArticleId}/`,
        ]);

        if (main) {
          const { views, likes, dislikes, bookmarks, votes } = extractFromJson(main);
          const anyFound = [views, likes, dislikes, bookmarks].some(v => v != null);
          if (!cancelled && anyFound) {
            setHabrViews(views);
            setHabrLikes(likes);
            setHabrDislikes(dislikes);
            setHabrBookmarks(bookmarks);
            // на всякий случай сохраним суммарные голоса
            setHabrVotes(votes);
            return;
          }
        }

        // 2) Доп. counters JSON
        const counters = await tryFetchJson([
          `https://habr.com/kek/v2/articles/${habrArticleId}/counters/`,
        ]);

        if (counters) {
          const { views, likes, dislikes, bookmarks, votes } = extractFromJson(counters);
          const anyFound = [views, likes, dislikes, bookmarks].some(v => v != null);
          if (!cancelled && anyFound) {
            setHabrViews(views);
            setHabrLikes(likes);
            setHabrDislikes(dislikes);
            setHabrBookmarks(bookmarks);
            setHabrVotes(votes);
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
  }, [habrArticleId]);

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
            {url}
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

export default QRCard;