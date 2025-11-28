import { type ReactNode } from "react";
import { useDraggable } from '@dnd-kit/core';
import { type DockApp } from '../../../../data/apps-data';

interface AppWrapperProps {
  isOpen: boolean;
  app: DockApp | null;
  onClose: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  children?: ReactNode;
  position?: { x: number; y: number };
  zIndex?: number;
}

export default function AppWrapper({
  isOpen,
  app,
  onClose,
  onMaximize,
  onFocus,
  children,
  position = { x: 0, y: 0 },
  zIndex = 40,
}: AppWrapperProps) {
  // Make the window draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `app-wrapper-${app?.id || 'default'}`,
    disabled: !isOpen || !app,
  });

  // Combine transform with position
  const style = {
    transform: `translate3d(${position.x + (transform?.x ?? 0)}px, ${position.y + (transform?.y ?? 0)}px, 0)`,
  };

  if (!isOpen || !app) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex }}
    >
      <div
        ref={setNodeRef}
        style={style}
        className={`pointer-events-auto mx-4 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-[0_18px_60px_rgba(0,0,0,0.85)] overflow-hidden ${
          app.type === "iframe" ? "w-full max-w-4xl" : "w-full max-w-md"
        }`}
        onMouseDown={onFocus}
      >
        {/* macOS-style window controls - drag handle */}
        <div
          {...listeners}
          {...attributes}
          className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/50 bg-slate-900/50 cursor-move"
        >
          <div className="flex items-center gap-2">
            {/* Red close button */}
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
            {/* Green maximize button */}
            {onMaximize && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize();
                }}
                className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                aria-label="Maximize"
              >
                <span className="text-[0.5rem] text-green-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  ⛶
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Window content */}
        {app.type === "iframe" && app.url ? (
          // Iframe for iframe apps
          <div className="w-full h-[500px] sm:h-[600px]">
            <iframe
              src={app.url}
              width="100%"
              height="600"
              className="rounded-b-2xl border-0"
              title={app.label}
              allowFullScreen
            />
          </div>
        ) : (
          // Regular content for popup apps
          <div className="p-5 sm:p-6">
            {/* App header with icon and title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl">
                {app.emoji}
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-semibold">
                  {app.label}
                </h2>
                <p className="text-[0.7rem] text-slate-400 mt-0.5">Dock app</p>
              </div>
            </div>

            {/* Children content */}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

