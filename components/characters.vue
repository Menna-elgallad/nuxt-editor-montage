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
        .row.animation(v-if="showAnimation")
            h4(class=" m-2 ") Animate
            .flex.w-full   
              button(class=" w-6 p-2" :class="{'bg-blue-900 text-0' : animationTab=='in'}" @click="animationTab = 'in'") In
              button(class="w-6 p-2"  :class="{'bg-blue-900 text-0' : animationTab=='out'}" @click="animationTab = 'out'" ) Out
            transition(name="opacity"    mode="out-in"
        appear )
                .row(v-if=" animationTab==='in'")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'fade' ,addjson(selectedJson) ]" ): img.animationIcon(src="../assets/aniamtion-icons/fadeout.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'revealBottom',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/reveal1.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'revealTop',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/reveal2.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'revealLeft',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/revealout.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'revealRight',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/revealout2.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'slideBottom',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/rightslide1.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'slideTop',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/rightslide2.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'slideRight',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/slideout4.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'slideLeft',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/slideout.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'swear',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/smear1.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameIn = 'pop',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/zoom4.svg")
                .row(v-else-if=" animationTab==='out'")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'fade' ,addjson(selectedJson) ]" ): img.animationIcon(src="../assets/aniamtion-icons/fadeout.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'revealBottom',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/reveal1.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'revealTop',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/reveal2.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'revealLeft',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/revealout.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'revealRight',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/revealout2.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'slideBottom',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/rightslide1.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'slideTop',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/rightslide2.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'slideRight',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/slideout4.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'slideLeft',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/slideout.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'swear',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/smear1.svg")
                  .col-lg-3.animation-icon-container(@click="[  animationNameOut = 'pop',addjson(selectedJson)]"): img.animationIcon(src="../assets/aniamtion-icons/zoom4.svg")

        .row(v-else)
            //- .col-lg-6: lottie-player( hover  :src="anima1" @click="addjson(anima1)" disableShadowDom)
            //- .col-lg-6: lottie-player( hover  :src="anima2" @click="addjson(anima2)" disableShadowDom )
            //- .col-lg-6: lottie-player( hover  :src="anima3" @click="addjson(anima3)" disableShadowDom )
            //- .col-lg-6: lottie-player( hover  :src="anima4" @click="addjson(anima4)" disableShadowDom )
            //- .col-lg-6: lottie-player( hover  :src="anima5" @click="addjson(anima5)" disableShadowDom )
            //- .col-lg-6: lottie-player( hover  :src="anima1" @click="[selectedJson = anima1 , showAnimation=true ]" disableShadowDom )
            .col-lg-6: lottie-player( hover  :src="anima2" @click="[selectedJson = anima2 , showAnimation=true ]" disableShadowDom )
            .col-lg-6: lottie-player( hover  :src="anima3" @click="[selectedJson = anima3 , showAnimation=true ]" disableShadowDom )
            //- .col-lg-6: lottie-player( hover  :src="anima7" @click="addjson(anima7)" disableShadowDom )
            //- .col-lg-6: lottie-player( hover  :src="anima8" @click="addjson(anima8)" disableShadowDom )

        
</template>

<script setup lang="ts">

import anima2 from "../assets/characters/character_presenting_male_V1.json";
import anima3 from "../assets/characters/character_disapointed_fullbody.json";

// import anima7 from "../assets/characters/character_disapointed_shorts.json";
// import anima8 from "../assets/characters/character_disapointed_poloshirt.json";


import useLotte from "~~/composables/useLottie";
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { useLayer } from "~~/stores/layer";
import { fabric } from "fabric";
import lottie from "lottie-web";


const animationTab=  ref('in')
const animationNameIn = ref()
const animationNameOut = ref()
const selectedJson = ref()
const showbasics = ref(false);
// import { emit } from "process";
const mycolors = ["red", "green", "blue"];
const canvasStore = useCanvas();
const showAnimation = ref(false)
const layerStore = useLayer();
import { TimeLineStore } from "~~/stores/timeline";
const timelineStore = TimeLineStore();
const { canasWrapper, color } = storeToRefs(canvasStore);
const timeLineStore = TimeLineStore();
const activatedSlide = timeLineStore.activeSlide.id;
const emit = defineEmits(["selectProps"]);
var tmpCanvasEl = fabric.util.createCanvasElement();
let fabricCanvas: fabric.Canvas;
let canvaswrapper: any;

fabricCanvas = document.getElementById(`mycanvas-${activatedSlide}`).fabric;
canvaswrapper = canasWrapper.value;
const uselottie = useLotte();




function addjson(animation) {
  fabricCanvas = document.getElementById(
    `mycanvas-${timeLineStore.activeSlide.id}`
  ).fabric;
  console.log(`mycanvas-${timeLineStore.activeSlide.id}`);
  const fabricImage = new uselottie(undefined, {
    scaleX: 0.3,
    scaleY: 0.3,
    animationData: animation,
    id: Math.random()
  });

  fabricCanvas.add(fabricImage);
  let animateIn = new AnimationManagerIn(fabricImage)
  let animateOut = new AnimationManagerOut(fabricImage)
   animateIn.playAnimation(animationNameIn.value);
  const initialState =  animateOut.playAnimation(animationNameOut.value);
  showAnimation.value = false
  fabricImage.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedProp: ele.target });
    canvasStore.$patch({ selectedID: Math.random() });
    const animationData = fabricImage.animationData;
 
    // const sadShirt =  anima8.layers.filter((e)=> e.cl==='shirt')
    // const sadShirt2 =  anima8.layers.filter((e)=> e.nm==='detailshirt')
    // console.log("sad", sadShirt)
    // let indexSad = 0 ; 
    // let indexSad2 = 0 ; 
    // for (let i = 0; i < fabricImage.animationData.layers.length; i++ ){
    //   if (fabricImage.animationData.layers[i].cl === "shirt" && indexSad < sadShirt.length){
    //     animationData.layers[i] = sadShirt[indexSad]
    //     indexSad++
    //   }
    // }
    // for (let i = 0; i < fabricImage.animationData.layers.length; i++ ){
    //   if (fabricImage.animationData.layers[i].nm === "detailshirt" && indexSad2 < sadShirt2.length){
    //     animationData.layers[i] = sadShirt2[indexSad2]
    //     indexSad2++
    //   }
    // }
    // fabricImage.setAnimationData(animationData);
    // fabricImage.play();

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
        lightcolor
      ]
    });
    // Change the color of a shape in the animation data object
  });
  timelineStore.addlayerToActiveSlide({
    element: fabricImage,
    animationIn : animateIn , 
    animationOut : animateOut , 
    animationNameIn : animationNameIn.value ,
    animationNameOut : animationNameOut.value ,
    initialState : initialState  , 
    hidden: false,
    name: "character",
    opacity: 1,
    type: "character",
    width: 200,
    locked: false,
    timeToHide: 0,
    timeToShow: 0,
    startPosition: 0 , 
  });
  fabricCanvas.renderAll();
  fabricImage.play();
  // fabricImage.stop();
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
.animation-icon-container{
  background-color: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 0 8px 4px #cccccc1a;
  width:70px ;
  height:70px ;
  margin: 5px;
  img{
    object-fit: contain !important;
    width: 100% !important;
  }
}
</style>
