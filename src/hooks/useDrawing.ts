import { useCallback, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

export const useDrawing = (scale: number = 1) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const initializeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (context) {
      context.scale(scale, scale);
      context.lineCap = 'round';
      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      contextRef.current = context;
    }
  }, [scale]);

  const startDrawing = useCallback(({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    setCurrentPath([{ x: offsetX / scale, y: offsetY / scale }]);
  }, [scale]);

  const draw = useCallback(({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = nativeEvent;
    const newPoint = { x: offsetX / scale, y: offsetY / scale };
    
    setCurrentPath(prev => [...prev, newPoint]);
    
    const context = contextRef.current;
    if (context) {
      context.beginPath();
      context.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y);
      context.lineTo(newPoint.x, newPoint.y);
      context.stroke();
    }
  }, [isDrawing, currentPath, scale]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    setCurrentPath([]);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return {
    canvasRef,
    isDrawing,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    initializeCanvas,
  };
};