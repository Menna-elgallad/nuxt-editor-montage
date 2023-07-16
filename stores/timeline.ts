import { defineStore } from "pinia";
import { Layer, Slide } from "../utils/types";
export const TimeLineStore = defineStore("timeLine", {
  state: () => ({
    slides: [
      { layers: [] as Layer[], id: 1, isActive: true, width: 10 },
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
        console.log(slide.id);
        const display = slide.id === id ? "block" : "none";
        const parent = document.getElementById(`mycanvas-${slide.id}`)
          ?.parentNode as HTMLElement;
        document
          .getElementById(`mycanvas-${slide.id}`)
          .style.setProperty("display", display);
        parent.style.setProperty("display", display);
        parent
          .getElementsByClassName("upper-canvas")[0]
          .style.setProperty("display", display);
      });
      this.slides = this.slides.map((slide) => ({
        ...slide,
        isActive: slide.id === id,
      }));
    },
    addlayerToActiveSlide(layer: Layer) {
      this.slides.map((slide) => ({
        ...slide,
        layers: slide.isActive
          ? slide.layers.push({ ...layer, width: layer?.width || slide.width })
          : slide.layers,
      }));
    },
    changeActiveWidth(width: number | string) {
      if (isNaN(parseInt(String(width))))
        throw new Error("provided width is not number");
      this.slides.map((slide) => ({
        ...slide,
        width: slide.isActive ? +width : slide.width,
        layers: slide.layers.map((s) => ({
          width: s?.width ? (s?.width > +width ? +width : s?.width) : 0,
        })),
      }));
    },
  },
});
