import { useDraggable } from '@dnd-kit/core';
import { type Widget } from '../../../../data/widget-data';
import type { WindowPosition } from '../../hooks/useAppManager';

interface WidgetFolderPopupProps {
  isOpen: boolean;
  widget: Widget;
  onClose: () => void;
  position?: WindowPosition;
  zIndex?: number;
}

export default function WidgetFolderPopup({
  isOpen,
  widget,
  onClose,
  position = { x: 0, y: 0 },
  zIndex = 50,
}: WidgetFolderPopupProps) {
  // Make the popup draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `folder-popup-${widget.id}`,
    disabled: !isOpen || widget.type !== "folder",
  });

  // Combine transform with position
  const style = {
    transform: `translate3d(${position.x + (transform?.x ?? 0)}px, ${position.y + (transform?.y ?? 0)}px, 0)`,
  };

  if (!isOpen || widget.type !== "folder") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex }}>
      <div 
        ref={setNodeRef}
        style={style}
        className="pointer-events-auto mx-4 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-[0_18px_60px_rgba(0,0,0,0.85)] overflow-hidden w-full max-w-md"
      >
        {/* Header with close button - drag handle */}
        <div 
          {...listeners}
          {...attributes}
          className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50 bg-slate-900/50 cursor-move"
        >
          <h3 className="text-sm font-semibold text-slate-200">{widget.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
            aria-label="Close"
          >
            <span className="text-[0.6rem] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">
              ✕
            </span>
          </button>
        </div>

        {/* Folder items */}
        <div className="p-4 max-h-[500px] overflow-y-auto bg-white">
          <div className="grid grid-cols-2 gap-3">
            {widget.folderItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center p-3 rounded-lg bg-transparent hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                )}
                <span className="text-xs font-medium text-gray-900 text-center group-hover:text-gray-700 transition-colors">
                  {item.name}
                </span>
                {item.description && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-[0.65rem] text-gray-700 bg-white border border-gray-300 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-[200px] text-center">
                    {item.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

