<template lang="pug">
.containerr.mt-4
    .changecolor.flex.justify-content-between.align-items-center.menuitem 
        h4 Background color 
        input(type="color" v-model ="color" :style="{backgroundColor : color}")
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
    .uploading
      .upload.flex.justify-content-between.align-items-center.menuitem.mt-3 
          h5 Video
          .file-upload 
              input(type="file" id="file2" @change="onfilechangeVid" accept="video/*" )
              label(for="file2" class="file").flex.gap-1.align-items-center
                span Select
                Icon(name="octicon:cloud-upload") 
      .row        
        .col-lg-6.mt-3(v-for="(src , index) in srcsVid" :key="index" class="relative" )
          video( @click="uploadedbackvid(index)" )
              source(:src="src" type="video/mp4"  )
          Icon(name="gridicons:cross-small" class="bg-red-300 border-circle absolute  " style="right : 15px ; top:5px ;cursor:pointer" @click="removeUplodedVid(index)")        
    .backgrounds.row.mt-3.menuitem 
        h4.m-0 Background image 
        .col-lg-6.imgback.mt-3(v-for="(item , index) in 6")
            img(:src="`/_nuxt/assets/backgroundImgs/${item}.jpg`" @click="refimage(index)" ref="backimg")
        Button.mt-3.bg-pink-300.border-none(label="remove" @click="removeback()" )        
</template>

<script setup lang="ts">
import { useColorsStore } from "~~/stores/background";
import { storeToRefs } from "pinia";

const colorstore = useColorsStore();
const color = ref("white");
const { changecolor, createImgElment, removeImgBack, createVidElment } =
  colorstore;
const backimg = ref([]);
const imguploaded = ref();
const VideoUploaded = ref();
const srcs = ref([]);
const srcsVid = ref([]);

function onfilechange(event: any) {
  console.log("img", event.target.files[0]);
  imguploaded.value = event.target.files[0];
}
function onfilechangeVid(event: any) {
  console.log("vid", event.target.files[0]);
  VideoUploaded.value = event.target.files[0];
}
watch(imguploaded, (curr, prev) => {
  srcs.value.push(URL.createObjectURL(curr));
  console.log("srcs.val", srcs.value);
});
watch(VideoUploaded, (curr, prev) => {
  srcsVid.value.push(URL.createObjectURL(curr));
});
function removeUploded(index) {
  console.log("srcs", srcs.value, index);
  srcs.value.splice(index, 1);
  console.log("srcs", srcs.value, index);
}
function removeUplodedVid(indx) {
  console.log("srcsvid", srcsVid.value, indx);
  console.log(srcsVid.value.splice(indx, 1));
  console.log("srcsafter", srcsVid.value, indx);
}
function refimage(index: number) {
  console.log(typeof backimg.value[index]);
  createImgElment(backimg.value[index]);
}
function uploadedbackAdd(index: number) {
  createImgElment(srcs.value[index]);
}
function uploadedbackvid(index) {
  console.log(">>>>>>>>");
  createVidElment(srcsVid.value[index]);
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
