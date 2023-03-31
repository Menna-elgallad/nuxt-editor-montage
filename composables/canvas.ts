import { fabric } from "fabric";

export function useCanvas() {
  let fabricCanvas: fabric.Canvas = new fabric.Canvas('mycanvas',{
    height: 500,
    width: 750,
    backgroundColor: "white",
    // shadow:1,
    //@ts-ignore
    backgroundColorAlpha: 0,
    borderColor: "black",
    strokeWidth: 5,
    hasControls: true,
  });

  function addToCanvas(object: fabric.Object[]){
    fabricCanvas.add(...object)
  }

    return { fabricCanvas , addToCanvas };
}
