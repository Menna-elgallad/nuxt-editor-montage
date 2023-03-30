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
        .col-lg-6.mt-3(v-for="(src , index) in srcsVid" :key="index" class="relative" v-if="isVideo" )
          video( @click="uploadedbackvid(index)" ref="vidoeEle" class="video")
              source(:src="src" type="video/mp4" controls )
          Icon(name="gridicons:cross-small" class="bg-red-300 border-circle absolute  " style="right : 15px ; top:5px ;cursor:pointer" @click="removeUplodedVid(index)")        
    .backgrounds.row.mt-3.menuitem 
        h4.m-0 Background image 
        .col-lg-6.imgback.mt-3(v-for="(item , index) in 6")
            img(:src="`/backgroundImgs/${item}.jpg`" @click="refimage(index)" ref="backimg")
        Button.mt-3.bg-pink-300.border-none(label="remove" @click="removeback()" )        
</template>

<script setup lang="ts">
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import { useLocalStorageStore } from "~~/stores/assets";

const vidoeEle = ref([]);
const assetsStore = useLocalStorageStore();
const { getsrcsImages, getsrcsVideos, setsrcsImages, setsrcsVideos } =
  assetsStore;
const canvasStore = useCanvas();
const isVideo = ref(true);
const { mycanvas, canasWrapper, color } = storeToRefs(canvasStore);

const backimg = ref([]);
const imguploaded = ref();
const VideoUploaded = ref();
const srcs = ref<string[]>([]);
const srcsVid = ref<string[]>([]);
const imgInstance = ref();
let fabricCanvas: fabric.canvas;
let canvaswrapper: any;
onMounted(() => {
  fabricCanvas = mycanvas.value;
  canvaswrapper = canasWrapper.value;
  console.log("ff", fabricCanvas);
  console.log("cc", canvaswrapper);
});

if (srcsVid.value.length === 0) {
  srcsVid.value = getsrcsVideos;
}
if (srcs.value.length === 0) {
  srcs.value = getsrcsImages;
}
function onfilechange(event: any) {
  imguploaded.value = event.target.files[0];
}
function onfilechangeVid(event: any) {
  VideoUploaded.value = event.target.files[0];
}
watch(imguploaded, (curr, prev) => {
  srcs.value.push(URL.createObjectURL(curr));
  setsrcsImages(srcs.value);
});
watch(VideoUploaded, (curr, prev) => {
  srcsVid.value.push(URL.createObjectURL(curr));
  setsrcsVideos(srcsVid.value);
});
function removeUploded(index: number) {
  srcs.value.splice(index, 1);
}
function removeUplodedVid(indx: number) {
  isVideo.value = false;
  srcsVid.value.splice(indx, 1);
  setTimeout(() => {
    isVideo.value = true;
  }, 10);
}
function refimage(index: number) {
  const curr = backimg.value[index];
  imgInstance.value = new fabric.Image(curr, {});
  addBackground(imgInstance.value);
}
function uploadedbackAdd(index: number) {
  const curr = srcs.value[index];
  imgInstance.value = curr;
  addBackground(imgInstance.value);
}
function addBackground(img: any) {
  fabricCanvas.backgroundImage = img;
  fabricCanvas.setBackgroundImage(img, function () {
    let img = fabricCanvas.backgroundImage;
    (img.left = fabricCanvas.width / 2),
      (img.top = fabricCanvas.height / 2),
      (img.originX = "center"),
      (img.originY = "center");
    // img.flipX = "true";
    var widthScaleFactor = fabricCanvas.width / img.width;
    var heightScaleFactor = fabricCanvas.height / img.height;
    var scaleFactor = Math.max(widthScaleFactor, heightScaleFactor);

    // Scale fabric image to fit canvas
    img.scale(scaleFactor);

    // Center fabric image in canvas
    img.set({
      left: fabricCanvas.width / 2,
      top: fabricCanvas.height / 2,
    });
    fabricCanvas.renderAll();
  });
}
function uploadedbackvid(index: number) {
  removeback();
  var video1El = document.querySelectorAll(".video");
  const myvid = video1El[index];
  const clone: any = myvid.cloneNode(true);
  clone.style.zIndex = "-1";
  clone.style.position = "absolute";
  clone.style.top = "0";
  fabricCanvas.backgroundColor = "rgba(0,0,0,0)";
  clone.play();
  canvaswrapper.appendChild(clone);

  fabricCanvas.renderAll();
}
function removeback() {
  fabricCanvas.setBackgroundImage(
    null,
    fabricCanvas.renderAll.bind(fabricCanvas)
  );
  const videoElement: any = canvaswrapper.querySelector("video");

  // Check if the video element exists
  if (videoElement) {
    // Remove the video element
    videoElement.parentNode.removeChild(videoElement);
  }
}
watch(color, (curr, prev) => {
  fabricCanvas.backgroundColor = curr;
  canvasStore.$patch({ color: curr });
  fabricCanvas.renderAll();
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
