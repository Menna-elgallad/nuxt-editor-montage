import { fabric } from "fabric";
import { storeToRefs } from "pinia";
import { TimeLineStore } from "~~/stores/timeline";
const timelineStore = TimeLineStore();
const timeLineStore = TimeLineStore();
const activatedSlide = timeLineStore.activeSlide.id;
export class AnimationManagerIn {
    
  fabricCanvas:fabric.Canvas  = document.getElementById(`mycanvas-${activatedSlide}`)?.fabric;
   
    constructor(animation) {
      this.animation = animation
    }
  
  
    pop() {
  
    
    this.animation.set({
    scaleX: 0,
    scaleY: 0,
  
  });
      this.animation.animate({   'scaleX': 0.3,
    'scaleY': 0.3    },{
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutBounce,
      
  });
  
    }
    fade() {
       this.animation.set('opacity', 0);
      this.animation.animate({ 'opacity': 1  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    swear() {
       this.animation.set('angle', 45);
       this.animation.set('top', 100);
       this.animation.set('opacity', 0);
      this.animation.animate({ 'top': 0 , 'angle' : 0  , 'opacity' : 1 } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideRight() {
       this.animation.set('left', (this.fabricCanvas.width -  this.animation.lineCoords.tr.x));
      this.animation.animate({ 'left': 0  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideLeft() {
  
       this.animation.set('left', - (this.animation.lineCoords.tr.x));
      this.animation.animate({ 'left': 0  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideTop() {
       this.animation.set('top', -(this.animation.lineCoords.br.y));
      this.animation.animate({ 'top': 0  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideBottom() {
      this.animation.set('top', this.fabricCanvas.height -  this.animation.lineCoords.br.y)
   
      this.animation.animate({ 'top': 0  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
  
    revealTop() {
       this.animation.set('top', - (this.animation.lineCoords.tr.y) - 35);
       this.animation.set('opacity', 0);
      this.animation.animate({ 'top': 0 , 'opacity' : 1   } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeInCubic
  });
    }
  
    revealBottom() {
       this.animation.set('top', (this.animation.lineCoords.tr.y) + 35);
       this.animation.set('opacity', 0);
      this.animation.animate({ 'top': 0 , 'opacity' : 1   } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeInCubic
  });
    }
  
    revealLeft() {
       this.animation.set('left', -(this.animation.lineCoords.tl.x) - 35);
       this.animation.set('opacity', 0);
      this.animation.animate({ 'left': 0 , 'opacity' : 1   } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeInCubic
  });
    }
  
    revealRight() {
       this.animation.set('left',  (this.animation.lineCoords.tl.x) + 35);
       this.animation.set('opacity', 0);
      this.animation.animate({ 'left': 0 , 'opacity' : 1   } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeInCubic
  });
    }
    playAnimation(animationName) {
      if (typeof this[animationName] === 'function') {
        this[animationName]();
      } else {
        console.log(`Invalid animation name: ${animationName}`);
      }
    }
  
    
  }
  


  export class AnimationManagerOut {
  fabricCanvas:fabric.Canvas  = document.getElementById(`mycanvas-${activatedSlide}`)?.fabric;
    
  initialObject = { }
    constructor(animation) {
      this.animation = animation
    }
    fade() {
      this.initialObject = {...this.animation , opacity : 1 , duration : 1000}
      this.animation.animate({ 'opacity': 0  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic,
  });
  

    }
  
   
    pop() {
      this.initialObject = {...this.animation , opacity : 1 , duration : 1000 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
  
      this.animation.animate({   'scaleX': 0,    
    'scaleY': 0    },{
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeInBack,

  });
  
    }

    swear() {
       this.animation.set('angle', 45);
       this.animation.set('top', 100);
       this.animation.set('opacity', 0);
      this.animation.animate({ 'top': 0 , 'angle' : 0  , 'opacity' : 1 } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideRight() {
      this.initialObject = {...this.animation , opacity : 1 , duration : 1000 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
      this.animation.animate({'left': -(this.animation.width*this.animation.scaleX)   } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideLeft() {
  
      this.initialObject = {...this.animation , opacity : 1 , duration : 1000 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}

      this.animation.animate({ 'left': this.fabricCanvas.width +50  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideTop() {
      this.initialObject = {...this.animation , opacity : 1 , duration : 1000 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
      this.animation.animate({ 'top': ( this.fabricCanvas.height + 50)  }  , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutCubic
  });
    }
    slideBottom() {
      this.initialObject = {...this.animation , opacity : 1 , duration : 1000 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
      this.animation.animate({ 'top': -(this.animation.height*this.animation.scaleY )-50   } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 1000,
      easing: fabric.util.ease.easeOutQuart
  });
    }
  
    revealTop()  {
      this.initialObject = {...this.animation , opacity : 1 , duration : 500 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
  
      this.animation.animate({ 'opacity': 0 , 'top' : '+=35'  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeOutCubic,
  });
  

    }
  
    revealBottom()  {
      this.initialObject = {...this.animation , opacity : 1 , duration : 500 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
      console.log(this.initialObject , 'initial')
      this.animation.animate({ 'opacity': 0 , 'top' : '-=35'  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeOutCubic,
  });
  

    }
  
    revealLeft()  {
      this.initialObject = {...this.animation , opacity : 1 , duration : 500 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
      console.log(this.initialObject , 'initial')
      this.animation.animate({ 'opacity': 0 , 'left' : '+=35'  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeOutCubic,
  });
  

    }
  
    revealRight()  {
      this.initialObject = {...this.animation , opacity : 1 , duration : 500 , top : this.animation.lineCoords.tl.y , left : this.animation.lineCoords.tl.x}
      console.log(this.initialObject , 'initial')
      this.animation.animate({ 'opacity': 0 , 'left' : '-=35'  } , {
      onChange: this.fabricCanvas.renderAll.bind(this.fabricCanvas),
      duration: 500,
      easing: fabric.util.ease.easeOutCubic,
  });
  

    }
    playAnimation(animationName) {
      console.log("play")
      if (typeof this[animationName] === 'function') {
        this[animationName]();
        return this.initialObject
      } else {
        console.log(`Invalid animation name: ${animationName}`);
      }
    }
  
    
  }
  