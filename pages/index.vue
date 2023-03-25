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
const { color, backimage, removed, vidUploaded } = storeToRefs(colorstore);
const myimg = ref(null);
const canvasRef = ref(null);
const draggableRef = ref(null);
const imgInstance = ref();
let fabricCanvas, draggable, fabricElement;
function imgclicked() {
  console.log(myimg.value);
}
watch(color, (curr, pre) => {
  fabricCanvas.backgroundColor = curr;
  fabricCanvas.renderAll();
});
watch(backimage, (curr, pre) => {
  if (typeof curr === "object") {
    imgInstance.value = new fabric.Image(curr, {});
  } else if (typeof curr === "string") {
    imgInstance.value = curr;
  }

  fabricCanvas.backgroundImage = imgInstance.value;
  fabricCanvas.setBackgroundImage(imgInstance.value, function () {
    let img = fabricCanvas.backgroundImage;
    img.originX = "left";
    img.originY = "top";
    img.scaleX = fabricCanvas.getWidth() / img.width;
    img.scaleY = fabricCanvas.getHeight() / img.height;
    img.selectable = false;
    img.hasBorders = false;

    fabricCanvas.renderAll();
  });

  fabricCanvas.renderAll();
});

watch(vidUploaded, (curr, prev) => {
  // fabric.Image.fromURL(
  //   curr,
  //   function (videoImg) {
  //     // Set the isVideo and evented properties
  //     videoImg.set({
  //       isVideo: true,
  //       evented: false,
  //     });

  //     // Set the canvas background to the video image
  //     fabricCanvas.setBackgroundImage(
  //       videoImg,
  //       fabricCanvas.renderAll.bind(fabricCanvas)
  //     );
  //   },
  //   { crossOrigin: "anonymous" }
  // );

  function getVideoElement(url) {
    var videoE = document.createElement("video");
    videoE.width = fabricCanvas.getWidth();
    videoE.height = fabricCanvas.getHeight();
    videoE.muted = true;
    videoE.selectable = false;
    videoE.crossOrigin = "anonymous";
    videoE.hasBorders = false;
    var source = document.createElement("source");
    source.src = url;
    source.type = "video/mp4";
    videoE.appendChild(source);
    return videoE;
  }

  var url_mp4 = curr;

  var videoE = getVideoElement(url_mp4);
  console.log("myvidddd", getVideoElement(url_mp4));
  var fab_video = new fabric.Image(videoE);
  // fabricCanvas.add(fab_video);

  fabricCanvas.sendToBack(fab_video);
  fabricCanvas.backgroundImage = fab_video;
  fabricCanvas.setBackgroundImage(fab_video, function () {
    let img = fabricCanvas.backgroundImage;
    img.originX = "left";
    img.originY = "top";
    // img.scaleX = fabricCanvas.getWidth() / img.width;
    // img.scaleY = fabricCanvas.getHeight() / img.height;
    img.selectable = false;
    img.hasBorders = false;
    fab_video.getElement().play();

    fabricCanvas.renderAll();
    fabric.util.requestAnimFrame(function render() {
      fabricCanvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  });
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
