import { useEffect } from 'react';
import { useMapStore } from '../stores/mapStore';

export function useMapNavigation() {
  const { resetMap, zoomLevel } = useMapStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomLevel > 1) {
        resetMap();  // for now, jump to root; later: step back one level
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomLevel, resetMap]);
}