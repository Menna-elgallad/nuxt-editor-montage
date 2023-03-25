<template lang="pug">
.main  
  .content.container
    .canvasElement
        canvas(ref="canvasRef")
  sidetools(@changeBackColor="changColor")    


</template>

<script setup>
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { fabric } from "fabric";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import noskom from "../assets/jsons/nos kom.json";
import { storeToRefs } from "pinia";
import { useColorsStore } from "~~/stores/background";

const colorstore = useColorsStore();
const { color, backimage, removed } = storeToRefs(colorstore);
const myimg = ref(null);
const canvasRef = ref(null);
const draggableRef = ref(null);
let fabricCanvas, draggable, fabricElement;
function imgclicked() {
  console.log(myimg.value);
}
watch(color, (curr, pre) => {
  fabricCanvas.backgroundColor = curr;
  fabricCanvas.renderAll();
});
watch(backimage, (curr, pre) => {
  const imgInstance = new fabric.Image(curr, {
    // preserveAspectRatio: true,
  });
  // fabricCanvas.backgroundImage = imgInstance;
  fabricCanvas.setBackgroundImage(imgInstance, function () {
    let img = fabricCanvas.backgroundImage;
    img.originX = "left";
    img.originY = "top";
    img.scaleX = fabricCanvas.getWidth() / img.width;
    img.scaleY = fabricCanvas.getHeight() / img.height;

    fabricCanvas.renderAll();
  });

  // fabricCanvas.renderAll();
});
watch(removed, (curr, pre) => {
  fabricCanvas.setBackgroundImage(
    null,
    fabricCanvas.renderAll.bind(fabricCanvas)
  );
});
console.log("myimg");
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, Draggable);
  const myimg = document.getElementById("img");

  console.log(myimg);
  fabricCanvas = new fabric.Canvas(canvasRef.value, {
    height: 411,
    width: 640,
    backgroundColor: "white",
    backgroundColorAlpha: 0,
  });

  const circle = new fabric.Circle({
    radius: 50,
    fill: "red",
    left: 100,
    top: 100,
  });
  const circle2 = new fabric.Circle({
    radius: 30,
    fill: "green",
    left: 20,
    top: 20,
  });
  console.log(circle);
  fabricCanvas.add(circle).setActiveObject(circle);
  fabricCanvas.add(circle2);

  // fabricCanvas.add(imgInstance);
});
</script>
<style lang="scss">
.canvasElement {
  position: relative;
  width: 100%;
  height: 90vh;

  .canvas-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
