<template lang="pug">

.timeline.flex
  .layers
    .controls
      button.control-btn 
        img(src="@/assets/stop_lines.svg" alt="stop")
      button.control-btn
        img(src="@/assets/pause_lines.svg" alt="stop")
      button.control-btn(@click="openvid()")
        img(src="@/assets/play_lines.svg" alt="stop")
    .layer 
      .layer-name(v-if="layerStore?.layers.length > 0" v-for="(layer, index) in layerStore.layers" :key="index" :style="{'background-color': index % 2 == 0 ? '#e9ecef' : '#fff'}")
        .image-cont.flex
          img.image-icon(src="@/assets/image.svg" alt="layer")
          spane {{ index + 1 }}
        span.layer-type {{ layer.name }}
        img.image(v-if="!layer.hidden" src="@/assets/eye.svg" alt="layer" @click="turnHidden(true , index)")
        img.image(v-if="layer.hidden" src="@/assets/eye-solid.svg" alt="layer" @click="turnHidden(false , index)")
  .cont  
    .timeline-cont
        .flex(v-for="(n, i) in 50" :key="i")
            span {{ n % 5 == 0 ? n/5 : '|' }}
    .time
    .time-elements
      .time-element(v-if="layerStore.layers.length > 0" v-for="(layer, index) in layerStore.layers" :key="index" :style="{'background-color':colors[index] }")
        span {{layer.name}}
      .notfound(v-else)
        span.pl-5.mt-3 No layers found  


</template>

<script setup lang="ts">
import { useLayer } from "~/stores/layer";
import { fabric } from "fabric";

const layerStore = useLayer();
const colors = [
  "#0d3c61",
  "#E7458A",
  "#28AFF7",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
];
console.log(layerStore.layers)
// function randomColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
function turnHidden(value: boolean, index: number) {
  layerStore.layers[index].hidden = value;
}
const fabricCanvas: fabric.Canvas = ref({});
onMounted(() => {
  fabricCanvas.value = document.getElementById("mycanvas").fabric;
});

function openvid() {
  fabricCanvas.value = document.getElementById("mycanvas").fabric;
  console.log("fabricCanvas.getObjects()", fabricCanvas.value.getObjects());
  fabricCanvas.value.getObjects().forEach((element) => {
    if (element.type === "lottie") {
      element.play();
      // for (let i = 0; i < element.animationData.layers.length; i++) {
      //   if (element.animationData.layers[i].cl === "hair") {
      //     console.log("element.animationData", element.animationData       );
      //     element.animationData.layers[i].shapes[0].it[1].c.k = [
      //       0.8196078431372549,
      //       0.5333333333333333,
      //       0.2784313725490196,
      //       1
      //     ];
      //   }
      // }
    }
  });
  fabricCanvas.value.renderAll();
}
</script>

<style lang="scss" scoped>
.cont {
  flex: 0.2;
}
.layers {
  flex: 0.8;
  overflow: hidden;
  height: 100%;
  .layer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #0d3d6121;
    .layer-name {
      font-size: 12px;
      background-color: #e9ecef;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 26px 5px;
      color: #0d3c61;

      .layer-type {
        color: #0d3c61;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }
      .image-cont {
        height: 35px;
        width: 35px;
        align-items: center;
        font-size: 12px;
      }
      .image-icon {
        height: 100%;
        width: 100%;
        padding: 3px;
      }
      .image {
        height: 25px;
        width: 25px;
        cursor: pointer;
      }
    }
  }
  .controls {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 60px;
    padding: 3px 12px;
    .control-btn {
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.timeline-cont {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  padding: 3px 12px;
  color: #0d3c61;
}
.timeline {
  margin-top: 1rem;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  height: 28vh;
  padding: 1rem;
  background-color: white;
  .time {
    width: 100%;
    height: 40px;
    background-color: #d1e3e7;
    border-radius: 5px;
    margin-top: -5px;
  }
  .time-elements {
    width: 100%;
    padding-top: 9px;
    margin-left: 5px;
    border-radius: 1.2rem;
  }
  .time-element {
    color: #fff;
    padding: 5px;
    width: 100%;
    height: 40px;
    padding: 26px 10px;
    display: flex;
    align-items: center;
    font-size: 20px;
    border-radius: 1.8rem;
    font-weight: bold;
  }
  .top-time {
    width: 100%;
    height: 15%;
    position: relative;
    border-bottom: 1px solid #0d3c61;
  }
}
</style>
