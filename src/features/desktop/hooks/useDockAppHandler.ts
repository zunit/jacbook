import { DOCK_APPS } from "../../../data/apps-data";

export interface UseDockAppHandlerProps {
  openApp: (appId: string) => void;
}

export interface UseDockAppHandlerReturn {
  handleDockClick: (appId: string) => void;
}

export function useDockAppHandler({ openApp }: UseDockAppHandlerProps): UseDockAppHandlerReturn {
  const handleDockClick = (appId: string) => {
    const app = DOCK_APPS.find((a) => a.id === appId);
    if (!app) return;

    if (app.type === "link" && app.url) {
      // Open link in new tab
      window.open(app.url, "_blank", "noopener,noreferrer");
      return;
    }

    // Popup and iframe types open as popups
    if (app.type === "popup" || app.type === "iframe") {
      openApp(appId);
    }
  };

  return {
    handleDockClick,
  };
}

