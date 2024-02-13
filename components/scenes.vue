<template lang="pug">
.container.mt-3
    .BasicRepo( v-for="folder in folders" @click="activeFolder =folder" v-if="!activeFolder" class="  pb-1 relative") 
            .myhead
                
                img(:src="`/folders/${folder}.png`")
                span(class="  py-2 px-[15px] absolute down-up ")
                    Icon.text-primary(name="typcn:arrow-sorted-down" class=" text-md" style="transform : rotate(-52deg);" v-if="!showbasics")
                    Icon.text-primary(name="typcn:arrow-sorted-up" class=" text-md" style="transform : rotate(-52deg);" v-else)
           
    ClientOnly
      .row(v-if="activeFolder==='emoji'" style="margin-left: -50px") 
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima1" @click="addjson(anima1)" disableShadowDom)
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima2" @click="addjson(anima2)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima4" @click="addjson(anima4)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima5" @click="addjson(anima5)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima6" @click="addjson(anima6)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima7" @click="addjson(anima7)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima8" @click="addjson(anima8)" disableShadowDom )
      characters(v-if="activeFolder==='edu'")
      
      
    

</template>

<script setup lang="ts">
import anima1 from "../assets/json/jason edit files/emoji/Emoji_05.json";
import anima2 from "../assets/json/jason edit files/emoji/Emoji_06.json";
// import anima3 from "~/public/affects/affect_1.json";
import anima4 from "~/public/affects/Doctor_1.json";
import anima5 from "~/public/affects/Element 01.json";
import anima6 from "~/public/affects/Element 02.json";
import anima7 from "~/public/affects/Element 04.json";
import anima8 from "~/public/affects/Element 06.json";
// import anima6 from "~/public/affects/Element 02.json";
// import anima6 from "~/public/affects/Element 02.json";
// import anima6 from "~/public/affects/Element 02.json";

import useLotte from "~~/composables/useLottie";
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { useLayer } from "~~/stores/layer";
import { fabric } from "fabric";
import lottie from "lottie-web";
const mycolors = ["red", "green", "blue"];
const canvasStore = useCanvas();
const layerStore = useLayer();
const { canasWrapper, color } = storeToRefs(canvasStore);
const emit = defineEmits(["selectProps"]);
const folders = ["finance", "emoji", "leisure", "urban", "workRemote", "edu"];
const activeFolder = ref("");

let fabricCanvas: fabric.Canvas;
let canvaswrapper: any;
import { TimeLineStore } from "~~/stores/timeline";
const timeLineStore = TimeLineStore();
const activatedSlide = timeLineStore.activeSlide.id;
fabricCanvas = document.getElementById(`mycanvas-${activatedSlide}`).fabric;
canvaswrapper = canasWrapper.value;
const uselottie = useLotte();

function addjson(animation) {
  const fabricImage = new uselottie(undefined, {
    scaleX: 0.4,
    scaleY: 0.4,
    animationData: animation,
    id: Math.random(),
  });

  console.log("color", fabricImage.animationData);
  console.log("first", fabricImage.id);

  fabricCanvas.add(fabricImage);
  fabricImage.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedProp: ele.target });
    canvasStore.$patch({ selectedID: Math.random() });
    const animationData = fabricImage.animationData;
    let indices = [];
    let colors = [];
    let values = [];

    for (let i = 0; i < animationData.layers.length; i++) {
      // if (animationData.layers[i].cl === "yellow") {
      //   idx = i;
      // }
      if (
        animationData.layers[i].cl?.includes("color") &&
        !colors.includes(animationData.layers[i].cl)
      ) {
        colors.push(animationData.layers[i].cl);
        if (animationData.layers[i].shapes[0].it[1]?.c?.k) {
          values.push({
            [animationData.layers[i].cl]: rgbaToHex(
              animationData.layers[i].shapes[0].it[1].c.k
            ),
          });
        }
      }
    }

    // const animationColor = animationData.layers[idx].shapes[0].it[1].c.k;
    // const hexValue = rgbaToHex(animationColor); // Convert to hexadecimal

    canvasStore.$patch({ selectedPropColors: [...values] });
    // Change the color of a shape in the animation data object
  });
  fabricCanvas.renderAll();
  layerStore.$patch({
    layers: [
      ...layerStore.layers,
      {
        element: animation,
        hidden: false,
        name: "charcter",
        opacity: 1,
        type: "charcter",
        locked: false,
        timeToHide: 0,
        timeToShow: 0,
      },
    ],
  });
  fabricImage.play();
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
  object-fit: contain;
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
  bottom: -5px;
  width: fit-content;
  // height: 56px;

  right: 12px;
  transform: rotate(52deg);
}
.myhead {
  width: 100%;
  height: 80px;
}
</style>
