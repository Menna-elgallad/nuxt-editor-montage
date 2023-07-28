<template lang="pug">
.container.mt-3.characters
    //- .BasicRepo(@click="showbasics =!showbasics" class=" myborder pb-2 relative") 
    //-         .myhead
    //-             img(src="../assets/folders/emoji.png")
    //-             span(class=" bg-white border-round p-2 absolute down-up ")
    //-                 Icon(name="material-symbols:arrow-drop-down" class=" text-xl" style="transform : rotate(-52deg);" v-if="!showbasics")
    //-                 Icon(name="material-symbols:arrow-drop-up" class=" text-xl" style="transform : rotate(-52deg);" v-else)
    //-         h5(class=" text-black-alpha-50 mt-2 text-center") Emojis
    ClientOnly
        .row()
            .col-lg-6: lottie-player( hover style="width:100px" :src="anima1" @click="addjson(anima1)" disableShadowDom)
            .col-lg-6: lottie-player( hover style="width:100px" :src="anima2" @click="addjson(anima2)" disableShadowDom )
            .col-lg-6: lottie-player( hover style="width:100px" :src="anima3" @click="addjson(anima3)" disableShadowDom )
            .col-lg-6: lottie-player( hover style="width:100px" :src="anima4" @click="addjson(anima4)" disableShadowDom )
        
</template>

<script setup lang="ts">
import anima1 from "../assets/characters/character_confused_male_V1.json";
import anima2 from "../assets/characters/character_presenting_male_V1.json";
import anima3 from "../assets/characters/character_sad_male_V1.json";
// import anima4 from "../assets/characters/character_confused.json";
import anima4 from "../assets/characters/character_Selfie_male_V1.json";

import useLotte from "~~/composables/useLottie";
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { useLayer } from "~~/stores/layer";
import { fabric } from "fabric";
import lottie from "lottie-web";

const showbasics = ref(false);
// import { emit } from "process";
const mycolors = ["red", "green", "blue"];
const canvasStore = useCanvas();
const layerStore = useLayer();
import { TimeLineStore } from "~~/stores/timeline";
const timelineStore = TimeLineStore();
const { canasWrapper, color } = storeToRefs(canvasStore);
const timeLineStore = TimeLineStore()
const activatedSlide = timeLineStore.activeSlide.id
const emit = defineEmits(["selectProps"]);
var tmpCanvasEl = fabric.util.createCanvasElement();
let fabricCanvas: fabric.Canvas;
let canvaswrapper: any;
console.log(document.getElementById(`mycanvas-${activatedSlide}`))
fabricCanvas = document.getElementById(`mycanvas-${activatedSlide}`).fabric;
canvaswrapper = canasWrapper.value;
const uselottie = useLotte();

function addjson(animation) {
  fabricCanvas = document.getElementById(`mycanvas-${timeLineStore.activeSlide.id}`).fabric;
  console.log(`mycanvas-${timeLineStore.activeSlide.id}`)
  const fabricImage = new uselottie(undefined, {
    scaleX: 0.4,
    scaleY: 0.4,
    animationData: animation,
    // id: Math.random()
  });

  fabricCanvas.add(fabricImage);
  // fabricImage.animate("angle", "+=45", {
  //   onChange: fabricCanvas.renderAll.bind(fabricCanvas),
  //   duration: 1000
  // });
  fabricImage.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedProp: ele.target });
    canvasStore.$patch({ selectedID: Math.random() });
    const animationData = fabricImage.animationData;
    console.log("animationData", animationData);
    let hair;
    let shirt;
    let skin;
    let pants;
    let light;
    for (let i = 0; i < fabricImage.animationData.layers.length; i++) {
      if (fabricImage.animationData.layers[i].cl === "hair") {
        hair = i;
      } else if (fabricImage.animationData.layers[i].cl === "shirt") {
        shirt = i;
      } else if (fabricImage.animationData.layers[i].cl === "skin") {
        skin = i;
      } else if (fabricImage.animationData.layers[i].cl === "pants") {
        pants = i;
      } else if (fabricImage.animationData.layers[i].cl === "light") {
        light = i;
      }
    }
    const haircolor = rgbaToHex(
      fabricImage.animationData.layers[hair].shapes[0].it[1].c.k
    );
    const shirtcolor = rgbaToHex(
      fabricImage.animationData.layers[shirt].shapes[0].it[1].c.k
    );
    const skincolor = rgbaToHex(
      fabricImage.animationData.layers[skin].shapes[0].it[1].c.k
    );
    const pantscolor = rgbaToHex(
      fabricImage.animationData.layers[pants].shapes[0].it[1].c.k
    );
    const lightcolor = rgbaToHex(
      fabricImage.animationData.layers[light].shapes[0].it[1].c.k
    );
    // Convert to hexadecimal

    // console.log(toRgba);

    canvasStore.$patch({
      selectedPropColors: [
        haircolor,
        shirtcolor,
        skincolor,
        pantscolor,
        lightcolor,
      ],
    });
    // Change the color of a shape in the animation data object
  });
  timelineStore.addlayerToActiveSlide({
    element: fabricImage,
    hidden: false,
    name: "character",
    opacity: 1,
    type: "character",
    width:200,
    locked: false,
    timeToHide: 0,
    timeToShow: 0,
    startPosition : 0
  });
  fabricCanvas.renderAll();
  //   layerStore.$patch({
  //     layers: [
  //       ...layerStore.layers,
  //       {
  //         element: animation,
  //         hidden: false,
  //         name: "charcter",
  //         opacity: 1,
  //         type: "charcter",
  //         locked: false,
  //         timeToHide: 0,
  //         timeToShow: 0
  //       }
  //     ]
  //   });
  fabricImage.play();
  // fabricImage.stop();
}
function rgbaToHex(rgba) {
  const [r, g, b] = rgba.slice(0, 3).map((value) => Math.round(value * 255));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
</script>

<style lang="scss" scoped>
img,
video {
  width: 100%;
  object-fit: cover;
  height: 100%;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    filter: blur(3px);
    opacity: 50%;
    filter: saturate(2.2);
  }
}
.down-up {
  bottom: -30px;
  width: fit-content;
  height: 56px;
  right: 7px;
  transform: rotate(52deg);
}
.myhead {
  width: 100%;
  height: 100px;
}
</style>
