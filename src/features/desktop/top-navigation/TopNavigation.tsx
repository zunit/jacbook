import { useCurrentTime } from './hooks/useCurrentTime';

interface TopNavigationProps {
  onProfileClick: () => void;
}

export default function TopNavigation({ onProfileClick }: TopNavigationProps) {
  const currentTime = useCurrentTime();

  return (
    <div className="fixed top-0 left-0 right-0 h-9 flex items-center justify-between px-3 sm:px-4 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 text-[0.7rem] sm:text-xs z-40">
      <div className="flex items-center gap-3">
        {/* Profile button replacing Apple logo */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 hover:bg-slate-800/60 active:bg-slate-900/70 transition-colors"
        >
          <span className="text-sm">👤</span>
          <span className="font-medium">Me</span>
        </button>

        {/* Left-side menu items */}
        <div className="hidden sm:flex items-center gap-3 text-slate-200/80">
          <span className="font-semibold">Finder</span>
          <span className="hover:text-white cursor-default">File</span>
          <span className="hover:text-white cursor-default">Edit</span>
          <span className="hover:text-white cursor-default">View</span>
          <span className="hover:text-white cursor-default">Go</span>
          <span className="hover:text-white cursor-default">Window</span>
          <span className="hover:text-white cursor-default">Help</span>
        </div>
      </div>

      {/* Right-side status area (fake) */}
      <div className="flex items-center gap-3 text-slate-200/80">
        <button
          onClick={() => window.open('https://www.youtube.com/watch?v=9fAZIQ-vpdw', '_blank', 'noopener,noreferrer')}
          className="text-[0.7rem] hidden sm:inline hover:text-white transition-colors cursor-pointer"
          aria-label="Open YouTube video"
        >
          🔊
        </button>
        <button
          onClick={() => window.open('https://www.speedtest.net/', '_blank', 'noopener,noreferrer')}
          className="text-[0.7rem] hidden sm:inline hover:text-white transition-colors cursor-pointer"
          aria-label="Test internet speed"
        >
          📶
        </button>
        <span className="text-[0.7rem]">{currentTime}</span>
      </div>
    </div>
  );
}

