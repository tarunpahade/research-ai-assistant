import { useState, useCallback } from 'react';
import type { Annotation } from '../types';

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const addAnnotation = useCallback((annotation: Annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  }, []);

  const removeAnnotation = useCallback((index: number) => {
    setAnnotations(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    annotations,
    addAnnotation,
    removeAnnotation,
  };
};