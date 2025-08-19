import React, { createContext, useContext } from 'react';
import { SlideWithActions } from '../../types/KeyboardTypes';

type SlideInstanceValue = {
    registerSlide?: (actions: SlideWithActions) => void;
};

const SlideInstanceContext = createContext<SlideInstanceValue>({});

export const SlideInstanceProvider: React.FC<{
    registerSlide: (actions: SlideWithActions) => void;
    children: React.ReactNode;
}> = ({ registerSlide, children }) => {
    return (
        <SlideInstanceContext.Provider value={{ registerSlide }}>
            {children}
        </SlideInstanceContext.Provider>
    );
};

export const useSlideInstance = () => useContext(SlideInstanceContext);

export default SlideInstanceContext;