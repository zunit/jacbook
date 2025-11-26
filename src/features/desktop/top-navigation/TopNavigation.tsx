import { useState, useRef } from 'react';
import { useCurrentTime } from './hooks/useCurrentTime';

interface TopNavigationProps {
  onProfileClick: () => void;
}

interface MenuItem {
  label: string;
  action?: () => void;
  separator?: boolean;
}

type MenuConfig = {
  [key: string]: MenuItem[];
};

const menuOptions: MenuConfig = {
  File: [
    { label: 'New Project' },
    { label: 'Open Repo' },
    { label: 'Save to GitHub' },
    { label: 'Export to LinkedIn' },
    { label: 'Close', separator: true },
  ],
  Edit: [
    { label: 'Edit Life Choices' },
    { label: 'Redo Coffee/Tea' },
    { label: 'Cut Nap Time' },
    { label: 'Copy Code' },
    { label: 'Paste Bug' },
    { label: 'Select All Opportunities' },
  ],
  Go: [
    {label: 'Go to sleep'},
    {label: 'Go to vacation'},
    {label: 'Go hangout with Judy'},
    {label: 'Go to the gym'},
    {label: 'Go to wiz lab'}
  ],
  Help: [
    {label: 'Ask ChatGPT', action: () => window.open('https://chat.openai.com', '_blank', 'noopener,noreferrer')},
    {label: 'Ask Gemini', action: () => window.open('https://gemini.google.com', '_blank', 'noopener,noreferrer')},
    {label: 'Ask Claude', action: () => window.open('https://claude.ai', '_blank', 'noopener,noreferrer')},
    {label: 'Ask DeepSeek', action: () => window.open('https://chat.deepseek.com', '_blank', 'noopener,noreferrer')},
    {label: 'Ask Perplexity', action: () => window.open('https://www.perplexity.ai', '_blank', 'noopener,noreferrer')},
    {label: 'Ask DuckDuckGo', action: () => window.open('https://duckduckgo.com', '_blank', 'noopener,noreferrer')},
    {label: 'Ask Wolfram Alpha', action: () => window.open('https://www.wolframalpha.com', '_blank', 'noopener,noreferrer')},
  ],
};

export default function TopNavigation({ onProfileClick }: TopNavigationProps) {
  const currentTime = useCurrentTime();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          {Object.entries(menuOptions).map(([menuName, items]) => {
            const hasItems = items.length > 0;
            const isOpen = openMenu === menuName;

            return (
              <div
                key={menuName}
                className="relative"
                onMouseEnter={() => {
                  // Clear any pending close timeout
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                  // Close other menus when opening a new one
                  if (hasItems) {
                    setOpenMenu(menuName);
                  }
                }}
                onMouseLeave={() => {
                  // Set a small delay before closing to allow moving to dropdown
                  closeTimeoutRef.current = setTimeout(() => {
                    setOpenMenu(null);
                  }, 100);
                }}
              >
                <span className="hover:text-white cursor-default">{menuName}</span>
                {isOpen && hasItems && (
                  <div
                    className="absolute top-full left-0 mt-1 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1.5 min-w-[180px] z-50"
                    onMouseEnter={() => {
                      // Clear the close timeout when entering dropdown
                      if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current);
                        closeTimeoutRef.current = null;
                      }
                      setOpenMenu(menuName);
                    }}
                    onMouseLeave={() => {
                      setOpenMenu(null);
                    }}
                  >
                    {items.map((item, index) => (
                      <div key={index}>
                        {item.separator && index > 0 && (
                          <div className="border-t border-white/10 my-1"></div>
                        )}
                        <button
                          className="w-full text-left px-4 py-1.5 text-xs text-slate-200 hover:bg-blue-600/30 hover:text-white transition-colors"
                          onClick={() => {
                            item.action?.();
                            setOpenMenu(null);
                          }}
                        >
                          {item.label}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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

