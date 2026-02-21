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

