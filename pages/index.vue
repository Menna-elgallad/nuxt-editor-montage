<template lang="pug">
.content
  div(ref="draggableRef" class="draggable")
  .canvasElement
      canvas(ref="canvasRef")

</template>

<script setup>
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { fabric } from "fabric";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const canvasRef = ref(null);
const draggableRef = ref(null);
let fabricCanvas, draggable, fabricElement;
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, Draggable);
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

  draggable = Draggable.create(draggableRef.value, {
    onDrag: () => {
      if (fabricElement) {
        fabricElement.set({
          left: draggable.x,
          top: draggable.y,
        });
        fabricCanvas.renderAll();
      }
    },
    // onDragEnd: () => {
    //   fabricElement = new fabric.Rect({
    //     left: draggable.x,
    //     top: draggable.y,
    //     width: draggableRef.value.offsetWidth,
    //     height: draggableRef.value.offsetHeight,
    //     fill: "red",
    //   });
    //   fabricCanvas.add(fabricElement);
    // },
  });
});
if (process.client) {
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
.draggable {
  width: 100px;
  height: 100px;
  background-color: green;
  position: absolute;
  top: 100px;
  left: 100px;
}
</style>
