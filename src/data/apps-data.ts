export type DockApp = {
  id: string;
  label: string;
  emoji: string;
  type: "popup" | "link" | "iframe";
  description?: string;
  url?: string;
};

export const DOCK_APPS: DockApp[] = [
  {
    id: "about",
    label: "About",
    emoji: "👤",
    type: "popup",
    description:
      "A quick summary of who I am as an engineer and educator, plus what I care about when building systems and courses.",
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🛠️",
    type: "popup",
    description:
      "Highlighted work across microservices, AI-powered tools, and learning platforms—focused on impact and teaching value.",
  },
  {
    id: "teaching",
    label: "Teaching",
    emoji: "📚",
    type: "iframe",
    url: "https://wizteam.notion.site/ebd/2b0c0bc03cb280a39492e5d96d5e79d9",
  },
  {
    id: "github",
    label: "GitHub",
    emoji: "💻",
    type: "link",
    url: "https://github.com/zunit",
  },
  {
    id: "contact",
    label: "Contact",
    emoji: "📡",
    type: "popup",
    description:
      "How I like to collaborate, communicate with students, and stay in touch about projects and opportunities.",
  },
];

