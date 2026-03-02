import { useEffect } from 'react';
import { useMapStore } from '../stores/mapStore';

export function useMapNavigation() {
  const { resetMap, zoomLevel } = useMapStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomLevel > 1) {
        resetMap();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomLevel, resetMap]);
}