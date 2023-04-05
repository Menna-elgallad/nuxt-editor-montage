<template lang="pug">
.menuNav    
    ul.flex.justify-content-center.surface-300
        li.color: span
             Icon(name="bx:bxs-color-fill" )
             input(type="color" v-model ="color" )
             .colordiv(:style="{backgroundColor :color }")
        li.flex
            span( @click="flip('v')"): Icon(name="tabler:flip-vertical")
            span.ml-5(@click="flip('h')"): Icon(name="icon-park-outline:flip-vertically") 
        li: span(@click="removeback()"): Icon(name="material-symbols:delete")
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { fabric } from "fabric";
const canvasStore = useCanvas();
const { canasWrapper, color, mycanvas } = storeToRefs(canvasStore);

const fabricCanvas = ref();
let canvaswrapper: any;
const flipx = ref(true);
const flipy = ref(true);

onMounted(() => {
  //@ts-ignore
  fabricCanvas.value = document.getElementById("mycanvas").fabric;

  canvaswrapper = canasWrapper.value;
}),
  watch(fabricCanvas.value, (curr, prev) => {
    fabricCanvas.value = curr;
  });

function flip(type: string) {
  if (fabricCanvas.value.backgroundImage) {
    if (type === "v") {
      fabricCanvas.value.backgroundImage.flipX = flipx.value;
      flipx.value = !flipx.value;
    }
    if (type === "h") {
      fabricCanvas.value.backgroundImage.flipY = flipy.value;
      flipy.value = !flipy.value;
    }
    fabricCanvas.value.renderAll();
  }
}
function removeback() {
  fabricCanvas.value.setBackgroundImage(
    null,
    fabricCanvas.value.renderAll.bind(fabricCanvas.value)
  );
  const videoElement: any = canvaswrapper.querySelector("video");

  // Check if the video element exists
  if (videoElement) {
    // Remove the video element
    videoElement.parentNode.removeChild(videoElement);
  }
}
watch(color, (curr, prev) => {
  fabricCanvas.value.backgroundColor = curr;
  fabricCanvas.value.renderAll();
});
</script>

<style lang="scss" scoped>
.menuNav {
  ul {
    gap: 1rem;
    transform: translateY(-50px);
    position: relative;
    z-index: -100;
    li {
      span {
        border-radius: 1.2rem;
        padding: 0.5rem;
        display: grid;
        place-content: center;
        transition: all 0.5s ease;
        cursor: pointer;
        &:hover {
          background-color: white;
        }
      }
      color: var(--blue-900);
      font-size: 1.8rem;
      padding-right: 1.4rem;

      &:not(:last-child) {
        border-right: 2px solid #ccccccdc;
      }
    }
  }
}
.colordiv {
  width: 100%;
  height: 3px;
  background-color: white;
}
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  width: 30px;
  height: 3px;
  background-color: transparent;
  position: absolute;
  //   border: 4px solid #eeeded;
  //   border-radius: 1.5rem;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
}
input[type="color"]:focus {
  border: none;
  box-shadow: none !important;
  border-color: transparent !important;
}
</style>
