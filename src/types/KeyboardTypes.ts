export type KeyboardAction = 'nextSlide' | 'previousSlide' | 'nextAction';

export interface KeyboardConfig {
	[key: string]: KeyboardAction;
}

export interface SlideWithActions {
	onNextAction?: () => boolean; // Возвращает true если действие выполнено, false если нужно перейти к следующему слайду
}

export interface SlideProps {
	isActive: boolean;
	isVisited: boolean;
	onRegisterSlide?: (slideRef: SlideWithActions) => void;
	keyboardConfig?: KeyboardConfig;
	updateKeyboardConfig?: (newConfig: Partial<KeyboardConfig>) => void;
}