<template lang="pug">
.tools
    .mycontainer.bg-blue-700
        ul.text-0
            li.py-3(v-for="(item,index) in names" :key="index" @click="toggle(  item.name ,index ) " :class="{active : activeindex===index}" ): Icon.text-3xl.icontools.ml-2(:name="item.icon")
    .toolItems( ref="tools") 
        .close( class="flex justify-content-end"): span(@click="close()")
            Icon.text-2xl.text-blue-700(name="ion:chevron-back")    
        .toolcontent
            span {{content}}
        

</template>

<script setup>
import gsap from "gsap";
const tools = ref();
const activeindex = ref(null);
const show = ref(false);
const content = ref();
function toggle(item, index) {
  if (show.value === false && !content.value) {
    gsap.to(".toolItems", {
      left: 60,
      duration: 0.5,
    });
  }

  show.value = !show.value;
  content.value = item;
  //   console.log(op.value.toggle(event), ">>", event);
}
function close() {
  gsap.to(".toolItems", {
    left: -300,
    duration: 0.5,
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
  position: fixed;
  left: 0;
  top: 50%;
  transform: translatey(-50%);
  width: 61px;
  padding: 0.5rem;
  border-radius: 0 1rem 1rem 0;
  ul {
    position: relative;
    z-index: 1;
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
    position: fixed;
    color: black;
    left: -100%;
    top: 50px;
    padding: 3rem;
    height: 100vh;
    background-color: white;
    width: 300px;
    border-radius: 1.2rem;
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
