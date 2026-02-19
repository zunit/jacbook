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
    id: "About Me",
    label: "About Me",
    emoji: "🧑‍🚀",
    type: "popup",
    description:
      "My name is Jack Z and I'm a builder, software engineer and educator. Like to build things and help others build things. Explore my \"Desktop\" to learn more about me.",
  },
  {
    id: "Curiosities",
    label: "Curiosities",
    emoji: "💡",
    type: "link",
    url: "https://wizteam.notion.site/Curiosities-2b0c0bc03cb280a39492e5d96d5e79d9",
    
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🛠️",
    type: "link",
    url: "https://www.notion.so/wizteam/Projects-2b8c0bc03cb280338b1ffc7bea4a65b6",
     
  },
  {
    id: "courses",
    label: "Courses",
    emoji: "📚",
    type: "link",
    url: "https://www.notion.so/wizteam/Courses-2b8c0bc03cb280df80f4fd0c1f2dfffc",
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

