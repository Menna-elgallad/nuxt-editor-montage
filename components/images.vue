<template lang="pug">
.containerr.mt-4
    .uploading
        .upload.flex.justify-content-between.align-items-center.menuitem.mt-3 
            h5 Image
            .file-upload 
                input(type="file" id="file" @change="onfilechange"  accept="image/*"  )
                label(for="file" class="file").flex.gap-1.align-items-center
                    span Select
                    Icon(name="octicon:cloud-upload") 
        .row.mt-3        
            .col-lg-6.mt-3(v-for="(src , indx) in srcs" :key="indx" class="relative")
                img(  :src="src" class="src" @click="uploadedbackAdd(indx)")   
                Icon(name="gridicons:cross-small" class="bg-red-300 border-circle absolute  " style="right : 15px ; top:5px ;cursor:pointer" @click="removeUploded(indx)")            
</template>

<script setup lang="ts">
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import { useLocalStorageStore } from "~~/stores/assets";
let fabricCanvas: any;
let canvaswrapper: any;
const backimg = ref([]);

const imgInstance = ref();
onMounted(() => {
  //@ts-ignore
  const mycanvas = document.getElementById("mycanvas").fabric;;

  fabricCanvas = mycanvas;

  //   canvaswrapper = canasWrapper.value;
});
const imguploaded = ref();
const srcs = ref<string[]>([]);
function onfilechange(event: any) {
  imguploaded.value = event.target.files[0];
  console.log(" imguploaded.value ", imguploaded.value);
}
watch(imguploaded, (curr, prev) => {
  srcs.value.push(URL.createObjectURL(curr));
  console.log("srcs", srcs.value);

  //   setsrcsImages(srcs.value);
});

function uploadedbackAdd(index: number) {
  const curr = srcs.value[index];
  imgInstance.value = curr;
  addBackground(imgInstance.value);
}
function addBackground(img: any) {
  console.log("img", img);
  fabric.Image.fromURL(img, function (myImage) {
    // Add image to canvas
    myImage.scaleX = 0.5;
    myImage.scaleY= 0.5;
    fabricCanvas.add(myImage);
  });

  fabricCanvas.renderAll();
}
function removeUploded(index: number) {
  srcs.value.splice(index, 1);
}
</script>

<style lang="scss" scoped>
input[type="color"] {
  appearance: none;
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

img,
video {
  width: 100%;
  object-fit: cover;
  height: 100%;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    filter: blur(3px);
    opacity: 50%;
    filter: saturate(2.2);
  }
}

.file-upload {
  position: relative;
  input {
    position: absolute;
    right: 0;
    top: -9px;
    opacity: 0;
    cursor: pointer;
  }
  label {
    position: absolute;
    right: 0;

    top: -7px;
    font-size: 13px;

    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: all 0.5s ease;
    &:hover {
      border-bottom: 1px solid #ccccccd8;
      color: #ccccccd8;
    }
  }
}
</style>
