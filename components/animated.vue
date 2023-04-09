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

const canvasStore = useCanvas();
const { canasWrapper, color } = storeToRefs(canvasStore);

let fabricCanvas: fabric.Canvas;
let canvaswrapper: any;

onMounted(() => {
  fabricCanvas = document.getElementById("mycanvas").fabric;
  canvaswrapper = canasWrapper.value;

  //@ts-ignore
  fabric.Lottie = fabric.util.createClass(fabric.Image, {
    type: "lottie",
    lockRotation: false,
    lockSkewingX: false,
    lockSkewingY: false,
    hasRotatingPoint: true,
    hasSkewControl: true,
    srcFromAttribute: false,
    enableRetinaScaling: true,
    initialize: function(path, options) {
      if (!options.width) options.width = 1000;
      if (!options.height) options.height = 1000;

      this.path = path;
      this.tmpCanvasEl = fabric.util.createCanvasElement();
      this.tmpCanvasEl.width = options.width;
      this.tmpCanvasEl.height = options.height;

      this.lottieItem = lottie.loadAnimation({
        renderer: "canvas",
        loop: true,
        autoplay: false,
        ...(path && { path }),
        ...(options.animationData && { animationData: options.animationData }),
        rendererSettings: {
          context: this.tmpCanvasEl.getContext("2d"),
          preserveAspectRatio: "xMidYMid meet"
        }
      });

      this.lottieItem.addEventListener("enterFrame", e => {
        this.canvas?.requestRenderAll();
      });

      this.callSuper("initialize", this.tmpCanvasEl, options);
    },

    play: function() {
      this.lottieItem.play();
    },
    stop: function() {
      this.lottieItem.stop();
    },
    getSrc: function() {
      return this.path;
    }
  });
  fabric.Lottie.prototype.updateAnimationData = function(newData) {
    this.lottieItem.stop();
    this.lottieItem.destroy();
    this.lottieItem = null;

    this.lottieItem = lottie.loadAnimation({
      renderer: "canvas",
      loop: true,
      autoplay: false,
      ...(this.path && { path: this.path }),
      ...(newData && { animationData: newData }),
      rendererSettings: {
        context: this.tmpCanvasEl.getContext("2d"),
        preserveAspectRatio: "xMidYMid meet"
      }
    });

    this.lottieItem.addEventListener("enterFrame", e => {
      this.canvas?.requestRenderAll();
    });

    this.canvas?.requestRenderAll();
  };
  //@ts-ignore
  fabric.Lottie.fromObject = function(_object, callback) {
    const object = fabric.util.object.clone(_object);
    fabric.Image.prototype._initFilters.call(object, object.filters, function(
      filters
    ) {
      object.filters = filters || [];
      fabric.Image.prototype._initFilters.call(
        object,
        [object.resizeFilter],
        function(resizeFilters) {
          object.resizeFilter = resizeFilters[0];
          fabric.util.enlivenObjects([object.clipPath], function(enlivedProps) {
            object.clipPath = enlivedProps[0];
            const fabricLottie = new fabric.Lottie(object.src, object);
            callback(fabricLottie, false);
          });
        }
      );
    });
  };
});

function addjson(animation) {
  const fabricImage = new fabric.Lottie(undefined, {
    scaleX: 0.4,
    scaleY: 0.4,
    animationData: animation
  });

  // console.log("color", fabricImage.animationData.layers[9].shapes[0].it[1].c.k);
  console.log("first", fabricImage);

  fabricCanvas.add(fabricImage);
  fabricImage.on("mousedown", () => {
    const animationData = fabricImage.animationData;
    let idx;
    for (let i = 0; i < animationData.layers.length; i++) {
      if (animationData.layers[i].cl === "yellow") {
        idx = i;
      }
    }

    // Change the color of a shape in the animation data object
    animationData.layers[idx].shapes[0].it[1].c.k = [
      Math.random() * (1 - 0) + 0,
      Math.random() * (1 - 0) + 0,
      Math.random() * (1 - 0) + 0,
      Math.random() * (1 - 0) + 0
    ]; // Set fill color to red
    fabricImage.updateAnimationData(animationData);
    // Update the animation data of the Lottie animation object
    fabricImage.set("animationData", animationData);
    console.log("sec", fabricImage);

    fabricCanvas.renderAll();
    fabricImage.play();
  });
  fabricCanvas.renderAll();
  fabricImage.play();
}
</script>

<style lang="scss">
.green {
  path {
    stroke: palevioletred;
  }
}
.yellow {
  path {
    fill: palevioletred !important;
  }
}
.body {
  path {
    fill: blue;
  }
}
</style>
