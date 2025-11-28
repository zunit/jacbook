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
import WidgetNotePopup from './center-canvas/widget-wrapper/WidgetNotePopup';
import MobileDesktop from './MobileDesktop';
import { useAppManager } from './hooks/useAppManager';
import { useWidgetManager } from './hooks/useWidgetManager';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useDockAppHandler } from './hooks/useDockAppHandler';
import { useMobileDetection } from './hooks/useMobileDetection';
import { calculateAppZIndex } from './hooks/useAppManager';
import bgVideo from '../../assets/bg-video/BG Jack Site.mp4';

// A macOS-style desktop page with a top menu bar and a 5-icon dock.
// Top-left profile button ("Me") opens a profile popup.
// Bottom dock icons either open a popup or navigate to external sites.

export default function MainDesktop() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [openFolderIds, setOpenFolderIds] = useState<Set<string>>(new Set());
  const [openNoteIds, setOpenNoteIds] = useState<Set<string>>(new Set());
  const [folderPopupPositions, setFolderPopupPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [notePopupPositions, setNotePopupPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [maxWidgetWidth, setMaxWidgetWidth] = useState<number>(200);
  
  // Check if screen is phone/mobile size
  const isMobile = useMobileDetection();

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
    constrainWidgetPositions,
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

  // Note popup position management
  const updateNotePopupPosition = (noteId: string, updater: (prev: { x: number; y: number }) => { x: number; y: number }) => {
    setNotePopupPositions((prev) => {
      const current = prev[noteId] || { x: 0, y: 0 };
      const newPosition = updater(current);
      return {
        ...prev,
        [noteId]: newPosition,
      };
    });
  };

  const getNotePopupPosition = (noteId: string): { x: number; y: number } => {
    return notePopupPositions[noteId] || { x: 0, y: 0 };
  };

  // Initialize folder popup position when opened
  useEffect(() => {
    openFolderIds.forEach((folderId) => {
      if (!folderPopupPositions[folderId]) {
        setFolderPopupPositions((prev) => ({
          ...prev,
          [folderId]: { x: 0, y: 0 },
        }));
      }
    });
  }, [openFolderIds, folderPopupPositions]);

  // Initialize note popup position when opened
  useEffect(() => {
    openNoteIds.forEach((noteId) => {
      if (!notePopupPositions[noteId]) {
        setNotePopupPositions((prev) => ({
          ...prev,
          [noteId]: { x: 0, y: 0 },
        }));
      }
    });
  }, [openNoteIds, notePopupPositions]);

  // Drag and drop
  const { sensor, handleDragEnd } = useDragAndDrop({
    updateAppPosition: updateAppPositionWithUpdater,
    updateWidgetPosition,
    updateFolderPopupPosition,
    updateNotePopupPosition,
  });

  // Initialize widget positions on mount
  useEffect(() => {
    // Calculate maximum widget width for alignment
    // Estimate widget width based on name length + padding
    // Padding breakdown:
    // - Outer div (p-2): 8px left + 8px right = 16px
    // - Inner span (px-2): 8px left + 8px right = 16px
    // - Total horizontal padding: 32px
    const HORIZONTAL_PADDING = 32; // Total padding from outer div + inner span
    const CHAR_WIDTH = 8; // Approximate width per character
    const SPACE_WIDTH = 4; // Spaces are narrower than regular characters
    const FOLDER_ICON_WIDTH = 60; // text-6xl = 3.75rem ≈ 60px
    
    const estimatedWidths = WIDGETS.map((widget) => {
      // Calculate text width accounting for spaces
      const spaceCount = (widget.name.match(/ /g) || []).length;
      const charCount = widget.name.length - spaceCount;
      const nameWidth = (charCount * CHAR_WIDTH) + (spaceCount * SPACE_WIDTH);
      const nameTotalWidth = nameWidth + HORIZONTAL_PADDING;
      
      // For folder widgets, width is the max of icon width and name width
      // Widget width = max(icon width, name width + padding)
      if (widget.type === "folder") {
        return Math.max(FOLDER_ICON_WIDTH, nameTotalWidth);
      }
      
      // For other widget types, use name width
      return nameTotalWidth;
    });
    const calculatedMaxWidth = Math.max(...estimatedWidths);
    setMaxWidgetWidth(calculatedMaxWidth);

    WIDGETS.forEach((widget, index) => {
      // Estimate widget width and height (you can adjust this based on actual widget sizes)
      const estimatedWidth = estimatedWidths[index] || 200;
      const estimatedHeight = 150; // Including drag handle
      initializeWidgetPosition(widget.id, estimatedWidth, index, estimatedHeight, calculatedMaxWidth);
    });
  }, [initializeWidgetPosition]);

  // Constrain widget positions when viewport resizes (only when not mobile)
  useEffect(() => {
    if (isMobile) return; // Don't update widget positions when mobile view is shown

    const handleResize = () => {
      // Estimate widget dimensions (width: 200px, height: ~150px including drag handle)
      const widgetDimensions: Record<string, { width: number; height: number }> = {};
      WIDGETS.forEach((widget) => {
        widgetDimensions[widget.id] = { width: 200, height: 150 };
      });
      constrainWidgetPositions(widgetDimensions);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [constrainWidgetPositions, isMobile]);

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

  // Show mobile message if screen is too small
  if (isMobile) {
    return <MobileDesktop />;
  }

  return (
    <DndContext sensors={[sensor]} onDragEnd={handleDragEnd}>
      <div className="min-h-screen w-full text-slate-50 relative overflow-hidden">
        
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
        style={{ filter: 'grayscale(0.3) brightness(0.7)' }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Gray tint overlay */}
      <div className="absolute inset-0 -z-10 bg-gray-900/40" />

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
            {app.type === "popup" && app.description && (
              <p className="text-xs sm:text-sm text-slate-200 mb-4">
                {app.description}
              </p>
            )}
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
          zIndex={40}
          width={maxWidgetWidth}
          onFolderClick={() => {
            if (widget.type === "folder") {
              setOpenFolderIds((prev) => {
                const newSet = new Set(prev);
                newSet.add(widget.id);
                return newSet;
              });
            }
          }}
          onNoteClick={() => {
            if (widget.type === "note") {
              setOpenNoteIds((prev) => {
                const newSet = new Set(prev);
                newSet.add(widget.id);
                return newSet;
              });
            }
          }}
        />
      ))}

      {/* Folder popups - similar pattern to app popups */}
      {WIDGETS.filter((w) => w.type === "folder").map((widget) => {
        if (widget.type !== "folder") return null;
        return (
          <WidgetFolderPopup
            key={widget.id}
            isOpen={openFolderIds.has(widget.id)}
            widget={widget}
            onClose={() => {
              setOpenFolderIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(widget.id);
                return newSet;
              });
            }}
            position={getFolderPopupPosition(widget.id)}
            zIndex={50}
          />
        );
      })}

      {/* Note popups - similar pattern to folder popups */}
      {WIDGETS.filter((w) => w.type === "note").map((widget) => {
        if (widget.type !== "note") return null;
        return (
          <WidgetNotePopup
            key={widget.id}
            isOpen={openNoteIds.has(widget.id)}
            widget={widget}
            onClose={() => {
              setOpenNoteIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(widget.id);
                return newSet;
              });
            }}
            position={getNotePopupPosition(widget.id)}
            zIndex={50}
          />
        );
      })}

      {/* Backdrop overlay for folder and note popups */}
      {(openFolderIds.size > 0 || openNoteIds.size > 0) && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-none z-30"
        />
      )}
      </div>
    </DndContext>
  );
}
