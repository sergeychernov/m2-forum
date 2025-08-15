import React, { useState } from 'react';
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

const ImageCard: React.FC<ImageCardProps> = ({
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
}) => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	
	const { animationClasses } = useCardAnimation({
		isActive,
		isVisited,
		animationType,
		delay: animationDelay,
		index: animationIndex
	});

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
				<img
					alt={alt}
					src={src}
					className={cn(styles.image, className, {
						[styles.clickable]: enableFullscreen
					})}
					style={{ maxHeight, objectFit }}
					onClick={handleImageClick}
				/>
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
};

export default ImageCard;