<template lang="pug">
.container
    h1 lottie    
    ClientOnly
      .row
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima1" @click="addjson(anima1)" disableShadowDom)
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima2" @click="addjson(anima2)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima3" @click="addjson(anima3)" disableShadowDom )
        .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima5" @click="addjson(anima5)" disableShadowDom )
    

</template>

<script setup lang="ts">
import anima1 from "../assets/json/jason edit files/emoji/Emoji_05.json";
import anima2 from "../assets/json/jason edit files/emoji/Emoji_06.json";
import anima3 from "../assets/json/jason edit files/emoji/Emoji_07.json";
import anima5 from "../assets/json/jason edit files/emoji/Emoji_10.json";

import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import lottie from "lottie-web";
import useLotte from "~~/composables/useLottie";
import { emit } from "process";
const mycolors = ["red", "green", "blue"];
const canvasStore = useCanvas();
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
  fabricImage.play();
}
function rgbaToHex(rgba) {
  const [r, g, b] = rgba.slice(0, 3).map((value) => Math.round(value * 255));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
</script>

<style lang="scss"></style>
