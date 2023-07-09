<template lang="pug">

.slide-cont
    .timeline-slide(:class="{isActive : slide.isActive}")
    .slideLayer(v-for="layer in slide.layers") {{ layer.name }}


</template>

<script setup lang="ts">
const props = defineProps({
  slide: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.slide-cont {
  display: flex;
  flex-direction: column;
  .slideLayer {
    margin-top: 5px;
    color : white;
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
