<template lang="pug">
.contents  
  menubackground.showMenuBack(v-if="didMounted")
  .main.flex.gap-2.justify-content-between  
    
    .dashboard(@click="releaseControls()")
      .canvasElement(@click="focus")

        canvas#mycanvas(ref="canvasRef" )
    sidetools(v-if="didMounted")  
          


</template>

<script setup lang="ts">
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { fabric } from "fabric";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanvas } from "~~/stores/canvas";
const canvasStore = useCanvas();

const myimg = ref(null);
const canvasRef = ref();
const showMenuBack = ref(false);
const selectedElement = ref();
const didMounted = ref(false);
let fabricCanvas: fabric.Canvas, draggable, fabricElement;
onMounted(() => {
  fabricCanvas = new fabric.Canvas(canvasRef.value, {
    height: 500,
    width: 750,
    backgroundColor: "white",
    // shadow:1,
    //@ts-ignore
    backgroundColorAlpha: 0,
    borderColor: "black",
    strokeWidth: 5,
    hasControls: true
  });
  //@ts-ignore
  document.getElementById('mycanvas').fabric = fabricCanvas;
  console.log(document.getElementById('mycanvas').fabric)
  didMounted.value = true; //Note: this is to make sure that the canvas is mounted before the sidetools component is mounted
  gsap.registerPlugin(ScrollTrigger, Draggable);
  const myimg = document.getElementById("img");
  const canvasWrapper = document.querySelector<any>(".canvasElement");
  const animtion = ref();
  // console.log(canvasRef.value);
  if (canvasWrapper) {
    canvasWrapper.style.width = fabricCanvas.width + "px";
    canvasWrapper.style.height = fabricCanvas.height + "px";
  }
  canvasStore.$patch({ canasWrapper: canvasWrapper });
  canvasStore.$patch({ canvasref: canvasRef.value });

  fabricCanvas.set({
    borderColor: "black",
    strokeWidth: 5
  });

  const circle = new fabric.Circle({
    radius: 50,
    fill: "red",
    left: 100,
    top: 100
  });

  fabricCanvas.add(circle).setActiveObject(circle);

  // fabricCanvas.add(imgInstance);
});
function focus(event: any) {
  event.stopPropagation();
  const canvasWrapper = document.querySelector<any>(".canvasElement");

  showMenuBack.value = true;
  gsap.to(".showMenuBack", {
    y: 50,
    duration: 0.5
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
    duration: 1
  });
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
