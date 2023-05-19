import { fabric } from "fabric";

import lottie from "lottie-web";

export default function useLotte(){

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
      if (!options.width) options.width = 500;
      if (!options.height) options.height = 500;

      this.path = path;
      this.type = "lottie"
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
    setAnimationData: function(animationData) {
      this.lottieItem.destroy(); // Destroy the previous animation
      this.lottieItem = lottie.loadAnimation({
        renderer: "canvas",
        loop: true,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          context: this.tmpCanvasEl.getContext("2d"),
          preserveAspectRatio: "xMidYMid meet"
        }
      });
  
      this.lottieItem.addEventListener("enterFrame", e => {
        this.canvas?.requestRenderAll();
      });
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
  // fabric.Lottie.prototype.updateAnimationData = function(newData) {
  //   // this.lottieItem.stop();
  //   // this.lottieItem.destroy();
    
  //   // this.lottieItem = null;

  //   this.lottieItem = lottie.loadAnimation({
  //     renderer: "canvas",
  //     loop: true,
  //     // autoplay: false,
      
  //     // ...(this.path && { path: this.path }),
  //     ...(newData && { animationData: newData }),
  //     rendererSettings: {
  //       context: this.tmpCanvasEl.getContext("2d"),
  //       preserveAspectRatio: "xMidYMid meet"
  //     }
      
  //   });
    
  //   this.lottieItem.addEventListener("enterFrame", e => {
  //     this.canvas?.requestRenderAll();
  //   });
  //   // this.callSuper("initialize", this.tmpCanvasEl, this.options);
  
  // };
  // //@ts-ignore
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
 
  return fabric.Lottie 
}