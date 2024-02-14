import { fabric } from "fabric";
import { storeToRefs } from "pinia";
import { TimeLineStore } from "~~/stores/timeline";
export class AnimationManagerIn {
  timelineStore = TimeLineStore();
  activatedSlide = this.timelineStore.activeSlide.id;
  fabricCanvas: fabric.Canvas = document.getElementById(
    `mycanvas-${this.activatedSlide}`
  )?.fabric;

  constructor(animation) {
    this.animation = animation;
  }

  pop() {
    const initialData = { ...this.animation };
    this.animation.set({
      scaleX: 0,
      scaleY: 0,
    });

    this.animation.animate(
      { scaleX: initialData.scaleX, scaleY: initialData.scaleY },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutBounce,
      }
    );
  }
  fade() {
    this.animation.set("opacity", 0);
    this.animation.animate(
      { opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  swear() {
    this.animation.set("angle", 45);
    this.animation.set("top", 100);
    this.animation.set("opacity", 0);
    this.animation.animate(
      { top: 0, angle: 0, opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideRight() {
    const initialData = { ...this.animation };
    this.animation.set(
      "left",
      this.fabricCanvas.width + this.animation.width * this.animation.scaleX
    );
    this.animation.animate(
      { left: initialData.left },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideLeft() {
    const initialData = { ...this.animation };
    this.animation.set("left", -this.animation.lineCoords.tr.x);
    this.animation.animate(
      { left: initialData.left },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideTop() {
    const initialData = { ...this.animation };
    this.animation.set(
      "top",
      this.fabricCanvas.height + this.animation.height * this.animation.scaleY
    );
    this.animation.animate(
      { top: initialData.top },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideBottom() {
    const initialData = { ...this.animation };

    this.animation.set(
      "top",
      this.fabricCanvas.height - this.animation.lineCoords.br.y
    );
    this.animation.animate(
      { top: initialData.top },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }

  revealTop() {
    const initialData = { ...this.animation };
    this.animation.set("top", this.animation.top + 35);
    this.animation.set("opacity", 0);
    this.animation.animate(
      { top: initialData.top, opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeInCubic,
      }
    );
  }

  revealBottom() {
    const initialData = { ...this.animation };

    this.animation.set("top", this.animation.top - 35);
    this.animation.set("opacity", 0);
    this.animation.animate(
      { top: initialData.top, opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeInCubic,
      }
    );
  }

  revealRight() {
    const initialData = { ...this.animation };

    this.animation.set("left", this.animation.left + 35);
    this.animation.set("opacity", 0);
    this.animation.animate(
      { left: initialData.left, opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeInCubic,
      }
    );
  }

  revealLeft() {
    const initialData = { ...this.animation };

    this.animation.set("left", this.animation.left - 35);
    this.animation.set("opacity", 0);
    this.animation.animate(
      { left: initialData.left, opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeInCubic,
      }
    );
  }
  playAnimation(animationName) {
    if (typeof this[animationName] === "function") {
      this[animationName]();
    } else {
      console.log(`Invalid animation name: ${animationName}`);
    }
  }
}

export class AnimationManagerOut {
  timelineStore = TimeLineStore();
  activatedSlide = this.timelineStore.activeSlide.id;
  fabricCanvas: fabric.Canvas = document.getElementById(
    `mycanvas-${this.activatedSlide}`
  )?.fabric;

  constructor(animation) {
    this.animation = animation;
  }

  initialObject = {};
  fade() {
    this.initialObject = {
      opacity: 1,
      duration: 1000,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    this.animation.animate(
      { opacity: 0 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }

  pop() {
    this.initialObject = {
      opacity: 1,
      duration: 1000,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };

    this.animation.animate(
      { scaleX: 0, scaleY: 0 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeInBack,
      }
    );
  }

  swear() {
    this.animation.set("angle", 45);
    this.animation.set("top", 100);
    this.animation.set("opacity", 0);
    this.animation.animate(
      { top: 0, angle: 0, opacity: 1 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideRight() {
    this.initialObject = {
      opacity: 1,
      duration: 1000,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    this.animation.animate(
      { left: -(this.animation.width * this.animation.scaleX) },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideLeft() {
    this.initialObject = {
      opacity: 1,
      duration: 1000,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };

    this.animation.animate(
      { left: this.fabricCanvas.width + 50 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideTop() {
    this.initialObject = {
      opacity: 1,
      duration: 1000,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    this.animation.animate(
      { top: this.fabricCanvas.height + 50 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  slideBottom() {
    this.initialObject = {
      opacity: 1,
      duration: 1000,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    this.animation.animate(
      { top: -(this.animation.height * this.animation.scaleY) - 50 },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutQuart,
      }
    );
  }

  revealTop() {
    this.initialObject = {
      opacity: 1,
      duration: 500,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };

    this.animation.animate(
      { opacity: 0, top: "+=35" },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }

  revealBottom() {
    this.initialObject = {
      opacity: 1,
      duration: 500,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    console.log(this.initialObject, "initial");
    this.animation.animate(
      { opacity: 0, top: "-=35" },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }

  revealLeft() {
    this.initialObject = {
      opacity: 1,
      duration: 500,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    console.log(this.initialObject, "initial");
    this.animation.animate(
      { opacity: 0, left: "+=35" },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }

  revealRight() {
    this.initialObject = {
      opacity: 1,
      duration: 500,
      top: this.animation.top,
      left: this.animation.left,
      scaleX: this.animation.scaleX,
      scaleY: this.animation.scaleY,
    };
    console.log(this.initialObject, "initial");
    this.animation.animate(
      { opacity: 0, left: "-=35" },
      {
        onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
        duration: 500,
        easing: fabric.util.ease.easeOutCubic,
      }
    );
  }
  playAnimation(animationName) {
    console.log("play");
    if (typeof this[animationName] === "function") {
      this[animationName]();
      return this.initialObject;
    } else {
      console.log(`Invalid animation name: ${animationName}`);
    }
  }
}
