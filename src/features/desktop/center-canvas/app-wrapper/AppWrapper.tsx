import { type ReactNode } from "react";

type DockApp = {
  id: string;
  label: string;
  emoji: string;
  type: "popup" | "link";
  description?: string;
  url?: string;
};

interface AppWrapperProps {
  isOpen: boolean;
  app: DockApp | null;
  onClose: () => void;
  onMaximize?: () => void;
  children?: ReactNode;
}

export default function AppWrapper({
  isOpen,
  app,
  onClose,
  onMaximize,
  children,
}: AppWrapperProps) {
  if (!isOpen || !app) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md mx-4 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-[0_18px_60px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* macOS-style window controls */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/50 bg-slate-900/50">
          <div className="flex items-center gap-2">
            {/* Red close button */}
            <button
              onClick={onClose}
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
                onClick={onMaximize}
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
        <div className="p-5 sm:p-6">
          {/* App header with icon and title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl">
              {app.emoji}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold">{app.label}</h2>
              <p className="text-[0.7rem] text-slate-400 mt-0.5">Dock app</p>
            </div>
          </div>

          {/* Children content */}
          {children}
        </div>
      </div>
    </div>
  );
}

