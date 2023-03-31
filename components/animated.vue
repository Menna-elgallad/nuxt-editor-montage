<template lang="pug">
.container
    h1 lottie    
    lottie-player(autoplay loop style="width:200px" src="https://assets7.lottiefiles.com/packages/lf20_1mA0i9a3PH.json" speed="1" @click="addjson()" )

</template>

<script setup lang="ts">
import anima from "../assets/json/emoji 2/Emoji_06.json";
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import lottie from "lottie-web";

const canvasStore = useCanvas();
const {canasWrapper, color } = storeToRefs(canvasStore);

let fabricCanvas: fabric.Canvas;
let canvaswrapper: any;

onMounted(() => {

  fabricCanvas = document.getElementById('mycanvas').fabric;
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

    initialize: function(path, options) {
      if (!options.width) options.width = 300;
      if (!options.height) options.height = 300;

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
          preserveAspectRatio: "xMidYMid meet",
          willReadFrequently: true
        }
      });

      // this.lottieItem.addEventListener('DOMLoaded', () => {
      //   console.log('DOMLoaded')
      // })

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

  const fabricImage = new fabric.Lottie(undefined, {
    // scaleX: 0.5,
    animationData: anima
  });

  fabricImage.play();
  fabricCanvas.add(fabricImage);
  fabricCanvas.renderAll();
});

function addjson() {
  console.log("json json hehe");
}
</script>

<style lang="scss" scoped></style>
