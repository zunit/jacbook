import { type ComponentType } from "react";
import FindMe from "../features/desktop/bottom-dock-apps/dock-apps/find-me-app/FindMe";

export type DockApp = {
  id: string;
  label: string;
  emoji: string;
  type: "popup" | "link" | "iframe" | "component-popup";
  description?: string;
  url?: string;
  component?: ComponentType;
};

export const DOCK_APPS: DockApp[] = [
  {
    id: "Curiosities",
    label: "Curiosities",
    emoji: "💡",
    type: "link",
    url: "https://wizteam.notion.site/curiosities",
    
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🛠️",
    type: "link",
    url: "https://wizteam.notion.site/projects-jack",
     
  },
  {
    id: "courses",
    label: "Courses",
    emoji: "📚",
    type: "link",
    url: "https://wizteam.notion.site/course-content",
  },
  {
    id: "github",
    label: "GitHub",
    emoji: "💻",
    type: "link",
    url: "https://github.com/zunit",
  },
  {
    id: "findme",
    label: "Find Me",
    emoji: "📡",
    type: "component-popup",
    component: FindMe,
  },
];

