import { defineStore } from "pinia";
import { Layer, Slide } from "../utils/types";
export const TimeLineStore = defineStore("timeLine", {
  state: () => ({
    slides: [
      { layers: [] as Layer[], id: 1, isActive: true, length: 10 },
    ] as Slide[],
  }),
  getters: {
    activeSlide: (state) => {
      return state.slides.filter((slide) => slide.isActive)[0];
    },
  },
  actions: {
    activateSlide(id: number) {
      this.slides.forEach((slide) => {
        console.log(slide.id)
        const display = slide.id === id ? "block" : "none";
        if (document.getElementById(`mycanvas-${slide.id}`)?.style.display) {
          document
            .getElementById(`mycanvas-${slide.id}`)
            .style.setProperty("display", display);
        }
      });
      this.slides = this.slides.map((slide) => ({
        ...slide,
        isActive: slide.id === id,
      }));
    },
    addlayerToActiveSlide(layer: Layer) {
      console.log(this.slides);
      this.slides.map((slide) => ({
        ...slide,
        layers: slide.isActive ? slide.layers.push(layer) : slide.layers,
      }));
      console.log(this.slides);
    },
  },
});
