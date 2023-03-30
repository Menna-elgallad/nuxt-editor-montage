<template lang="pug">
.contents  
  menubackground.showMenuBack
  .main.flex.gap-2.justify-content-between  
    
    .dashboard(@click="releaseControls()")
      .canvasElement(@click="focus")

        canvas(ref="canvasRef" )
    sidetools(@addAsset="addAsset" :selectedElement="selectedElement" :canvas="fabricCanvas")    
          


</template>

<script setup lang="ts">
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { fabric } from "fabric";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
const canvasStore = useCanvas();

const myimg = ref(null);
const canvasRef = ref(null);
const showMenuBack = ref(false);
const selectedElement = ref();
let fabricCanvas: fabric.canvas, draggable, fabricElement;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, Draggable);
  const myimg = document.getElementById("img");
  const canvasWrapper = document.querySelector<any>(".canvasElement");
  const animtion = ref();
  console.log(myimg);
  fabricCanvas = new fabric.Canvas(canvasRef.value, {
    height: 500,
    width: 750,
    backgroundColor: "white",
    // shadow:1,
    backgroundColorAlpha: 0,
    borderColor: "black",
    strokeWidth: 5,
    hasControls: true,
  });

  if (canvasWrapper) {
    canvasWrapper.style.width = fabricCanvas.width + "px";
    canvasWrapper.style.height = fabricCanvas.height + "px";
  }
  canvasStore.$patch({ canasWrapper: canvasWrapper });
  canvasStore.$patch({ mycanvas: fabricCanvas });
  canvasStore.$patch({ canvasref: canvasRef.value });

  fabricCanvas.set({
    borderColor: "black",
    strokeWidth: 5,
  });

  const circle = new fabric.Circle({
    radius: 50,
    fill: "red",
    left: 100,
    top: 100,
  });

  console.log(circle);
  fabricCanvas.add(circle).setActiveObject(circle);

  // fabricCanvas.add(imgInstance);
});
function focus(event) {
  event.stopPropagation();
  const canvasWrapper = document.querySelector<any>(".canvasElement");

  showMenuBack.value = true;
  gsap.to(".showMenuBack", {
    y: 50,
    duration: 0.5,
  });
  canvasWrapper.style.outline = "2px solid #125386";
}
function releaseControls() {
  const canvasWrapper = document.querySelector<any>(".canvasElement");
  if (showMenuBack.value) {
    canvasWrapper.style.outline = "none";
  }
  gsap.to(".showMenuBack", {
    y: -50,
    duration: 1,
  });
}
const calculateTextWidth = (text: string, font: string) => {
  const ctx = fabricCanvas?.getContext();
  ctx!.font = font;
  return ctx!.measureText(text).width + 20;
};

const addAsset = (event: AssetEvent) => {
  switch (event.type) {
    // case ASSET_TYPE.EMOJI:
    //   newSvg(`/emojis/${event.value}.svg`);
    //   break;
    // case ASSET_TYPE.SHAPE:
    //   newSvg(`/shapes/${event.value}.svg`);
    //   break;
    // case ASSET_TYPE.IMAGE:
    //   newImage(`/images/${event.value}.jpg`);
    //   break;
    // case ASSET_TYPE.UPLOAD:
    //   if (event.file) {
    //     switch (getFileExtension(event.file.name)) {
    //       case "png":
    //       case "jpg":
    //         newImage(event.file);
    //         break;
    //     }
    //   }
    //   break;
    case ASSET_TYPE.TEXT:
      switch (event.value) {
        case "heading":
          newTextbox(50, 700, "Heading", "Roboto");
          break;
        case "subheading":
          newTextbox(22, 500, "Subheading", "Roboto");
          break;
        case "body":
          newTextbox(18, 400, "Body", "Roboto");
          break;
        default:
          newTextbox(18, 400, "Text", event.value);
          break;
      }
      break;
  }
};

const newTextbox = (
  fontSize: number,
  fontWeight: string | number | undefined,
  text: string,
  font: string
) => {
  const id = String(Math.floor(100000 + Math.random() * 900000));
  const newText = new fabric.Textbox(text, {
    left: fabricCanvas.getWidth() / 2,
    top: fabricCanvas.getHeight() / 2,
    originX: "center",
    originY: "center",
    fontFamily: "Roboto",
    fill: "#111",
    fontSize,
    fontWeight,
    textAlign: "center",
    cursorWidth: 1,
    stroke: "#000",
    strokeWidth: 0,
    cursorDuration: 1,
    paintFirst: "stroke",
    objectCaching: false,
    absolutePositioned: true,
    strokeUniform: true,
    //@ts-ignore
    inGroup: false,
    cursorDelay: 250,
    width: calculateTextWidth(text, `${fontWeight} ${fontSize}px Roboto`),
    id: `text_${id}`,
  });
  fabricCanvas?.add(newText);
  fabricCanvas?.setActiveObject(newText);
  fabricCanvas?.bringToFront(newText);
  // newText.enterEditing();
  // newText.selectAll();
  fabricCanvas?.renderAll();
  newText.on("mousedown", (ele) => {
    selectedElement.value = ele.target;
  });
  //@ts-ignore
  fabricCanvas!.getActiveObject()!.set("fontFamily", font);
  fabricCanvas?.renderAll();
  // state.layers.push({
  //   id: `text_${id}`,
  //   object: newText,
  //   type: ASSET_TYPE.TEXT,
  //   color: randomColorHex()
  // });
};

enum ASSET_TYPE {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  EMOJI = "EMOJI",
  SHAPE = "SHAPE",
  VIDEO = "VIDEO",
  UPLOAD = "UPLOAD",
}

interface AssetEvent {
  type: ASSET_TYPE;
  value: string;
  file?: File;
}
</script>
<style lang="scss">
.setting {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;

  background-color: #ccccccbb;
  padding: 0.5rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 8px 2px #cccccc70;
  }
}

.dashboard {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .canvasElement {
    position: relative;

    &:hover {
      outline: 2px solid #125386 !important;
    }
    .canvas-container {
      // transform: translate(-50%, -50%);
      --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
      --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
        0 8px 10px -6px var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
  }
}
</style>
