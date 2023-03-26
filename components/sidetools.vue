<template lang="pug">
.tools.flex.flex-row-reverse
  .mycontainer.bg-blue-700
    ul.text-0
      li.py-3(v-for="(item,index) in names" :key="index" @click="toggle(  item.name ,index ) " :class="{active : activeindex===index}" ): Icon.text-3xl.icontools.ml-2(:name="item.icon")
  .toolItems( ref="tools") 
    .close( class="flex "): span(@click="close()" style="pointer:cursor")
      Icon.text-2xl.text-blue-700(name="ion:chevron-forward")    
    .toolcontent
      background(v-if="content==='backround'")
      Text(v-if="content==='text'" @addAsset="addAssets" :selectedElement="selectedElement" :canvas="canvas")
            
</template>

<script setup>
import gsap from "gsap";
const props = defineProps({
  selectedElement: Object,
  canvas: Object,
});
const tools = ref();
const activeindex = ref(null);
const show = ref(false);
const content = ref();

const emit = defineEmits(["addAsset", "changeBackColor"]);

function addAssets(event) {
  emit("addAsset", event);
}

function toggle(item, index) {
  if (show.value === false && !content.value) {
    gsap.to(".toolItems", {
      xPercent: -100,
    });
  }
  console.log(item);
  show.value = !show.value;
  content.value = item;
  activeindex.value = index;
}
function close() {
  gsap.to(".toolItems", {
    xPercent: -1,
    duration: 1,
  });
  show.value = false;
  content.value = "";
}

const names = [
  { name: "backround", icon: "material-symbols:background-grid-small" },
  { name: "text", icon: "mdi:format-text" },
  { name: "film", icon: "zondicons:film" },
  { name: "chars", icon: "bi:people-fill" },
  { name: "shapes", icon: "bx:bxs-shapes" },
  { name: "animation", icon: "ic:sharp-animation" },
  { name: "vid", icon: "fluent:video-32-filled" },
  { name: "imgs", icon: "ion:images" },
  { name: "music", icon: "pepicons-pop:music-note-double" },
];
</script>

<style lang="scss" scoped>
.mycontainer {
  // position: fixed;
  // left: 0;
  // top: 50%;
  // transform: translatey(-50%);
  width: 61px;
  padding: 0.5rem;
  // border-radius: 0 1rem 1rem 0;
  z-index: 5;

  ul {
    position: relative;
    // z-index: 100;

    li {
      cursor: pointer;
      position: relative;
      z-index: 100;
      transition: all 0.5s ease;
      border-radius: 1.2rem;

      &.active {
        background-color: #cccccc3a;
      }

      &:hover {
        background-color: #cccccc3a;
      }
    }
  }

  .icontools {
    position: relative;
    z-index: 3;
  }

  .toolItems {
    color: black;
    position: relative;
    z-index: 1;
    transform: translateX(100%);
    padding: 2rem;
    height: 95vh;
    overflow-y: scroll;
    background-color: white;
    width: 350px;
    border-radius: 1.2rem;

    /* width */
    &::-webkit-scrollbar {
      width: 4px;
    }

    // /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 50px;
    }

    // /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #8888885b;
      border-radius: 50px;
    }

    // /* Handle on hover */
    // &::-webkit-scrollbar-thumb:hover {
    //   background: #555;
    // }

    // .toolcontent {
    //   margin-left: 2rem;
    // }
  }
}

.close {
  span {
    padding: 0.2rem;
    background-color: #f3f3f3;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
