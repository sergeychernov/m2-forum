export interface InteractiveRef {
	openFullscreen: () => void;
	closeFullscreen: () => void;
	isFullscreenOpen: () => boolean;
}

// Опционально: можно использовать как договоренность для включения интерактива
export interface InteractiveProps {
	interactive?: boolean; // общий флаг
}