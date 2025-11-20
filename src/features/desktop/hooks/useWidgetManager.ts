import { useState, useCallback } from "react";
import type { WindowPosition } from './useAppManager';

export interface UseWidgetManagerReturn {
  widgetPositions: Record<string, WindowPosition>;
  initializeWidgetPosition: (widgetId: string, widgetWidth?: number) => void;
  updateWidgetPosition: (widgetId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
  getWidgetPosition: (widgetId: string) => WindowPosition;
}

export function useWidgetManager(): UseWidgetManagerReturn {
  const [widgetPositions, setWidgetPositions] = useState<Record<string, WindowPosition>>({});

  // Initialize position for a widget at top-right if it doesn't exist
  const initializeWidgetPosition = useCallback((widgetId: string, widgetWidth: number = 200) => {
    setWidgetPositions((prev) => {
      if (!prev[widgetId]) {
        // Position using percentages: 85% from left (15% from right), below top navigation
        // Top navigation is h-9 (36px), add padding of 20px = 56px minimum
        // Use 8% from top to ensure it's below the navigation bar
        const x = typeof window !== 'undefined' 
          ? window.innerWidth - widgetWidth
          : 0;
        const y = typeof window !== 'undefined'
          ? Math.max(window.innerHeight * 0.08, 56) // At least 56px (36px nav + 20px padding)
          : 56;
        return {
          ...prev,
          [widgetId]: { x, y },
        };
      }
      return prev;
    });
  }, []);

  // Update position for a widget (for drag and drop)
  const updateWidgetPosition = useCallback((
    widgetId: string,
    updater: (prev: WindowPosition) => WindowPosition
  ) => {
    setWidgetPositions((prev) => {
      const current = prev[widgetId] || { x: 0, y: 0 };
      const newPosition = updater(current);
      return {
        ...prev,
        [widgetId]: newPosition,
      };
    });
  }, []);

  // Get position for a widget (with default top-right position)
  const getWidgetPosition = useCallback((widgetId: string): WindowPosition => {
    if (widgetPositions[widgetId]) {
      return widgetPositions[widgetId];
    }
    // Default to percentage-based position if not initialized yet
    // 85% from left, 8% from top (or minimum 56px to clear top navigation)
    const defaultWidth = 200;
    const x = typeof window !== 'undefined' 
      ? window.innerWidth * 0.85 - defaultWidth
      : 0;
    const y = typeof window !== 'undefined'
      ? Math.max(window.innerHeight * 0.08, 56) // At least 56px (36px nav + 20px padding)
      : 56;
    return { x, y };
  }, [widgetPositions]);

  return {
    widgetPositions,
    initializeWidgetPosition,
    updateWidgetPosition,
    getWidgetPosition,
  };
}

