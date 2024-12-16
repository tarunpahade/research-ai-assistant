import React, { useEffect } from 'react';
import { useDrawing } from '../../hooks/useDrawing';

interface DrawingCanvasProps {
  width: number;
  height: number;
  scale?: number;
  className?: string;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width,
  height,
  scale = 1,
  className = '',
}) => {
  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    initializeCanvas,
  } = useDrawing(scale);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width * scale;
      canvas.height = height * scale;
      initializeCanvas(canvas);
    }
  }, [width, height, scale, initializeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ width, height }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};