import React, { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './QRCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';
import { BorderAccent } from '../../types/BorderAccent';

interface NPMCardProps {
  packageName: string;
  title: string;
  description?: string;
  url?: string; // Если не задана, используем страницу пакета на npmjs.com
  icon?: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'minimal';
  background?: CardBackground;
  borderAccent?: BorderAccent;
  githubRepo?: string; // Необязательный override, формат "owner/repo"
}

type NpmDownloadsResponse = {
  downloads: number;
  start?: string;
  end?: string;
  package?: string;
};

type NpmRegistryRepository = {
  type?: string;
  url?: string;
};

type NpmRegistryResponse = {
  repository?: NpmRegistryRepository;
  homepage?: string;
};

type GitHubRepoResponse = {
  stargazers_count: number;
};

function formatNumber(n: number | null | undefined) {
  if (typeof n !== 'number') return '—';
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
}

function extractGitHubRepo(repoUrl?: string): string | null {
  if (!repoUrl) return null;
  // Примеры: "git+https://github.com/user/repo.git", "https://github.com/user/repo", "git://github.com/user/repo.git"
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
    // ignore URL parse error
  }
  return null;
}

const NPMCard: React.FC<NPMCardProps> = ({
  packageName,
  title,
  description,
  url,
  icon = '📦',
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  cardVariant = 'default',
  background,
  borderAccent,
  githubRepo
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const expandedCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const npmPageUrl = useMemo(() => url || `https://www.npmjs.com/package/${packageName}`, [url, packageName]);

  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  const [weeklyDownloads, setWeeklyDownloads] = useState<number | null>(null);
  const [downloadsError, setDownloadsError] = useState<string | null>(null);

  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [githubError, setGithubError] = useState<string | null>(null);

  // Генерация QR
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, npmPageUrl, {
        width: 120,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).catch(() => {});
    }
  }, [npmPageUrl]);

  useEffect(() => {
    if (expandedCanvasRef.current && isExpanded) {
      QRCode.toCanvas(expandedCanvasRef.current, npmPageUrl, {
        width: 250,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).catch(() => {});
    }
  }, [npmPageUrl, isExpanded]);

  const handleQRClick = async () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && expandedCanvasRef.current) {
      try {
        await QRCode.toCanvas(expandedCanvasRef.current, npmPageUrl, {
          width: 250,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
      } catch {
        // ignore
      }
    }
  };

  // Загрузка weekly downloads
  useEffect(() => {
    let cancelled = false;

    const loadDownloads = async () => {
      setDownloadsError(null);
      try {
        const resp = await fetch(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(packageName)}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data: NpmDownloadsResponse = await resp.json();
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
  }, [packageName]);

  // Загрузка GitHub stars
  useEffect(() => {
    let cancelled = false;

    const resolveRepoAndLoadStars = async () => {
      setGithubError(null);
      let repo = githubRepo || null;

      try {
        if (!repo) {
          const regResp = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`);
          if (regResp.ok) {
            const reg: NpmRegistryResponse = await regResp.json();
            repo = extractGitHubRepo(reg?.repository?.url || reg?.homepage || '');
          }
        }

        if (repo) {
          const ghResp = await fetch(`https://api.github.com/repos/${repo}`);
          if (!ghResp.ok) throw new Error(`HTTP ${ghResp.status}`);
          const gh: GitHubRepoResponse = await ghResp.json();
          if (!cancelled) {
            setGithubStars(typeof gh.stargazers_count === 'number' ? gh.stargazers_count : null);
          }
        } else {
          if (!cancelled) {
            setGithubStars(null);
          }
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
  }, [packageName, githubRepo]);

  return (
    <div style={{ position: 'relative' }}>
      <CardWrapper
        variant={cardVariant}
        background={background}
        borderAccent={borderAccent}
        className={`${styles.qrCard} ${animationClasses}`}
      >
        {/* QR блок */}
        <div className={styles.qrContainer}>
          <canvas
            ref={canvasRef}
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
            href={npmPageUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.qrLink}
          >
            {npmPageUrl}
          </a>

          {/* метрики в одну строку, только иконка + число */}
          <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'nowrap', alignItems: 'center' }}>
            <div title="Скачивания за последнюю неделю" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span aria-hidden="true">📥</span>
              <strong>{downloadsError ? '—' : formatNumber(weeklyDownloads)}</strong>
            </div>
            <div title="Звезды GitHub (если найдется репозиторий)" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span aria-hidden="true">⭐</span>
              <strong>{githubError ? '—' : formatNumber(githubStars)}</strong>
            </div>
          </div>
        </div>
      </CardWrapper>

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

export default NPMCard;