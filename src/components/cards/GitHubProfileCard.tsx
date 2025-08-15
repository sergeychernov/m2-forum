import React, { useState, useEffect } from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import styles from './GitHubProfileCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import { CardBackground } from '../../types/CardBackground';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubProfileCardProps {
  username: string;
  animationType?: AnimationType;
  animationIndex?: number;
  animationDelay?: number;
  isActive?: boolean;
  isVisited?: boolean;
  background?: CardBackground;
}

const GitHubProfileCard: React.FC<GitHubProfileCardProps> = ({
  username,
  animationType = 'none',
  animationIndex = 0,
  animationDelay = 300,
  isActive = true,
  isVisited = false,
  background
}) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { animationClasses } = useCardAnimation({
    isActive,
    isVisited,
    animationType,
    delay: animationDelay,
    index: animationIndex
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('Пользователь не найден');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleProfileClick = () => {
    if (user) {
      window.open(user.html_url, '_blank');
    }
  };

  if (loading) {
    return (
      <CardWrapper 
        background={background}
        hoverable={false}
        className={`${styles.profileCard} ${animationClasses}`}
      >
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка профиля...</p>
        </div>
      </CardWrapper>
    );
  }

  if (error || !user) {
    return (
      <CardWrapper 
        background="red"
        hoverable={false}
        className={`${styles.profileCard} ${animationClasses}`}
      >
        <div className={styles.error}>
          <span className={styles.errorIcon}>❌</span>
          <p>{error || 'Не удалось загрузить профиль'}</p>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper 
      background={background}
      hoverable={true}
      onClick={handleProfileClick}
      className={`${styles.profileCard} ${animationClasses}`}
    >
      <div className={styles.profileHeader}>
        <img 
          src={user.avatar_url} 
          alt={`${user.name || user.login} avatar`}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.name}>{user.name || user.login}</h3>
          <p className={styles.username}>@{user.login}</p>
        </div>
      </div>
      
      {user.bio && (
        <p className={styles.bio}>{user.bio}</p>
      )}
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{user.public_repos}</span>
          <span className={styles.statLabel}>Репозитории</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{user.followers}</span>
          <span className={styles.statLabel}>Подписчики</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{user.following}</span>
          <span className={styles.statLabel}>Подписки</span>
        </div>
      </div>
      
      <div className={styles.githubIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
    </CardWrapper>
  );
};

export default GitHubProfileCard;