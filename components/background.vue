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
          video( @click="uploadedbackvid(index)" ref="vidoeEle" class="video")
              source(:src="src" type="video/mp4"  )
          Icon(name="gridicons:cross-small" class="bg-red-300 border-circle absolute  " style="right : 15px ; top:5px ;cursor:pointer" @click="removeUplodedVid(index)")        
    .backgrounds.row.mt-3.menuitem 
        h4.m-0 Background image 
        .col-lg-6.imgback.mt-3(v-for="(item , index) in 6")
            img(:src="`/backgroundImgs/${item}.jpg`" @click="refimage(index)" ref="backimg")
        Button.mt-3.bg-pink-300.border-none(label="remove" @click="removeback()" )        
</template>

<script setup lang="ts">
import { useColorsStore } from "~~/stores/background";
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
const vidoeEle = ref([]);
const colorstore = useColorsStore();
const canvasStore = useCanvas();
const { mycanvas } = storeToRefs(canvasStore);
const color = ref("white");
const { changecolor, createImgElment, removeImgBack, createVidElment } =
  colorstore;
const backimg = ref([]);
const imguploaded = ref();
const VideoUploaded = ref();
const srcs = ref<string[]>([]);
const srcsVid = ref<string[]>([]);
const imgInstance = ref();
let fabricCanvas: fabric.canvas;
onMounted(() => {
  fabricCanvas = mycanvas.value;
});
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
  // console.log("srcs.val", srcsVid.value);
});
function removeUploded(index: number) {
  srcs.value.splice(index, 1);
}
function removeUplodedVid(indx: number) {
  console.log("srcsvid", srcsVid.value, indx);
  console.log(srcsVid.value.splice(indx, 1));
  console.log("srcsafter", srcsVid.value, indx);
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
function addBackground(img :any) {
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
  var video1El = document.querySelectorAll(".video");

  console.log(">>>>>>>>");
  // function getVideoElement(url: any) {
  //   var videoE = document.createElement("video");
  //   videoE.width = fabricCanvas.getWidth();
  //   videoE.height = fabricCanvas.getHeight();
  //   videoE.muted = true;
  //   videoE.crossOrigin = "anonymous";
  //   var source = document.createElement("source");
  //   source.src = url;
  //   source.type = "video/mp4";
  //   videoE.appendChild(source);
  //   return videoE;
  // }

  // var url_mp4 = srcsVid.value[index];

  var videoE = video1El[index];
  console.log("viddd", videoE);
  // console.log("myvidddd", getVideoElement(url_mp4));

  var fabricVideo = new fabric.Image(videoE, {
    left: 0,
    top: 0,
    angle: 0,
    scaleX: fabricCanvas.width ,
    scaleY: fabricCanvas.height ,
  });
  fabricCanvas.add(fabricVideo);
  fabricCanvas.renderAll();

  // fabricCanvas.add(videoE);
  // video1.getElement().play();
  // console.log(videoE);
  // fabric.util.requestAnimFrame(function render() {
  //   fabricCanvas.renderAll();
  //   fabric.util.requestAnimFrame(render);
  // });
  // fabricCanvas.renderAll();
  // fabricCanvas.add(fab_video);

  // fabricCanvas.sendToBack(fab_video);
  // fabricCanvas.backgroundImage = fab_video;
  // fabricCanvas.setBackgroundImage(fab_video, function () {
  //   let img = fabricCanvas.backgroundImage;
  //   img.originX = "left";
  //   img.originY = "top";
  //   (img.left = fabricCanvas.width / 2),
  //     (img.top = fabricCanvas.height / 2),
  //     (img.originX = "center"),
  //     (img.originY = "center");
  //   // img.flipX = "true";
  //   var widthScaleFactor = fabricCanvas.width / img.width;
  //   var heightScaleFactor = fabricCanvas.height / img.height;
  //   var scaleFactor = Math.max(widthScaleFactor, heightScaleFactor);

  //   // Scale fabric image to fit canvas
  //   img.scale(scaleFactor);
  //   img.set({
  //     left: fabricCanvas.width / 2,
  //     top: fabricCanvas.height / 2,
  //   });
  //   img.selectable = false;
  //   img.hasBorders = false;
  //   fab_video.getElement().play();

  //   fabricCanvas.renderAll();
  //   fabric.util.requestAnimFrame(function render() {
  //     fabricCanvas.renderAll();
  //     fabric.util.requestAnimFrame(render);
  //   });
  // });
}
function removeback() {
  fabricCanvas.setBackgroundImage(
    null,
    fabricCanvas.renderAll.bind(fabricCanvas)
  );
}
watch(color, (curr, prev) => {
  fabricCanvas.backgroundColor = curr;
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
