import { useState, useEffect } from "react";
import { DndContext } from '@dnd-kit/core';
import '../../index.css';
import { DOCK_APPS } from '../../data/apps-data';
import { WIDGETS } from '../../data/widget-data';
import AboutMe from './top-navigation/about-me/AboutMe';
import TopNavigation from './top-navigation/TopNavigation';
import BottomDockApps from './bottom-dock-apps/BottomDockApps';
import CenterCanvas from './center-canvas/CenterCanvas';
import AppWrapper from './center-canvas/app-wrapper/AppWrapper';
import WidgetWrapper from './center-canvas/widget-wrapper/WidgetWrapper';
import WidgetFolderPopup from './center-canvas/widget-wrapper/WidgetFolderPopup';
import { useAppManager } from './hooks/useAppManager';
import { useWidgetManager } from './hooks/useWidgetManager';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useDockAppHandler } from './hooks/useDockAppHandler';
import { calculateAppZIndex } from './hooks/useAppManager';

// A macOS-style desktop page with a top menu bar and a 5-icon dock.
// Top-left profile button ("Me") opens a profile popup.
// Bottom dock icons either open a popup or navigate to external sites.

export default function MainDesktop() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [folderPopupPositions, setFolderPopupPositions] = useState<Record<string, { x: number; y: number }>>({});

  // Window management
  const {
    sortedOpenApps,
    openApp,
    closeApp,
    bringToFront,
    closeAllApps,
    updateAppPositionWithUpdater,
    getAppPosition,
  } = useAppManager();

  // Widget management
  const {
    initializeWidgetPosition,
    updateWidgetPosition,
    getWidgetPosition,
  } = useWidgetManager();

  // Folder popup position management
  const updateFolderPopupPosition = (folderId: string, updater: (prev: { x: number; y: number }) => { x: number; y: number }) => {
    setFolderPopupPositions((prev) => {
      const current = prev[folderId] || { x: 0, y: 0 };
      const newPosition = updater(current);
      return {
        ...prev,
        [folderId]: newPosition,
      };
    });
  };

  const getFolderPopupPosition = (folderId: string): { x: number; y: number } => {
    return folderPopupPositions[folderId] || { x: 0, y: 0 };
  };

  // Initialize folder popup position when opened
  useEffect(() => {
    if (openFolderId && !folderPopupPositions[openFolderId]) {
      setFolderPopupPositions((prev) => ({
        ...prev,
        [openFolderId]: { x: 0, y: 0 },
      }));
    }
  }, [openFolderId, folderPopupPositions]);

  // Drag and drop
  const { sensor, handleDragEnd } = useDragAndDrop({
    updateAppPosition: updateAppPositionWithUpdater,
    updateWidgetPosition,
    updateFolderPopupPosition,
  });

  // Initialize widget positions on mount
  useEffect(() => {
    WIDGETS.forEach((widget) => {
      // Estimate widget width (you can adjust this based on actual widget sizes)
      const estimatedWidth = 200;
      initializeWidgetPosition(widget.id, estimatedWidth);
    });
  }, [initializeWidgetPosition]);

  // Dock click handling
  const { handleDockClick } = useDockAppHandler({
    openApp,
  });

  // Derived: Check if any popup is open
  const anyPopupOpen = profileOpen || sortedOpenApps.length > 0;

  // Close all popups (including profile)
  const closeAllPopups = () => {
    setProfileOpen(false);
    closeAllApps();
  };

  return (
    <DndContext sensors={[sensor]} onDragEnd={handleDragEnd}>
      <div className="min-h-screen w-full text-slate-50 relative overflow-hidden">
        
      {/* Desktop background approximating macOS wallpaper */}
      <div className="w-full absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_#16a34a_0,_#15803d_30%,#052e16_55%),radial-gradient(circle_at_top,_#fb7185_0,_#fb923c_30%,#3b82f6_60%,#1e293b_90%)]" />

      {/* Subtle noise/overlay */}
      <div className="absolute inset-0 -z-10 bg-black/10" />

      {/* Top macOS-style menu bar */}
      <TopNavigation onProfileClick={() => setProfileOpen(true)} />

      {/* Desktop content hint in center */}
      <CenterCanvas />

      {/* Dock with exactly 5 applications */}
      <BottomDockApps apps={DOCK_APPS} onAppClick={handleDockClick} />

      {/* Shared dimmed overlay when any popup is open */}
      {anyPopupOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={closeAllPopups}
        />
      )}

      {/* Profile popup (Me button) */}
      <AboutMe isOpen={profileOpen} onClose={closeAllPopups} />

      {/* Multiple dock app popups - render in reverse order so most recent appears on top */}
      {sortedOpenApps.map((app, index) => {
        const zIndex = calculateAppZIndex(index);
        return (
          <AppWrapper
            key={app.id}
            isOpen={true}
            app={app}
            onClose={() => closeApp(app.id)}
            onFocus={() => bringToFront(app.id)}
            position={getAppPosition(app.id)}
            zIndex={zIndex}
          >
            <p className="text-xs sm:text-sm text-slate-200 mb-4">
              {app.description}
            </p>
          </AppWrapper>
        );
      })}

      {/* Draggable widgets - positioned at top-right initially */}
      {WIDGETS.map((widget) => (
        <WidgetWrapper
          key={widget.id}
          widgetId={widget.id}
          widget={widget}
          position={getWidgetPosition(widget.id)}
          zIndex={20}
          onFolderClick={() => widget.type === "folder" && setOpenFolderId(widget.id)}
        />
      ))}

      {/* Folder popups - similar pattern to app popups */}
      {WIDGETS.filter((w) => w.type === "folder").map((widget) => {
        if (widget.type !== "folder") return null;
        return (
          <WidgetFolderPopup
            key={widget.id}
            isOpen={openFolderId === widget.id}
            widget={widget}
            onClose={() => setOpenFolderId(null)}
            position={getFolderPopupPosition(widget.id)}
            zIndex={50}
          />
        );
      })}

      {/* Backdrop overlay for folder popups */}
      {openFolderId && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto z-40"
          onClick={() => setOpenFolderId(null)}
        />
      )}
      </div>
    </DndContext>
  );
}
