import { defineStore } from "pinia";
import { Layer, Slide } from "../utils/types";
import { fabric } from "fabric";
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
    interval: null as any,
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
        (slid) =>
          (sum += id ? (slid.id <= id - 1 ? slid.width : 0) : slid.width)
      );
      return sum;
    },
    addlayerToActiveSlide(layer: Layer) {
      this.slides.map((slide) => ({
        ...slide,
        layers: slide.isActive
          ? slide.layers.push({
              ...layer,
              width: layer?.width || slide.width,
              id: slide.layers.length + 1,
            })
          : slide.layers,
      }));
    },
    setUnActiveLayers() {
      const activeSlide = this.activeSlide;
      
      activeSlide.layers.forEach((layer) => {
        if (
          layer.width + layer.startPosition + this.totalWidth(activeSlide.id) <=
          this.cursor.width
        ) {
          console.log("enered");
         
          // layer.element.visible = false;
          const fabricCanvas = document.getElementById(
            `mycanvas-${activeSlide.id}`
          )?.fabric;
          // console.log(fabricCanvas.getObjects().find((e) => e.id === layer.element.id) )
          const obj =  fabricCanvas.getObjects().find((e) => e.id === layer.element.id) 
          if (obj){
            const initial = layer.animationOut.playAnimation(layer.animationNameOut);
            setTimeout(function () {    fabricCanvas.remove(obj) }, 1000);
          
          
          }
          console.log(layer.element)
        
          fabricCanvas.renderAll();
        } else {
          // layer.element.visible = true;
          const fabricCanvas = document.getElementById(
            `mycanvas-${activeSlide.id}`
          )?.fabric;
          const checkExistance = fabricCanvas.getObjects().some((e)=> e.id === layer.element.id)
          if (!checkExistance){

            fabricCanvas?.add(layer.element);
            layer.element.play()
            layer.animation.playAnimation(layer.animationName);
          }
          // console.log(layer.element , fabricCanvas.getObjects())
          console.log("viewww")
          fabricCanvas?.renderAll();
        }
      });
    },
    changeActiveWidth(
      width: number | string,
      isSlide: boolean = false,
      slideId?: number
    ) {
      if (isNaN(parseInt(String(width))))
        throw new Error("provided width is not number");

      this.$patch({
        slides: this.slides.map((slide) => ({
          ...slide,
          width: slide.isActive && !isSlide ? +width : slide.width,
          layers: slide.isActive
            ? !isSlide
              ? slide.layers.map((s) => ({
                  ...s,
                  width: s?.width
                    ? s?.width > +width
                      ? +width
                      : s?.width
                    : +width,
                }))
              : slide.layers.map((s) => ({
                  ...s,
                  width:
                    +slideId === s.id && +width <= slide.width
                      ? +width
                      : s.width,
                }))
            : slide.layers,
        })),
      });
    },
    changeActiveOnCursor(cursorWidth: number) {
      const nextFullWidth = this.totalWidth(this.activeSlide.id + 1);
      if (cursorWidth >= nextFullWidth && nextFullWidth < this.totalWidth()) {
        this.cursor.width += 13;
        this.activateSlide(this.activeSlide.id + 1);
      }
    },
    run() {
      !this.cursor.run && clearInterval(this.interval);
      this.interval = this.cursor.run
        ? setInterval(() => {
            if (this.cursor.width === this.totalWidth() - 13) {
              this.cursor.width = 0;
              this.activateSlide(1);
              return;
            }
            this.setUnActiveLayers();
            this.cursor.width += this.cursor.run ? 1 : 0;
            this.changeActiveOnCursor(this.cursor.width);
          }, 50)
        : null;
    },
  },
});
