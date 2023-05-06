import { defineStore } from "pinia";
import { fabric } from "fabric";
import { useLocalStorage } from "@vueuse/core";

// let mycanvas: fabric.Canvas;
let selectedElement: Ref<any>;
let myCanvas: fabric.Canvas;

export const useCanvas = defineStore("canvas", {
  state: () => ({
    canasWrapper: "",
    color: "",
    canvasref: "",
    selectedElement,
    selectedProp: "",
    selectedPropColor: "",
    selectedID: "",
    selectedID2: "",
    myCanvas: myCanvas,
    selectedPropBorder : "" ,
  }),
});
