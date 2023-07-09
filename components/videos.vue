<template lang="pug">
.containerr.mt-4
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
</template>
    
<script setup lang="ts">
import { useCanvas } from "~~/stores/canvas";
import { storeToRefs } from "pinia";
import { fabric } from "fabric";
import { useLocalStorageStore } from "~~/stores/assets";
const assetsStore = useLocalStorageStore();
const vidoeEle = ref([]);

const {
  getsrcsImages,
  getsrcsVideos,
  setsrcsImages,
  setsrcsVideos
} = assetsStore;
let fabricCanvas: any;
let canvaswrapper: any;
const VideoUploaded = ref();
const isVideo = ref(true);

const srcsVid = ref<string[]>([]);
  import { TimeLineStore } from "~~/stores/timeline";
const timeLineStore = TimeLineStore()
const activatedSlide = timeLineStore.activeSlide.id
onMounted(() => {
  //@ts-ignore
  const mycanvas = document.getElementById(`mycanvas-${activatedSlide}`).fabric;

  fabricCanvas = mycanvas;
  srcsVid.value = getsrcsVideos;
  //   canvaswrapper = canasWrapper.value;
});
const imguploaded = ref();
const srcs = ref<string[]>([]);
function onfilechangeVid(event: any) {
  VideoUploaded.value = event.target.files[0];
}
watch(VideoUploaded, (curr, prev) => {
  setsrcsVideos(srcsVid.value);

  srcsVid.value.push(URL.createObjectURL(curr));
});
if (srcsVid.value.length === 0) {
  srcsVid.value = getsrcsVideos;
}
function removeUplodedVid(indx: number) {
  isVideo.value = false;

  srcsVid.value.splice(indx, 1);
  setTimeout(() => {
    isVideo.value = true;
  }, 10);
}
function uploadedbackvid(index: any) {
  const videos = document.querySelectorAll("video");
  console.log("videos", videos[index].width);
  const myvid = srcsVid.value[index];
  function getVideoElement(url) {
    var videoE = document.createElement("video");

    videoE.muted = true;
    videoE.crossOrigin = "anonymous";
    var source = document.createElement("source");
    source.src = url;
    source.type = "video/mp4";
    videoE.appendChild(source);
    videoE.width = 500;
    videoE.height = 500;
    return videoE;
  }
  // var canvas = new fabric.Canvas('c');
  var url_mp4 = myvid;

  var videoE = getVideoElement(url_mp4);
  var fab_video = new fabric.Image(videoE, { left: 0, top: 0 });
  //   fab_video.set({ width: videoE.videoWidth, height: videoE.videoHeight });

  fabricCanvas.add(fab_video);
  console.log("fab_video", fab_video);
  fab_video.getElement().play();
  fabric.util.requestAnimFrame(function render() {
    fabricCanvas.renderAll();
    fabric.util.requestAnimFrame(render);
  });
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
    