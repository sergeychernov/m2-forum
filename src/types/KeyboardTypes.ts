export type KeyboardAction = 'nextSlide' | 'previousSlide' | 'nextAction';

export interface KeyboardConfig {
	[key: string]: KeyboardAction;
}

export interface SlideWithActions {
	onNextAction?: () => void;
}

export interface SlideProps {
	isActive: boolean;
	isVisited: boolean;
	onRegisterSlide?: (slideRef: SlideWithActions) => void;
	keyboardConfig?: KeyboardConfig;
	updateKeyboardConfig?: (newConfig: Partial<KeyboardConfig>) => void;
}