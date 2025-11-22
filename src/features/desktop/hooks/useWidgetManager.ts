import { useState, useCallback, useRef } from "react";
import type { WindowPosition } from './useAppManager';

// Multiplier for vertical offset when stacking widgets (each widget is offset by this percentage of its height)
const WIDGET_STACK_OFFSET_MULTIPLIER = 0.8;

export interface UseWidgetManagerReturn {
  widgetPositions: Record<string, WindowPosition>;
  initializeWidgetPosition: (widgetId: string, widgetWidth?: number, index?: number, widgetHeight?: number, maxWidgetWidth?: number) => void;
  updateWidgetPosition: (widgetId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
  getWidgetPosition: (widgetId: string) => WindowPosition;
  constrainWidgetPositions: (widgetDimensions: Record<string, { width: number; height: number }>) => void;
}

export function useWidgetManager(): UseWidgetManagerReturn {
  const [widgetPositions, setWidgetPositions] = useState<Record<string, WindowPosition>>({});
  const previousViewportSizeRef = useRef<{ width: number; height: number } | null>(null);

  // Initialize position for a widget at top-right if it doesn't exist
  // index: 0-based index of the widget (for stacking vertically)
  // maxWidgetWidth: maximum width among all widgets (for alignment)
  const initializeWidgetPosition = useCallback((widgetId: string, _widgetWidth: number = 200, index: number = 0, widgetHeight: number = 150, maxWidgetWidth: number = 200) => {
    setWidgetPositions((prev) => {
      if (!prev[widgetId]) {
        // Position using percentages: 85% from left (15% from right), below top navigation
        // Top navigation is h-9 (36px), add padding of 20px = 56px minimum
        // Use 8% from top to ensure it's below the navigation bar
        // Use maxWidgetWidth to position the left edge of all widgets at the same X position
        const baseX = typeof window !== 'undefined' 
          ? window.innerWidth - maxWidgetWidth
          : 0;
        const baseY = typeof window !== 'undefined'
          ? Math.max(window.innerHeight * 0.08, 56) // At least 56px (36px nav + 20px padding)
          : 56;
        
        // Stack widgets vertically: each widget is offset downward by a percentage of its height
        const verticalOffset = index * (widgetHeight * WIDGET_STACK_OFFSET_MULTIPLIER);
        
        // X position: all widgets align their left edges at baseX
        // No offset needed since we're aligning left edges, not right edges
        const x = baseX;
        const y = baseY + verticalOffset;
        
        // Initialize previous viewport size if not set
        if (typeof window !== 'undefined' && !previousViewportSizeRef.current) {
          previousViewportSizeRef.current = { width: window.innerWidth, height: window.innerHeight };
        }
        
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

  // Constrain widget positions to stay within viewport bounds and maintain relative positions
  const constrainWidgetPositions = useCallback((
    widgetDimensions: Record<string, { width: number; height: number }>
  ) => {
    if (typeof window === 'undefined') return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const topNavHeight = 36; // h-9 = 36px
    const padding = 20;

    // Capture the previous viewport size BEFORE updating
    const previousSize = previousViewportSizeRef.current;
    
    // Initialize previous viewport size if not set
    if (!previousSize) {
      previousViewportSizeRef.current = { width: viewportWidth, height: viewportHeight };
      return; // Don't adjust positions on first call
    }

    // Determine if viewport expanded or shrunk
    const isExpanding = viewportWidth > previousSize.width || viewportHeight > previousSize.height;

    setWidgetPositions((prev) => {
      const updated: Record<string, WindowPosition> = { ...prev };

      Object.keys(prev).forEach((widgetId) => {
        const position = prev[widgetId];
        const dimensions = widgetDimensions[widgetId] || { width: 200, height: 150 };
        
        let { x, y } = position;

        if (isExpanding) {
          // Maintain relative position when expanding
          const prevWidth = previousSize.width;
          const prevHeight = previousSize.height;
          
          // Calculate relative position as percentage based on previous viewport
          const relativeX = prevWidth > 0 ? position.x / prevWidth : 0;
          const relativeY = prevHeight > 0 ? (position.y - topNavHeight - padding) / (prevHeight - topNavHeight - padding * 2) : 0;
          
          // Apply relative position to new viewport size
          x = viewportWidth * relativeX;
          y = (viewportHeight - topNavHeight - padding * 2) * relativeY + topNavHeight + padding;
        }

        // Constrain X position (keep widget within horizontal bounds)
        if (x < 0) {
          x = 0;
        } else if (x + dimensions.width > viewportWidth) {
          x = Math.max(0, viewportWidth - dimensions.width);
        }

        // Constrain Y position (keep widget below top nav and above bottom)
        const minY = topNavHeight + padding; // Below top navigation
        
        if (y < minY) {
          y = minY;
        } else if (y + dimensions.height > viewportHeight - padding) {
          y = Math.max(minY, viewportHeight - dimensions.height - padding);
        }

        // Only update if position changed
        if (x !== position.x || y !== position.y) {
          updated[widgetId] = { x, y };
        }
      });

      return updated;
    });

    // Update previous viewport size AFTER calculations for next resize
    previousViewportSizeRef.current = { width: viewportWidth, height: viewportHeight };
  }, []);

  return {
    widgetPositions,
    initializeWidgetPosition,
    updateWidgetPosition,
    getWidgetPosition,
    constrainWidgetPositions,
  };
}

