import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styles from './ImageCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import cn from "classnames";
import { InteractiveRef } from '../../types/Interactive';

interface ImageCardProps {
	src: string;
	alt: string;
	maxHeight?: string;
	objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
	animationType?: AnimationType;
	animationIndex?: number;
	animationDelay?: number;
	isActive?: boolean;
	isVisited?: boolean;
	className?: string;
	enableFullscreen?: boolean;
}

export type ImageCardRef = InteractiveRef;

const ImageCard = React.memo(forwardRef<InteractiveRef, ImageCardProps>(({
	src,
	alt,
	maxHeight = '400px',
	objectFit = 'cover',
	animationType = 'none',
	animationIndex = 0,
	animationDelay = 300,
	isActive = true,
	isVisited = false,
	className,
	enableFullscreen = false
}, ref) => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const { animationClasses } = useCardAnimation({
		isActive,
		isVisited,
		animationType,
		delay: animationDelay,
		index: animationIndex
	});

	// Ленивая загрузка: начинаем грузить изображение только когда карточка активна на текущем слайде
	const [shouldLoadImage, setShouldLoadImage] = useState(false);
	useEffect(() => {
		if (isActive && !shouldLoadImage) {
			setShouldLoadImage(true);
		}
	}, [isActive, shouldLoadImage]);

	// Единый флаг интерактивности для ImageCard
	const isInteractive = (enableFullscreen === true);

	// Предоставляем методы через ref
	useImperativeHandle(ref, () => ({
		openFullscreen: () => {
			if (isInteractive) {
				setIsFullscreen(true);
			}
		},
		closeFullscreen: () => {
			setIsFullscreen(false);
		},
		isFullscreenOpen: () => isFullscreen
	}));

	const handleImageClick = () => {
		if (isInteractive) {
			setIsFullscreen(true);
		}
	};

	// ВОССТАНОВЛЕНО: обработчики для модалки
	const handleFullscreenClose = () => {
		setIsFullscreen(false);
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleFullscreenClose();
		}
	};

	return (
		<>
			<div className={cn(styles.imageCard, animationClasses)}>
				{shouldLoadImage ? (
					<img
						alt={alt}
						src={src}
						className={cn(styles.image, className, {
							[styles.clickable]: isInteractive
						})}
						style={{ maxHeight, objectFit }}
						onClick={handleImageClick}
						loading="lazy"
					/>
				) : (
					<div
						className={cn(styles.image, className)}
						style={{
							height: maxHeight,
							background: 'var(--color-background-secondary)'
						}}
					/>
				)}
			</div>

			{isFullscreen && (
				<div
					className={styles.fullscreenOverlay}
					onClick={handleBackdropClick}
				>
					<div className={styles.fullscreenContainer}>
						<button
							className={styles.closeButton}
							onClick={handleFullscreenClose}
							aria-label="Закрыть полноэкранный режим"
						>
							×
						</button>
						<img
							alt={alt}
							src={src}
							className={styles.fullscreenImage}
							onClick={handleFullscreenClose}
						/>
					</div>
				</div>
			)}
		</>
	);
}));

// Добавляем displayName для корректной работы с SlideWrapper
ImageCard.displayName = 'ImageCard';

// Статический метод: компонент сам решает, интерактивный он или нет
// Правило: ImageCard интерактивна только если enableFullscreen === true
(ImageCard as any).isInteractive = (props: { enableFullscreen?: boolean }) => {
    return props?.enableFullscreen === true;
};

export default ImageCard;