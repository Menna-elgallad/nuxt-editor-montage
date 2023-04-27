<template lang="pug">
.menuNav    
  Transition
    ul.flex.justify-content-center.surface-200(v-if="tools==='back'")
        li.color: span
             Icon(name="bx:bxs-color-fill" )
             input(type="color" v-model ="color" )
             .colordiv(:style="{backgroundColor :color }")
        li.flex
            span( @click="flip('v')"): Icon(name="tabler:flip-vertical")
            span.ml-5(@click="flip('h')"): Icon(name="icon-park-outline:flip-vertically") 
        li: span(@click="removeback()"): Icon(name="material-symbols:delete")
        li
          color-picker(v-model="selectedColor")
  Transition
    ul.flex.justify-content-center.surface-200(v-if="tools === 'props'")
      li.coloranimat
          input(type="color" v-model ="selectedPropColor" :style="{backgroundColor : selectedPropColor}" @mouseup = "watchColor")
      li: span(@click="removeProp()"): Icon(name="material-symbols:delete")    
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { fabric } from "fabric";
import ColorPicker from "vue3-colorpicker";
console.log("ColorPicker", ColorPicker);

const selectedColor = ref("#000000");
const canvasStore = useCanvas();
const { canasWrapper, color, selectedPropColor, selectedProp } = storeToRefs(canvasStore);
const selected = ref();
const fabricCanvas = ref();
let canvaswrapper: any;
const flipx = ref(true);
const flipy = ref(true);
const props = defineProps({ tools: String });

function hexToRgba(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const a = 1;
  return [r / 255, g / 255, b / 255, a];
}

watch(selectedPropColor, () => {
  selected.value = selectedProp.value;
  console.log("colorr", selectedPropColor.value);
  const animationData = selected.value.animationData;
  let idx;
  for (let i = 0; i < animationData.layers.length; i++) {
    if (animationData.layers[i].cl === "yellow") {
      idx = i;
    }
  }
  animationData.layers[idx].shapes[0].it[1].c.k = hexToRgba(selectedPropColor.value); // Set fill color to red
  selected.value.updateAnimationData(animationData);
  // fabricCanvas.remove(fabricCanvas.getActiveObject());
  // Update the animation data of the Lottie animation object
  selected.value.set("animationData", animationData);
  console.log("sec", selected.value);

  fabricCanvas.value.renderAll();
  selected.value.play();
});

function watchColor() {
  selected.value = selectedProp.value;
  console.log("colorr", selectedPropColor.value);
  const animationData = selected.value.animationData;
  let idx;
  for (let i = 0; i < animationData.layers.length; i++) {
    if (animationData.layers[i].cl === "yellow") {
      idx = i;
    }
  }
  animationData.layers[idx].shapes[0].it[1].c.k = hexToRgba(selectedPropColor.value); // Set fill color to red
  selected.value.updateAnimationData(animationData);
  // fabricCanvas.remove(fabricCanvas.getActiveObject());
  // Update the animation data of the Lottie animation object
  selected.value.set("animationData", animationData);
  console.log("sec", selected.value);

  fabricCanvas.value.renderAll();
  selected.value.play();
}

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
function removeProp() {
  fabricCanvas.value.remove(fabricCanvas.value.getActiveObject());
}
</script>

<style lang="scss" scoped>
.menuNav {
  ul {
    gap: 1rem;
    // transform: translateY(-50px);
    position: relative;
    // z-index: -100;
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
.color {
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
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.coloranimat {
  input[type="color"] {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    width: 32px;
    height: 32px;
    border: 4px solid #eeeded;
    border-radius: 1.5rem;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0 !important;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
}
</style>
