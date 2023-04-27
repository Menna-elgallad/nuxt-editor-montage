import { defineStore } from "pinia";
import { fabric } from "fabric";

export interface CanvasSlide {
  fabric: fabric.Canvas;
  slideNumber: number;
}

export const useSlide = defineStore("slide", {
  state: () => ({
    canvasSlides: [] as CanvasSlide[],
    currentSlide: 0,
    currentCanvas: {} as fabric.Canvas,
    slideChange: Math.random(),
  }),
});
