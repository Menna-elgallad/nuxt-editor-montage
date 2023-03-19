<template lang="pug">

.canvasElement
    canvas(ref="canvasRef")
</template>

<script setup>
import gsap from "gsap";
import { fabric } from "fabric";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const canvasRef = ref(null);
let fabricCanvas;
onMounted(() => {
  fabricCanvas = new fabric.Canvas(canvasRef.value, {
    height: 500,
    width: 500,
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
});
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".mybuttn", {
    autoAlpha: 0,
    duration: 1.5,
    y: -100,
  });
}
</script>
<style lang="scss">
.canvasElement {
  background-color: #eceaea;
  position: relative;
  width: 100%;
  height: 100vh;
  .canvas-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
