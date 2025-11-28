import { useState, useMemo } from "react";
import { DOCK_APPS } from "../../../data/apps-data";
import { type DockApp } from "../../../data/apps-data";

export type WindowPosition = { x: number; y: number };

// Z-index values for app window stacking
export const BASE_Z_INDEX = 40;
export const MAX_Z_INDEX = 50;

// Calculate z-index for an app window based on its order (most recent = highest)
export const calculateAppZIndex = (index: number): number => {
  return MAX_Z_INDEX - index;
};

export interface UseAppManagerReturn {
  // State
  openAppOrder: string[];
  appPositions: Record<string, WindowPosition>;
  
  // Derived state
  openApps: DockApp[];
  sortedOpenApps: DockApp[];
  
  // Operations
  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  bringToFront: (appId: string) => void;
  closeAllApps: () => void;
  initializeAppPosition: (appId: string) => void;
  updateAppPosition: (appId: string, position: WindowPosition | ((prev: WindowPosition) => WindowPosition)) => void;
  updateAppPositionWithUpdater: (appId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
  getAppPosition: (appId: string) => WindowPosition;
}

export function useAppManager(): UseAppManagerReturn {
  // Track open apps in order: [mostRecent, ..., oldest]
  const [openAppOrder, setOpenAppOrder] = useState<string[]>([]);
  const [appPositions, setAppPositions] = useState<Record<string, WindowPosition>>({});

  // Derived: Get open apps from DOCK_APPS (popup, iframe, and component-popup types)
  const openApps = useMemo(() => {
    return DOCK_APPS.filter((app) => openAppOrder.includes(app.id) && (app.type === "popup" || app.type === "iframe" || app.type === "component-popup"));
  }, [openAppOrder]);

  // Derived: Sort openApps to match the order (most recent first)
  const sortedOpenApps = useMemo(() => {
    return openApps.sort((a, b) => {
      const indexA = openAppOrder.indexOf(a.id);
      const indexB = openAppOrder.indexOf(b.id);
      return indexA - indexB;
    });
  }, [openApps, openAppOrder]);

  // Open app and bring to front
  const openApp = (appId: string) => {
    setOpenAppOrder((prev) => {
      const filtered = prev.filter((id) => id !== appId);
      return [appId, ...filtered]; // Most recent first
    });
    initializeAppPosition(appId);
  };

  // Bring app to front when clicked (for bringing existing window to front)
  const bringToFront = (appId: string) => {
    setOpenAppOrder((prev) => {
      if (!prev.includes(appId)) return prev;
      const filtered = prev.filter((id) => id !== appId);
      return [appId, ...filtered];
    });
  };

  // Close a specific app
  const closeApp = (appId: string) => {
    setOpenAppOrder((prev) => prev.filter((id) => id !== appId));
    // Clear position when closing
    setAppPositions((prev) => {
      const { [appId]: _, ...rest } = prev;
      return rest;
    });
  };

  // Close all apps
  const closeAllApps = () => {
    setOpenAppOrder([]);
    setAppPositions({});
  };

  // Initialize position for an app if it doesn't exist
  const initializeAppPosition = (appId: string) => {
    setAppPositions((prev) => {
      if (!prev[appId]) {
        return {
          ...prev,
          [appId]: { x: 0, y: 0 },
        };
      }
      return prev;
    });
  };

  // Update position for an app (supports both direct value and updater function)
  const updateAppPosition = (
    appId: string, 
    updater: WindowPosition | ((prev: WindowPosition) => WindowPosition)
  ) => {
    setAppPositions((prev) => {
      const current = prev[appId] || { x: 0, y: 0 };
      const newPosition = typeof updater === 'function' ? updater(current) : updater;
      return {
        ...prev,
        [appId]: newPosition,
      };
    });
  };

  // Update position using updater function (for drag and drop)
  const updateAppPositionWithUpdater = (
    appId: string,
    updater: (prev: WindowPosition) => WindowPosition
  ) => {
    updateAppPosition(appId, updater);
  };

  // Get position for an app (with default)
  const getAppPosition = (appId: string): WindowPosition => {
    return appPositions[appId] || { x: 0, y: 0 };
  };

  return {
    openAppOrder,
    appPositions,
    openApps,
    sortedOpenApps,
    openApp,
    closeApp,
    bringToFront,
    closeAllApps,
    initializeAppPosition,
    updateAppPosition,
    updateAppPositionWithUpdater,
    getAppPosition,
  };
}

