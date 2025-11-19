import { useState } from "react";
import '../../index.css';
import AboutMe from './top-navigation/about-me/AboutMe';
import TopNavigation from './top-navigation/TopNavigation';
import BottomDockApps from './bottom-dock-apps/BottomDockApps';
import CenterCanvas from './center-canvas/CenterCanvas';
import AppWrapper from './center-canvas/app-wrapper/AppWrapper';

// A macOS-style desktop page with a top menu bar and a 5-icon dock.
// Top-left profile button ("Me") opens a profile popup.
// Bottom dock icons either open a popup or navigate to external sites.

const DOCK_APPS = [
  {
    id: "about",
    label: "About",
    emoji: "👤",
    type: "popup" as const,
    description:
      "A quick summary of who I am as an engineer and educator, plus what I care about when building systems and courses.",
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🛠️",
    type: "popup" as const,
    description:
      "Highlighted work across microservices, AI-powered tools, and learning platforms—focused on impact and teaching value.",
  },
  {
    id: "teaching",
    label: "Teaching",
    emoji: "📚",
    type: "link" as const,
    url: "https://www.utoronto.ca/",
  },
  {
    id: "github",
    label: "GitHub",
    emoji: "💻",
    type: "link" as const,
    url: "https://github.com/",
  },
  {
    id: "contact",
    label: "Contact",
    emoji: "✉️",
    type: "popup" as const,
    description:
      "How I like to collaborate, communicate with students, and stay in touch about projects and opportunities.",
  },
];

export default function MainDesktop() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);

  const activeApp = DOCK_APPS.find((app) => app.id === activeAppId && app.type === "popup");
  const anyPopupOpen = profileOpen || !!activeApp;

  const handleDockClick = (appId: string) => {
    const app = DOCK_APPS.find((a) => a.id === appId);
    if (!app) return;

    if (app.type === "link" && app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (app.type === "popup") {
      setActiveAppId(app.id);
    }
  };

  const closeAllPopups = () => {
    setProfileOpen(false);
    setActiveAppId(null);
  };

  return (
    <div className="min-h-screen w-full text-slate-50 relative overflow-hidden">
      {/* Desktop background approximating macOS wallpaper */}
      <div className="w-full absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_#16a34a_0,_#15803d_30%,#052e16_55%),radial-gradient(circle_at_top,_#fb7185_0,_#fb923c_30%,#3b82f6_60%,#1e293b_90%)]" />

      {/* Subtle noise/overlay */}
      <div className="absolute inset-0 -z-10 bg-black/10" />

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
          onClick={closeAllPopups}
        />
      )}

      {/* Profile popup (Me button) */}
      <AboutMe isOpen={profileOpen} onClose={closeAllPopups} />

      {/* Dock app popup */}
      <AppWrapper
        isOpen={!!activeApp}
        app={activeApp || null}
        onClose={closeAllPopups}
      >
        <p className="text-xs sm:text-sm text-slate-200 mb-4">
          {activeApp?.description}
        </p>

        {/* <div className="flex justify-end">
          <button
            onClick={closeAllPopups}
            className="px-3 py-1.5 rounded-full border border-slate-700/80 text-slate-200 hover:bg-slate-800/80 text-[0.7rem]"
          >
            Got it
          </button>
        </div> */}
      </AppWrapper>
    </div>
  );
}
