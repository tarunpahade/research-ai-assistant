import React from 'react';

interface Annotation {
  type: 'draw' | 'mark' | 'underline';
  points?: { x: number; y: number }[];
  text?: string;
  position?: { x: number; y: number; width: number; height: number };
}

interface PDFAnnotationLayerProps {
  annotations: Annotation[];
  scale: number;
  onAnnotationClick: (annotation: Annotation) => void;
}

export const PDFAnnotationLayer: React.FC<PDFAnnotationLayerProps> = ({
  annotations,
  scale,
  onAnnotationClick,
}) => {
  return (
    <svg className="absolute inset-0 pointer-events-none">
      {annotations.map((annotation, index) => {
        switch (annotation.type) {
          case 'draw':
            return annotation.points && (
              <path
                key={index}
                d={`M ${annotation.points.map(p => `${p.x * scale} ${p.y * scale}`).join(' L ')}`}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            );
          case 'mark':
            return annotation.position && (
              <rect
                key={index}
                x={annotation.position.x * scale}
                y={annotation.position.y * scale}
                width={annotation.position.width * scale}
                height={annotation.position.height * scale}
                fill="yellow"
                opacity="0.3"
              />
            );
          case 'underline':
            return annotation.position && (
              <line
                key={index}
                x1={annotation.position.x * scale}
                y1={(annotation.position.y + annotation.position.height) * scale}
                x2={(annotation.position.x + annotation.position.width) * scale}
                y2={(annotation.position.y + annotation.position.height) * scale}
                stroke="red"
                strokeWidth="1"
              />
            );
          default:
            return null;
        }
      })}
    </svg>
  );
};