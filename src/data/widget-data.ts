import { type ComponentType } from "react";
import BoardgamesWidget from "../features/desktop/center-canvas/widgets/wiz-work/BoardGames";
// TODO: Import images from assets when available
// import WizLearnerImage from "../assets/wiz-learner.png";
// import WizBusinessImage from "../assets/wiz-business.png";
import WizLearnerImage from "../assets/wiz-work/wizlearner.png";
import WizBusinessImage from "../assets/wiz-work/wizpartner.png";

export type FolderItem = {
  name: string;
  image: string; // Imported image path from assets
  url: string;
  description: string;
};

export type Widget =
  | {
      id: string;
      name: string;
      type: "image" | "note" | "link";
      image?: string;
      note?: string[];
      url?: string;
      component?: ComponentType;
    }
  | {
      id: string;
      name: string;
      type: "folder";
      folderItems: FolderItem[];
      component?: ComponentType;
    };

export const WIDGETS: Widget[] = [
  {
    id: "wiz-work",
    name: "Current Wiz Work ",
    type: "folder",
    folderItems: [
      {name: "WizLearner", image: WizLearnerImage, url: "https://learn.wizrobotics.com/", description: "Our STEM App Store for Students, Parents, and Educators"}, // TODO: Replace with WizLearnerImage when available
      {name: "WizBusiness", image: WizBusinessImage, url: "https://partner.wizrobotics.com/", description: "Our Partner Program for Businesses"}, // TODO: Replace with WizBusinessImage when available
    ], // Array of folder items with name, image, url
    // component: WizWork, // Store the component reference, not JSX
  },
  {
    id: "boardgames",
    name: "Fav Boardgames",
    type: "note",
    note: [
      "1. Ticket to Ride",
      "2. Splendor",
      "3. Codenames",
      "4. Decrypto",
      "5. Potato Pirates"
    ],
    component: BoardgamesWidget,
  },

];