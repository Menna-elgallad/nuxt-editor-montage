<template lang="pug">
.containerr.mt-4
    .changecolor.flex.justify-content-between.align-items-center.menuitem 
        h4 Background color 
        input(type="color" v-model ="color" :style="{backgroundColor : color}")
    .upload.flex.justify-content-between.align-items-center.menuitem.mt-3 
        h4 Upload
        
    .backgrounds.row.mt-3.menuitem 
        h4.m-0 Background image 
        .col-lg-6.imgback.mt-3(v-for="(item , index) in 6")
            img(:src="`/_nuxt/assets/backgroundImgs/${item}.jpg`" @click="refimage(index)" ref="backimg")
        Button.mt-3.bg-pink-300.border-none(label="remove" @click="removeback()")        
</template>

<script setup lang="ts">
import { useColorsStore } from "~~/stores/background";
import { storeToRefs } from "pinia";
const colorstore = useColorsStore();
const color = ref("white");
const { changecolor, createImgElment, removeImgBack } = colorstore;
const backimg = ref([]);
function refimage(index: number) {
  console.log(backimg.value[index]);
  createImgElment(backimg.value[index]);
}
function removeback() {
  removeImgBack(Math.random());
}
watch(color, (curr, prev) => {
  changecolor(curr);
  console.log(curr);
});
</script>

<style scoped lang="scss">
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  width: 32px;
  height: 32px;
  border: 4px solid #eeeded;
  border-radius: 1.5rem;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
}
.imgback {
  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
}
</style>
