<template lang="pug">
.mcontainer.surface-200.py-5.px-3
    .slides.py-1
        .mt-3(v-for="(element, index) in slideStore.canvasSlides" :key="index" :class="{ 'array-item': true, 'show': element.fabric.id === slideStore.currentCanvas.id }") 
          .flex.gap-2
              h4.text-blue-900.text-sm 0{{index+1}}
              img.slide(:src="canvasToImage(element.fabric)" v-if="hasCanvas")
              //- .sil(v-html="fabricImage" v-if="hasCanvas")
              .slide(v-else)
          .flex.justify-content-center.mt-3    
            Icon.hovericon.text-3xl.text-700.ml-2(name="fluent:slide-multiple-arrow-right-24-regular"  v-if="index<slideStore.canvasSlides.length-1 ")

    .addslide.flex.justify-content-center.align-items-center.mt-3.flex-column(@click="addnewslide()" )
        Icon(name="jam:plus-rectangle" class="text-4xl text-blue-900 add" )
        h4.text-blue-900.mt-2.text-sm Blank slide
    //- .close( class="flex "): span(@click="close()" style="pointer:cursor")
    //-     Icon.text-2xl.text-blue-700(name="ion:chevron-forward")      
         
</template>

<script lang="ts" setup>
import { useSlide } from "~~/stores/slide";
import { fabric } from "fabric";
const fabricImage = ref();
const hasCanvas = ref(false);
const slideStore = useSlide();
let canvas: fabric.Canvas;
onMounted(() => {
  canvas = document.getElementById("mycanvas").fabric;
  const newCanvas = Object.assign(
    Object.create(fabric.Canvas.prototype),
    canvas
  );
  hasCanvas.value = true;
  console.log(newCanvas.toSVG());
  // newCanvas.width = 200;
  // newCanvas.height = 100;

  fabricImage.value = canvasToImage(canvas);
  console.log(fabricImage.value);

  console.log(fabricImage.value);
});
const nextIndex = ref(0);
const state = reactive({
  array: [{ index: nextIndex.value, show: true }]
});

function canvasToImage(canvas: fabric.Canvas) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(canvas.toSVG())}`;
}

async function addnewslide() {
  // create a new element object with a show property
  const newCanv = new fabric.Canvas("mycanvas", {
    id: Date.now(),
    height: 1080 / 2.8,
    width: 1920 / 2.8,
    backgroundColor: "white",
    // shadow:1,
    //@ts-ignore
    backgroundColorAlpha: 0,
    borderColor: "black",
    strokeWidth: 5,
    hasControls: true
  });
  slideStore.canvasSlides.push({
    fabric: newCanv,
    slideNumber: slideStore.canvasSlides.length
  });
  nextIndex.value++;
  const newElement = { index: nextIndex.value, show: false };

  state.array.push(newElement);
  console.log(state.array);

  newElement.show = true;

  console.log(state.array);
}
watch(slideStore, () => {
  hasCanvas.value = false;
  setTimeout(() => {
    hasCanvas.value = true;
  }, 50);
});
</script>

<style scoped lang="scss">
.mcontainer {
  margin-top: -50px;
  height: 98vh;
  overflow-y: scroll;
  width: 20%;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fffffff7;
  }
}
.slides {
  border-bottom: 2px solid #cccccc61;

  .slide {
    background-color: white;
    border-radius: 0.5rem;
    height: calc(1080px / 11);
    width: calc(1920px / 11);
    box-shadow: 0px 8px 5px -4px #e3e3e3;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      background-color: #ffffff27;
    }
  }
}
.addslide {
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    .add {
      color: #777 !important;
      transform: scale(1.05);
    }
    h4 {
      color: #777 !important;
    }
  }
  h4 {
    transition: all 0.5s ease;
  }
  .add {
    transition: all 0.5s ease;
  }
}
.array-item {
  opacity: 1;
  transition: opacity 5s ease-in-out;
}
@keyframes animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}
.show {
  animation: animate 0.2s ease-in forwards;
}
.close {
  position: absolute;
}
</style>
