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
       
  Transition
    ul.flex.justify-content-center.surface-200(v-if="tools === 'props'")
      li.coloranimat
          input(type="color" v-model ="selectedPropColor" :style="{backgroundColor : selectedPropColor}" @mouseup = "watchColor")
      li: span(@click="removeProp()"): Icon(name="material-symbols:delete")    
    
  Transition
    ul.flex.justify-content-center.surface-200(v-if="tools === 'shapes'")
      li.coloranimat
          input(type="color" v-model ="selectedPropColor" :style="{backgroundColor : selectedPropColor}" @mouseup = "watchColor")
      li.color: span
          Icon.text-2xl(name="mdi:border-color" )
          input(type="color" v-model ="selectedPropBorder" )
          .colordiv(:style="{backgroundColor :selectedPropBorder }")    
      li: span(@click="removeProp()"): Icon(name="material-symbols:delete")    
         
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { fabric } from "fabric";

const selectedColor = ref("#000000");
let fabricCanvas: any;
const canvasStore = useCanvas();
const {
  canasWrapper,
  color,
  selectedPropColor,
  selectedProp,
  selectedPropBorder
} = storeToRefs(canvasStore);
const selected = ref();

let canvaswrapper: any;
const flipx = ref(true);
const flipy = ref(true);
const props = defineProps({ tools: String });
const bordercolor = ref();
function hexToRgba(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const a = 1;
  return [r / 255, g / 255, b / 255, a];
}
watch(selectedPropBorder, () => {
  console.log("selected", selected.value);
  var activeObject = fabricCanvas.getActiveObject();
  activeObject.set("stroke", selectedPropBorder.value);
  fabricCanvas.renderAll();
});
watch(selectedPropColor, () => {
  selected.value = selectedProp.value;
  console.log("colorr", selectedPropColor.value);

  const animationData = selected.value.animationData;
  if (animationData) {
    let idx;
    for (let i = 0; i < animationData.layers.length; i++) {
      if (animationData.layers[i].cl === "yellow") {
        idx = i;
      }
    }
    animationData.layers[idx].shapes[0].it[1].c.k = hexToRgba(
      selectedPropColor.value
    ); // Set fill color to red
    selected.value.updateAnimationData(animationData);
    // fabricCanvas.remove(fabricCanvas.getActiveObject());
    // Update the animation data of the Lottie animation object
    selected.value.set("animationData", animationData);
    console.log("sec", selected.value);

    fabricCanvas.renderAll();
    selected.value.play();
  } else {
    console.log("selected", selected.value);
    var activeObject = fabricCanvas.getActiveObject();
    activeObject.set("fill", selectedPropColor.value);
    fabricCanvas.renderAll();
  }
});

onMounted(() => {
  //@ts-ignore
  const mycanvas = document.getElementById("mycanvas").fabric;
  fabricCanvas = mycanvas;

  canvaswrapper = canasWrapper.value;
}),
  watch(fabricCanvas, (curr, prev) => {
    fabricCanvas = curr;
  });

function flip(type: string) {
  var activeObject = fabricCanvas.getActiveObject();
  if (activeObject) {
    console.log("activeeee");
    if (type === "v") {
      activeObject.flipX = flipx.value;
      flipx.value = !flipx.value;
    }
    if (type === "h") {
      activeObject.flipY = flipy.value;
      flipy.value = !flipy.value;
    }
    fabricCanvas.renderAll();
    return;
  }
  if (fabricCanvas.backgroundImage) {
    if (type === "v") {
      fabricCanvas.backgroundImage.flipX = flipx.value;
      flipx.value = !flipx.value;
    }
    if (type === "h") {
      fabricCanvas.backgroundImage.flipY = flipy.value;
      flipy.value = !flipy.value;
    }
    fabricCanvas.renderAll();
  }
}
function removeback() {
  var activeObject = fabricCanvas.getActiveObject();
  if (activeObject) {
    fabricCanvas.remove(activeObject);
    return;
  }
  fabricCanvas.setBackgroundImage(
    null,
    fabricCanvas.renderAll.bind(fabricCanvas)
  );
  const videoElement: any = canvaswrapper.querySelector("video");

  // Check if the video element exists
  if (videoElement) {
    // Remove the video element
    videoElement.parentNode.removeChild(videoElement);
  }
}
watch(color, (curr, prev) => {
  fabricCanvas.backgroundColor = curr;
  fabricCanvas.renderAll();
});
function removeProp() {
  fabricCanvas.remove(fabricCanvas.getActiveObject());
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
      // padding-right: 1.4rem;

      // &:not(:last-child) {
      //   border-right: 2px solid #ccccccdc;
      // }
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
    margin-top: 4px;
    display: block;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0 !important;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
}
</style>
