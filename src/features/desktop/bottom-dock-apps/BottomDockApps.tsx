type DockApp = {
  id: string;
  label: string;
  emoji: string;
  type: "popup" | "link";
  description?: string;
  url?: string;
};

interface BottomDockAppsProps {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
}

export default function BottomDockApps({ apps, onAppClick }: BottomDockAppsProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-end justify-center">
      <div className="flex items-end gap-3 px-4 py-2 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-[0_18px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className="group flex flex-col items-center justify-center text-[0.6rem] sm:text-[0.65rem] text-slate-100/90"
          >
            <div className="relative mb-1 flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br from-slate-100/90 via-slate-50/90 to-slate-200/90 text-2xl shadow-[0_10px_30px_rgba(0,0,0,0.55)] transform group-hover:scale-110 group-active:scale-95 transition-transform">
              <span>{app.emoji}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-black/20 backdrop-blur text-[0.6rem]">
              {app.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

