import { useDraggable } from '@dnd-kit/core';
import { type Widget } from '../../../../data/widget-data';
import type { WindowPosition } from '../../hooks/useAppManager';

interface WidgetNotePopupProps {
  isOpen: boolean;
  widget: Widget;
  onClose: () => void;
  position?: WindowPosition;
  zIndex?: number;
}

export default function WidgetNotePopup({
  isOpen,
  widget,
  onClose,
  position = { x: 0, y: 0 },
  zIndex = 50,
}: WidgetNotePopupProps) {
  // Make the popup draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `note-popup-${widget.id}`,
    disabled: !isOpen || widget.type !== "note",
  });

  // Combine transform with position
  const style = {
    transform: `translate3d(${position.x + (transform?.x ?? 0)}px, ${position.y + (transform?.y ?? 0)}px, 0)`,
  };

  if (!isOpen || widget.type !== "note" || !widget.note) return null;

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
          <h3 className="text-sm font-semibold text-slate-200">{widget.name}</h3>
        </div>

        {/* Note items list */}
        <div className="p-4 max-h-[500px] overflow-y-auto bg-white">
          <ul className="space-y-2">
            {widget.note.map((noteItem, index) => (
              <li
                key={index}
                className="text-sm text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {noteItem}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

