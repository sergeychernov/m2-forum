import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styles from './ImageCard.module.css';
import { useCardAnimation, AnimationType } from '../../hooks/useCardAnimation';
import cn from "classnames";

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

export interface ImageCardRef {
	openFullscreen: () => void;
	closeFullscreen: () => void;
	isFullscreenOpen: () => boolean;
}

const ImageCard = React.memo(forwardRef<ImageCardRef, ImageCardProps>(({ 
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

	// Предоставляем методы через ref
	useImperativeHandle(ref, () => ({
		openFullscreen: () => {
			if (enableFullscreen) {
				setIsFullscreen(true);
			}
		},
		closeFullscreen: () => {
			setIsFullscreen(false);
		},
		isFullscreenOpen: () => isFullscreen
	}));

	const handleImageClick = () => {
		if (enableFullscreen) {
			setIsFullscreen(true);
		}
	};

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
							[styles.clickable]: enableFullscreen
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

export default ImageCard;