import { defineStore } from "pinia";
export const useLayer = defineStore("layer", {
  state: () => ({ layers: [] as Layer[] }),
});

interface Layer {
  element: any;
  name: string;
  type: string;
  hidden: boolean;
  locked: boolean;
  opacity: number;
  timeToShow: number;
  timeToHide: number;
}
