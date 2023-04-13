<template lang="pug">
.container
    h1 lottie    
    .row
      .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima" @click="addjson(anima)" )
      .col-lg-6: lottie-player(autoplay loop style="width:200px" :src="anima2" @click="addjson(anima2)" )

</template>

<script setup lang="ts">
import anima from "../assets/json/emoji 2/Emoji_06.json";
import anima2 from "../assets/json/emoji 1/Emoji_05.json";
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import lottie from "lottie-web";
import { useLayer } from "~~/stores/layer";

const canvasStore = useCanvas();
const layerStore = useLayer();
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
    initialize: function (path, options) {
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
          preserveAspectRatio: "xMidYMid meet",
        },
      });

      // this.lottieItem.addEventListener('DOMLoaded', () => {
      //   console.log('DOMLoaded')
      // })

      this.lottieItem.addEventListener("enterFrame", (e) => {
        this.canvas?.requestRenderAll();
      });

      this.callSuper("initialize", this.tmpCanvasEl, options);
    },

    play: function () {
      this.lottieItem.play();
    },
    stop: function () {
      this.lottieItem.stop();
    },
    getSrc: function () {
      return this.path;
    },
  });
  //@ts-ignore
  fabric.Lottie.fromObject = function (_object, callback) {
    const object = fabric.util.object.clone(_object);
    fabric.Image.prototype._initFilters.call(
      object,
      object.filters,
      function (filters) {
        object.filters = filters || [];
        fabric.Image.prototype._initFilters.call(
          object,
          [object.resizeFilter],
          function (resizeFilters) {
            object.resizeFilter = resizeFilters[0];
            fabric.util.enlivenObjects(
              [object.clipPath],
              function (enlivedProps) {
                object.clipPath = enlivedProps[0];
                const fabricLottie = new fabric.Lottie(object.src, object);
                callback(fabricLottie, false);
              }
            );
          }
        );
      }
    );
  };
});

function addjson(animation) {
  const fabricImage = new fabric.Lottie(undefined, {
    scaleX: 0.4,
    scaleY: 0.4,
    animationData: animation,
  });

  fabricImage.play();
  fabricCanvas.add(fabricImage);
  fabricCanvas.renderAll();
  layerStore.$patch({
    layers: [
      ...layerStore.layers,
      {
        element: animation,
        hidden: false,
        name: "charcter",
        opacity: 1,
        type: "charcter",
        locked: false,
        timeToHide: 0,
        timeToShow: 0,
      },
    ],
  });
}
</script>

<style lang="scss" scoped></style>
