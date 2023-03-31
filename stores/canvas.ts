import { defineStore } from "pinia";
import { fabric } from "fabric";
import { useLocalStorage } from '@vueuse/core'

// let mycanvas: fabric.Canvas;
let selectedElement: Ref<any>;

export const useCanvas = defineStore("canvas", {
  state: () => ({canasWrapper: "", color: "", canvasref: "" , selectedElement}),

  // actions: {
  //   setCanvasElement(canvas: HTMLCanvasElement) {
  //     this.$state.mycanvas = new fabric.Canvas(canvas, {
  //       height: 500,
  //       width: 750,
  //       backgroundColor: "white",
  //       // shadow:1,
  //       //@ts-ignore
  //       backgroundColorAlpha: 0,
  //       borderColor: "black",
  //       strokeWidth: 5,
  //       hasControls: true,
  //     });
  //   },
  // },
});
