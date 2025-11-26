import { PointerSensor, useSensor } from '@dnd-kit/core';
import type { DragEndEvent, SensorDescriptor } from '@dnd-kit/core';
import type { WindowPosition } from './useAppManager';

const DRAG_ACTIVATION_DISTANCE = 8; // Require 8px movement before dragging starts

export interface UseDragAndDropProps {
  updateAppPosition: (appId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
  updateWidgetPosition?: (widgetId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
  updateFolderPopupPosition?: (folderId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
  updateNotePopupPosition?: (noteId: string, updater: (prev: WindowPosition) => WindowPosition) => void;
}

export interface UseDragAndDropReturn {
  sensor: SensorDescriptor<any>;
  handleDragEnd: (event: DragEndEvent) => void;
}

export function useDragAndDrop({ 
  updateAppPosition,
  updateWidgetPosition,
  updateFolderPopupPosition,
  updateNotePopupPosition,
}: UseDragAndDropProps): UseDragAndDropReturn {
  // Configure pointer sensor with activation constraint
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: DRAG_ACTIVATION_DISTANCE,
    },
  });

  // Handle drag end to update position for apps, widgets, or folder popups
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (delta && active?.id) {
      const id = active.id.toString();
      
      // Check if it's an app, widget, or folder popup based on ID prefix
      if (id.startsWith('app-wrapper-')) {
        const appId = id.replace('app-wrapper-', '');
        // Update position by adding delta to current position
        updateAppPosition(appId, (prev) => ({
          x: (prev?.x || 0) + delta.x,
          y: (prev?.y || 0) + delta.y,
        }));
      } else if (id.startsWith('widget-') && updateWidgetPosition) {
        const widgetId = id.replace('widget-', '');
        // Update position by adding delta to current position
        updateWidgetPosition(widgetId, (prev) => ({
          x: (prev?.x || 0) + delta.x,
          y: (prev?.y || 0) + delta.y,
        }));
      } else if (id.startsWith('folder-popup-') && updateFolderPopupPosition) {
        const folderId = id.replace('folder-popup-', '');
        // Update position by adding delta to current position
        updateFolderPopupPosition(folderId, (prev) => ({
          x: (prev?.x || 0) + delta.x,
          y: (prev?.y || 0) + delta.y,
        }));
      } else if (id.startsWith('note-popup-') && updateNotePopupPosition) {
        const noteId = id.replace('note-popup-', '');
        // Update position by adding delta to current position
        updateNotePopupPosition(noteId, (prev) => ({
          x: (prev?.x || 0) + delta.x,
          y: (prev?.y || 0) + delta.y,
        }));
      }
    }
  };

  return {
    sensor,
    handleDragEnd,
  };
}

