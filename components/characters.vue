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
import anima4 from "../assets/characters/character_confused.json";
// import anima4 from "../assets/characters/character_Selfie_male_V1.json";

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
    id: Math.random()
  });

  const animationData = fabricImage.animationData;
  fabricCanvas.add(fabricImage);
  let idx;
  for (let i = 0; i < fabricImage.animationData.layers.length; i++) {
    if (fabricImage.animationData.layers[i].cl === "hair") {
      idx = i;
    }
  }
  fabricImage.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedProp: ele.target });
    canvasStore.$patch({ selectedID: Math.random() });
    const animationColor =
      fabricImage.animationData.layers[idx].shapes[0].it[1].c.k;
    const hexValue = rgbaToHex(animationColor); // Convert to hexadecimal
    console.log("hexa", hexValue);
    // console.log(toRgba);

    canvasStore.$patch({ selectedPropColor: hexValue });
    // Change the color of a shape in the animation data object
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
}
function rgbaToHex(rgba) {
  const [r, g, b] = rgba.slice(0, 3).map(value => Math.round(value * 255));
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
