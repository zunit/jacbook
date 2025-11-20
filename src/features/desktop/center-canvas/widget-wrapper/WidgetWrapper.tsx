import { useDraggable } from '@dnd-kit/core';
import { type Widget } from '../../../../data/widget-data';

interface WidgetWrapperProps {
  widgetId: string;
  widget: Widget;
  position: { x: number; y: number };
  zIndex?: number;
  onFolderClick?: () => void;
}

export default function WidgetWrapper({
  widgetId,
  widget,
  position,
  zIndex = 20,
  onFolderClick,
}: WidgetWrapperProps) {
  // Make the widget draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `widget-${widgetId}`,
  });

  // Combine transform with position
  const style = {
    transform: `translate3d(${position.x + (transform?.x ?? 0)}px, ${position.y + (transform?.y ?? 0)}px, 0)`,
    zIndex,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="fixed top-0 left-0 pointer-events-auto rounded-lg overflow-hidden"
    >
      {/* Widget content */}
      {widget.component ? (
        <div 
          className="cursor-pointer"
          onClick={() => widget.type === "folder" && onFolderClick?.()}
        >
          {(() => {
            const WidgetComponent = widget.component;
            return <WidgetComponent />;
          })()}
        </div>
      ) : widget.type === "folder" ? (
        <div 
          className="flex items-center justify-center cursor-pointer"
          onClick={() => onFolderClick?.()}
        >
          <span className="text-6xl">🗂️</span>
        </div>
      ) : null}
      <div
        {...listeners}
        {...attributes}
        className="flex items-center justify-center cursor-move hover:bg-slate-700/70 transition-colors p-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-400 mr-2"
        >
          <circle cx="4" cy="4" r="1.5" fill="currentColor" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="4" cy="8" r="1.5" fill="currentColor" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
          <circle cx="4" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
            <span className="text-sm text-slate-200 font-medium bg-black/50 rounded px-2 py-1">{widget.name}</span>
      </div>
    </div>
  );
}

