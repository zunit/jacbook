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
    id: "About Me",
    label: "About Me",
    emoji: "🧑‍🚀",
    type: "popup",
    description:
      "My name is Jack Z and I'm an builder, software engineer and educator. Like to build things and help others build things. Explore my \"Desktop\" to learn more about me.",
  },
  {
    id: "Focus",
    label: "Focus",
    emoji: "🧠",
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
    id: "findme",
    label: "Find Me",
    emoji: "📡",
    type: "popup",
    description:
      "How I like to collaborate, communicate with students, and stay in touch about projects and opportunities.",
  },
];

