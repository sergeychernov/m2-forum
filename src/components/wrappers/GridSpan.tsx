import React, { ReactNode } from 'react';
import styles from './GridSpan.module.css';

interface GridSpanProps {
  children: ReactNode;
  cols?: number;
  rows?: number;
  className?: string;
}

const GridSpan: React.FC<GridSpanProps> = ({ 
  children, 
  cols = 1, 
  rows = 1, 
  className = '' 
}) => {
  const spanStyles = {
    gridColumn: cols > 1 ? `span ${cols}` : undefined,
    gridRow: rows > 1 ? `span ${rows}` : undefined,
  };

  return (
    <div 
      className={`${styles.gridSpan} ${className}`}
      style={spanStyles}
    >
      {children}
    </div>
  );
};

export default GridSpan;