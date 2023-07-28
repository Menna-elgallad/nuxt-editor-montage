import { defineStore } from "pinia";
import { Layer, Slide } from "../utils/types";
export const TimeLineStore = defineStore("timeLine", {
  state: () => ({
    slides: [
      { layers: [] as Layer[], id: 1, isActive: true, width: 200 },
    ] as Slide[],
    cursor: {
      slideId: 1,
      width: 0,
      run: false,
    } as { slideId: number; width: number; run: boolean },
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
    totalWidth(id?: number) {
      let sum = 0;
      this.slides.forEach(
        (slid) => (sum += id ? (slid.id <= id - 1 ? slid.width : 0) :slid.width)
      );
      return sum;
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
      this.$patch({
        slides: this.slides.map((slide) => ({
          ...slide,
          width: slide.isActive ? +width : slide.width,
          layers: slide.layers.map((s) => ({
            width: s?.width ? (s?.width > +width ? +width : s?.width) : 0,
          })),
        })),
      });
    },
    changeActiveOnCursor(cursorWidth: number) {
      const nextFullWidth = this.totalWidth(this.activeSlide.id + 1);
      if (cursorWidth >= nextFullWidth && nextFullWidth < this.totalWidth()){
        this.cursor.width += 13
        this.activateSlide(this.activeSlide.id + 1);
      }
    },
    run() {
      console.log(this.cursor.width)
      this.cursor.width === 0 &&
        setInterval(() => {
          if (this.cursor.width === this.totalWidth() -13) {
            this.cursor.width = 0;
            this.activateSlide(1)
            return;
          }
          this.cursor.width += this.cursor.run ? 1 : 0;
          this.changeActiveOnCursor(this.cursor.width);
        }, 50);
    },
  },
});
