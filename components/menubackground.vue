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
      li(v-for="(item , index) in selectedPropColors")
        .coloranimat
            input(type="color" v-model ="selectedPropColors[index]" :style="{backgroundColor : item}" )
          
      li: span(@click="removeProp()"): Icon(name="material-symbols:delete")    
      
  Transition
    ul.flex.justify-content-center.surface-200(v-if="tools === 'shapes'")
      
      li.coloranimat
          input(type="color" v-model ="selectedPropColor" :style="{backgroundColor : selectedPropColor}" )
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
  selectedPropColors,
  selectedProp,
  selectedPropBorder
} = storeToRefs(canvasStore);
const selected = ref();
import { TimeLineStore } from "~~/stores/timeline";
const timeLineStore = TimeLineStore()
const activatedSlide = timeLineStore.activeSlide.id

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
  console.log([r / 255, g / 255, b / 255, a]);
  return [r / 255, g / 255, b / 255, a];
}
watch(selectedPropBorder, () => {
  console.log("selected", selected.value);
  var activeObject = fabricCanvas.getActiveObject();
  activeObject.set("stroke", selectedPropBorder.value);
  fabricCanvas.renderAll();
});
watch(selectedPropColor, () => {
  const selectedAnimation = fabricCanvas.getActiveObject();
  console.log("color1");

  console.log("colorr", selectedPropColor.value);

  const animationData = selectedAnimation.animationData;
  if (animationData) {
    let idx;
    for (let i = 0; i < animationData.layers.length; i++) {
      if (animationData.layers[i].cl === "yellow") {
        animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
          selectedPropColor.value
        );
      }
    }

    // Set fill color to red
    console.log("animationData2", animationData);

    console.log("sec first", selectedAnimation);

    // fabricCanvas.remove(fabricCanvas.getActiveObject());
    // Update the animation data of the Lottie animation object
    selectedAnimation.setAnimationData(animationData);

    fabricCanvas.renderAll();
    // console.log("fabricCanvas", fabricCanvas.getObjects());
    selectedAnimation.play();
  } else {
    console.log("selected", selected.value);
    var activeObject = fabricCanvas.getActiveObject();
    activeObject.set("fill", selectedPropColor.value);
    fabricCanvas.renderAll();
  }
});

watch(
  selectedPropColors,
  () => {
    console.log("colorsssss");
    const selectedAnimation = fabricCanvas.getActiveObject();

    console.log("colorr", selectedPropColors.value);

    const animationData = selectedAnimation.animationData;

    if (animationData) {
      let idx;
      for (let i = 0; i < animationData.layers.length; i++) {
        if (animationData.layers[i].cl === "hair") {
          // console.log(i, selected.value);
          animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
            selectedPropColors.value[0]
          );
        } else if (animationData.layers[i].cl === "beard") {
          // console.log(i, selected.value);
          animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
            selectedPropColors.value[0]
          );
        } else if (animationData.layers[i].cl === "shirt") {
          // console.log(i, selected.value);
          animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
            selectedPropColors.value[1]
          );
        } else if (animationData.layers[i].cl === "skin") {
          // console.log(i, selected.value);
          animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
            selectedPropColors.value[2]
          );
        } else if (animationData.layers[i].cl === "pants") {
          // console.log(i, selected.value);
          animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
            selectedPropColors.value[3]
          );
        } else if (animationData.layers[i].cl === "light") {
          // console.log(i, selected.value);
          animationData.layers[i].shapes[0].it[1].c.k = hexToRgba(
            selectedPropColors.value[4]
          );
        }
      }

      // Set fill color to red
      console.log("animationData2", animationData);

      console.log("sec first", selectedAnimation);

      // fabricCanvas.remove(fabricCanvas.getActiveObject());
      // Update the animation data of the Lottie animation object
      selectedAnimation.setAnimationData(animationData);

      fabricCanvas.renderAll();
      // console.log("fabricCanvas", fabricCanvas.getObjects());
      selectedAnimation.play();
    }
  },
  { deep: true }
);

onMounted(() => {
  //@ts-ignore
  console.log(`mycanvas-${activatedSlide}`)
  const mycanvas = document.getElementById(`mycanvas-${activatedSlide}`).fabric;
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
    height: 45px;
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
