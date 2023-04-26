<template lang="pug">
.container.mt-3
    .BasicRepo.row(@click="showbasics =!showbasics" class=" myborder pb-2 relative") 
            .col-lg-12.relative
                img(src="../assets/folders/emoji.png")
                span(class=" bg-white border-round p-2 absolute down-up ")
                    Icon(name="material-symbols:arrow-drop-down" class=" text-xl" style="transform : rotate(-52deg);" v-if="!showbasics")
                    Icon(name="material-symbols:arrow-drop-up" class=" text-xl" style="transform : rotate(-52deg);" v-else)
            h5(class=" text-black-alpha-50 mt-2 text-center") Emojis
    ClientOnly
      .row(v-if="showbasics") 
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima1" @click="addjson(anima1)" disableShadowDom)
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima2" @click="addjson(anima2)" disableShadowDom )
      
      
    

</template>

<script setup lang="ts">
import anima1 from "../assets/json/jason edit files/emoji/Emoji_05.json";
import anima2 from "../assets/json/jason edit files/emoji/Emoji_06.json";

import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import lottie from "lottie-web";
import { useLayer } from "~~/stores/layer";

import useLotte from "~~/composables/useLottie";
const showbasics = ref(false);
import { emit } from "process";
const mycolors = ["red", "green", "blue"];
const canvasStore = useCanvas();
const layerStore = useLayer();
const { canasWrapper, color } = storeToRefs(canvasStore);
const emit = defineEmits(["selectProps"]);

let fabricCanvas: fabric.Canvas;
let canvaswrapper: any;
fabricCanvas = document.getElementById("mycanvas").fabric;
canvaswrapper = canasWrapper.value;
const uselottie = useLotte();

function addjson(animation) {
  const fabricImage = new uselottie(undefined, {
    scaleX: 0.4,
    scaleY: 0.4,
    animationData: animation,
    id: Math.random(),
  });

  // console.log("color", fabricImage.animationData.layers[9].shapes[0].it[1].c.k);
  console.log("first", fabricImage.id);

  fabricCanvas.add(fabricImage);
  fabricImage.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedProp: ele.target });
    canvasStore.$patch({ selectedID: Math.random() });
    const animationData = fabricImage.animationData;
    let idx;
    for (let i = 0; i < animationData.layers.length; i++) {
      if (animationData.layers[i].cl === "yellow") {
        idx = i;
      }
    }
    const animationColor = animationData.layers[idx].shapes[0].it[1].c.k;
    const hexValue = rgbaToHex(animationColor); // Convert to hexadecimal
    console.log("hexa", hexValue);
    // console.log(toRgba);

    canvasStore.$patch({ selectedPropColor: hexValue });
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

<style lang="scss"></style>
