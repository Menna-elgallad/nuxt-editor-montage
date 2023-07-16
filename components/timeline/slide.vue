<template lang="pug">

.slide-cont
    .timeline-slide.relative(:class="{isActive : slide.isActive}")
      .curser.absolute 
      .slide-shape
    .slideLayer(v-for="layer in slide.layers") 
      .slide-item {{ layer?.width }}


</template>

<script setup lang="ts">
const props = defineProps({
  slide: {
    type: Object,
    required: true,
  },
});
useResize("slide-shape", true);
useResize("slide-item");
</script>

<style lang="scss" scoped>
.slide-cont {


  .curser{
    width: 1px;
    background-color : rgba(128, 128, 128, 0.5);
    height : 100%;
    right: 80%;
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
.slide-shape , .slide-item{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::after,
  &::before {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    cursor: ew-resize;
  }
  &::after {
    height: 100%;
  }
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
