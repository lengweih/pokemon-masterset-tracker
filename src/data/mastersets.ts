import { APP_CONFIG } from "../config/app";

export interface MastersetOption {
  id: string;
  name: string;
}

export const mastersetOptions: MastersetOption[] = [
  {
    id: "prismatic-evolutions",
    name: APP_CONFIG.currentSetName,
  },
  {
    id: "surging-sparks",
    name: "Surging Sparks",
  },
];
