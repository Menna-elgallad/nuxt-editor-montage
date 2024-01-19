<template lang="pug">
.contents  
  //- animationBack.showMenuProp
  menubackground.showMenuBack(v-if="didMounted" :tools="topTools" :key="topTools")
  .main.flex.gap-2.justify-content-between  
    .dashboard(@click="releaseControls()" )
      .canvasElement(@click="focus" )
        canvas#mycanvas-1(ref="canvasRef" )
      .timeline-index 

          button.run-btn.pi(@click="runTimeLine(!timeLineStore.cursor.run)" :class="[timeLineStore.cursor.run ? 'pi-pause' : 'pi-play']")
          timeline(@follow-cursor="followCursor" @hide-seekbar="hideSeekbar" @seek="seek" class="p-2")
    sidetools(v-if="didMounted" @click="releaseControls()")   
    
        
</template>

<script setup lang="ts">
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { fabric } from "fabric";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { useSlide } from "~~/stores/slide";
import { TimeLineStore } from "~~/stores/timeline";
const timeLineStore = TimeLineStore();
const canvasStore = useCanvas();
const slideStore = useSlide();
const myimg = ref(null);
const canvasRef = ref();
const showMenuBack = ref(false);
const selectedElement = ref();
const didMounted = ref(false);
let fabricCanvas: fabric.Canvas, draggable, fabricElement;
const { selectedProp, selectedID, selectedID2 } = storeToRefs(canvasStore);
const topTools = ref("back");
const allowfocus = ref(true);

definePageMeta({
  layout: "dashboard",
});

watch(
  selectedID,
  () => {
    console.log("selectedProp", selectedProp);
    selectedPropA();
  },
  { deep: true }
);
watch(
  selectedID2,
  () => {
    console.log("selectedProp", selectedProp);
    selectedPropB();
  },
  { deep: true }
);
function selectedPropA() {
  allowfocus.value = false;
  topTools.value = "props";
  console.log(allowfocus.value);
  setTimeout(() => {
    allowfocus.value = true;
    console.log(allowfocus.value);
  }, 1000);
}
function selectedPropB() {
  allowfocus.value = false;
  topTools.value = "shapes";
  console.log(allowfocus.value);
  setTimeout(() => {
    allowfocus.value = true;
    console.log(allowfocus.value);
  }, 1000);
}
onMounted(() => {
  const screenWidth = window.innerWidth;
  const ourWidth = ((screenWidth * 50) / 100 - 40) * 0.9;
  fabricCanvas = new fabric.Canvas(canvasRef.value, {
    id: timeLineStore.activeSlide.id,
    height: calculateHeight(ourWidth),
    width: ourWidth,
    backgroundColor: "white",
    // shadow:1,
    //@ts-ignore

    backgroundColorAlpha: 0,
    borderColor: "black",
    strokeWidth: 5,
    hasControls: true,
  });

  //@ts-ignore
  document.getElementById("mycanvas-1").fabric = fabricCanvas;
  console.log(document.getElementById("mycanvas-1").fabric);
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
    strokeWidth: 5,
  });

  // fabricCanvas.add(imgInstance);
  slideStore.canvasSlides.push({
    fabric: fabricCanvas,
    slideNumber: 0,
  });
});

function runTimeLine(run: boolean) {
  timeLineStore.$patch({ cursor: { ...timeLineStore.cursor, run } });
  timeLineStore.run();
}

const updateLayerVisibility = () => {
  // @ts-ignore
  const activeObjectId: string = fabricCanvas?.getActiveObject()?.get("id");
  for (const layer of layers.value) {
    // @ts-ignore
    const objectId: string = layer.object?.get("id");
    layer.object!.visible = false;
    if (isLayerVisible(layer, false)) {
      layer.object!.visible = true;
    } else {
      layer.object!.visible = false;
      if (objectId === activeObjectId) {
        fabricCanvas?.discardActiveObject().renderAll();
      }
    }
  }
};

const isLayerVisible = (layer: any, noTrim: boolean) => {
  let layerOffsetMs = layer.offset * 10 + layer.startTrim * 10;
  if (noTrim) {
    layerOffsetMs = layer.offset * 10;
    return (
      state.currentTime >= layerOffsetMs &&
      state.currentTime <= layerOffsetMs + layer.duration
    );
  } else {
    const duration = layer.duration - layer.startTrim * 10 - layer.endTrim * 10;
    return (
      state.currentTime >= layerOffsetMs &&
      state.currentTime <= layerOffsetMs + duration
    );
  }
};

function calculateHeight(width: number) {
  return (width * 3) / 5;
}

function focus(event: any) {
  if (!allowfocus.value) {
    return;
  }
  event.stopPropagation();
  console.log("background");
  const canvasWrapper = document.querySelector<any>(".canvasElement");
  topTools.value = "back";

  showMenuBack.value = true;
  gsap.to(".showMenuBack", {
    y: 1,
    duration: 0.5,
  });
  canvasWrapper.style.outline = "2px solid #5156F6";
  slideStore.slideChange = Math.random();
}
function releaseControls() {
  const canvasWrapper = document.querySelector<any>(".canvasElement");
  if (showMenuBack.value) {
    canvasWrapper.style.outline = "none";
  }
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
  // display: flex;
  // flex-direction: column;
  // justify-content: space-evenly;
  height: 89vh;
  // align-items: center;
  display: flex;
  flex-direction: column;
  width: 80%;
  // max-width: 50vw;
  padding-top: 1rem;
  position: relative;

  .canvasElement {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    &:hover {
      outline: 2px solid $primary !important;
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
.run-btn {
  border: none;
  display: block;
  /* margin: auto; */
  background-color: transparent;
  color: #5156f6;
  font-size: 30px;
  // padding-top: 10px;
  margin: 10px 0;
  cursor: pointer;
}
// .showMenuBack {
//   position: absolute;
//   width: 100%;
// }
.timeline-index {
  width: 100%;
  /* height: 62%; */
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
