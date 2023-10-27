<template lang="pug">
.tools.flex.flex-row-reverse
  .mycontainer.border-round-2xl
    ul.text-0
      li.mt-2.py-3.toollogo(v-for="(item,index) in names" :key="index" @click="toggle(  item.name ,index ) " :class="{active : activeindex===index}" )
        Icon.text-3xl.icontools(:name="item.icon")
        div(class="hoverDataMenu text-sm font-semibold") {{item.name}}
  .toolItems( ref="tools") 
    .close( class="flex "): span(@click="close()" style="pointer:cursor")
      Icon.text-2xl.text-blue-700(name="ion:chevron-forward")    
    .toolcontent
      background(v-if="content==='Background'")
      Text(v-if="content==='Text'")
      animated(v-if="content==='Elements'" @select-props="selectprops()")
      images(v-if="content==='Images'" )
      shapes(v-if="content==='Shapes'" )
      videos(v-if="content==='Videos'" )
      characters(v-if="content==='Characters'")
            
</template>

<script setup>
import gsap from "gsap";
const props = defineProps({
  selectedElement: Object,
  canvas: Object
});
const tools = ref();
const activeindex = ref(null);
const show = ref(false);
const content = ref("Background");

const emit = defineEmits(["selectProps"]);

function toggle(item, index) {
  if (show.value === false && !content.value) {
    gsap.to(".toolItems", {
      xPercent: -1
    });
  }
  console.log(item);
  show.value = !show.value;
  content.value = item;
  activeindex.value = index;
}
function close() {
  gsap.to(".toolItems", {
    xPercent: 100,
    duration: 1
  });
  show.value = false;
  content.value = "";
}

function selectprops() {
  emit("selectProps");
}

const names = [
  { name: "Scenes", icon: "zondicons:film" },
  { name: "Characters", icon: "bi:people-fill" },
  { name: "Text", icon: "mdi:format-text" },
  { name: "Background", icon: "material-symbols:background-grid-small" },
  { name: "Elements", icon: "gis:folder-maps" },
  { name: "Shapes", icon: "bx:bxs-shapes" },
  { name: "Images", icon: "ion:images" },
  { name: "Videos", icon: "fluent:video-32-filled" },
  { name: "Voiceovers", icon: "pepicons-pop:music-note-double" },
  { name: "Script", icon: "gg:transcript" }
];
</script>

<style lang="scss" scoped>
.mycontainer {
  width: 70px;

  background: linear-gradient(
    180deg,
    rgba(13, 60, 97, 1) 0%,
    rgba(18, 66, 105, 1) 54%,
    rgba(52, 89, 119, 1) 100%
  );
  transform: translateY(-25px);
  z-index: 5;

  ul {
    position: relative;

    li {
      display: grid;
      place-content: center;
      cursor: pointer;
      position: relative;
      z-index: 100;
      transition: all 0.5s ease;
      border-radius: 1.2rem;

      &.active {
        background-color: rgb(255 255 255);
        color: var(--blue-900);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.623);
        color: var(--blue-900);
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
    // transform: translateX(100%);
    overflow-x: hidden;
    padding: 2rem 1.4rem;
    height: 100%;

    background-color: white;
    width: 370px;
    border-radius: 1.2rem;
    height: 85vh;
    box-shadow: 0 0 8px 2px #cccccc41;
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
.hoverDataMenu {
  display: none;
  position: absolute;
  right: 75px;
  background: #646464;
  padding: 0.7rem;
  color: white;
  border-radius: 1rem;
  transition: all 1s ease;
  &::before {
    content: "";
    border-style: solid;
    border-width: 10px 15px 10px 15px;
    border-style: solid;
    border-width: 10px 15px 10px 10px;
    border-color: transparent transparent transparent #646464;
    position: absolute;
    right: -22px;
    top: 10px;
  }
}
.toollogo {
  transition: all 1s ease;
  &:hover {
    .hoverDataMenu {
      display: block;
    }
  }
}
</style>
