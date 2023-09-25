<template lang="pug">

.slide-cont.relative
    .curser.absolute(v-if="timeLineStore.cursor.slideId === slide.id" :style="{'left' : timeLineStore.cursor.width + 'px'}")
    .timeline-slide(:class="{isActive : slide.isActive}")
      .slide-shape.relative
        .slideTime.absolute.flex.justify-content-center.align-items-center {{slide.width / 20}}s 
    .slideLayer(v-for="layer in slide.layers" :style="{'width' : layer.width + 'px'}" :id="'slide-shape-' + layer.id") 
      .slide-item {{ layer?.name }}


</template>

<script setup lang="ts">
import { TimeLineStore } from "~~/stores/timeline";
const props = defineProps({
  slide: {
    type: Object,
    required: true,
  },
});
const timeLineStore = TimeLineStore();
console.log(timeLineStore.cursor.slideId);
useResize("slide-shape", true);
useResize("slide-item");



onMounted(() => {
  let isDraggingCursor = false;
  let cursor = document.querySelector(".curser");
  let cursorOffsetX = 0;
  cursor.addEventListener("mousedown", function (e) {
    isDraggingCursor = true;
    cursorOffsetX = e.clientX - cursor.offsetLeft;
  });
  let holeWith = 0
  document.addEventListener("mousemove", function (e) {
    if (isDraggingCursor) {
      let newLeft = e.clientX - cursorOffsetX;
      holeWith = newLeft
      if (
        newLeft >= 0
      ) {
        timeLineStore.setUnActiveLayers();
        timeLineStore.cursor.width = newLeft;
        timeLineStore.changeActiveOnCursor(newLeft);
        // cursor.style.left = newLeft + "px";
      }
    }
  });
  
  document.addEventListener("mouseup", function () {
    isDraggingCursor = false;
    timeLineStore.setUnActiveLayers();
    timeLineStore.changeActiveOnCursor(holeWith);


  });
})
</script>

<style lang="scss" scoped>
.slide-cont {
  height: fit-content;
  .curser {
    width: 2px;
    background-color: rgba(128, 128, 128, 0.5);
    height: 100%;
    cursor: grab;
    z-index: 999;
  }

  display: flex;
  flex-direction: column;
  .slideLayer {
    margin-top: 5px;
    color: white;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 23px;
    background: #c6c7ef;
    width: 194px;
    height: 30px;
    flex-shrink: 0;
  }
}
.slide-shape,
.slide-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* cursor: move; */
  min-height: 35px;
  &::after {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    cursor: ew-resize;
  }
  &::before {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    /* cursor: ew-resize; */
  }
}
.slide-shape {
  min-height: 125px;
}
.slideTime {
  background-color: #c6c7ef;
  color: white;
  bottom: 5px;
  left: 7px;
  border-radius: 7px;
  width: 39px;
  height: 20px;
  text-align: center;
  font-size: 10px;
}
.timeline-slide {
  width: 200px;
  height: 131px;
  border-radius: 23px;
  border: 2px solid #c6c7ef;
  margin-right: 13px;
}
.isActive {
  border-color: #5156f6;
}
</style>
