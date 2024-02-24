<template lang="pug">
.tools.flex.flex-row
  .mycontainer.bg-white(:class="{'opened' : show}")
    ul.text-0.py-3
      li.mt-4.mb-4.toollogo(v-for="(item,index) in names" :key="index" @click="toggle(  item.name ,index ) " :class="{active : activeindex===index}" )
        img(class="w-[32px]"  :src="item.icon")
        div.menu-text.text-xxs(  :class="{'active active-text' : activeindex===index}") {{item.name}}
  .toolItems( ref="tools" v-if="show") 
    .close( class="flex " v-if="!hideClose"): span(@click="close()" style="pointer:cursor")
      Icon.text-sm(name="material-symbols:arrow-back-ios-new-rounded")    
    .toolcontent
      background(v-if="content==='Background'")
      Text(v-if="content==='Text'")
      Scenes(v-if="content==='Scene'" @select-props="selectprops()" @hide-close="val=> hideClose = val")
      Images(v-if="content==='Images'" )
      Shapes(v-if="content==='Shapes'" )
      videos(v-if="content==='Videos'" )
      characters(v-if="content==='Characters'")
            
</template>

<script setup>
import ai from "~/public/svg/ai.svg";
import charachter from "~/public/svg/character.svg";
import photo from "~/public/svg/photo.svg";
import scenes from "~/public/svg/scenes.svg";
import script from "~/public/svg/script.png";
import text from "~/public/svg/text.svg";
import shapes from "~/public/svg/shapes.svg";
import gsap from "gsap";
const props = defineProps({
  selectedElement: Object,
  canvas: Object,
});
const hideClose = ref(false);
const tools = ref();
const activeindex = ref(null);
const show = ref(false);
const content = ref("");

const emit = defineEmits(["selectProps"]);

function toggle(item, index) {
  if (show.value === false && !content.value) {
    show.value = !show.value;
  }
  content.value = item;
  activeindex.value = index;
  hideClose.value = false;
}
function close() {
  // gsap.to(".toolItems", {
  //   xPercent: -100,
  //   duration: 1,
  // });
  show.value = false;
  content.value = "";
}

function selectprops() {
  emit("selectProps");
}

const names = [
  { name: "Scene", icon: scenes },
  { name: "Characters", icon: charachter },
  { name: "Text", icon: text },
  // { name: "Background", icon: "material-symbols:background-grid-small" },
  // { name: "Elements", icon: "gis:folder-maps" },
  { name: "Shapes", icon: shapes },
  { name: "Images", icon: photo },
  // { name: "Videos", icon: "fluent:video-32-filled" },
  // { name: "Voiceovers", icon: "pepicons-pop:music-note-double" },
  { name: "Script", icon: script },
];
</script>

<style lang="scss" scoped>
.mycontainer {
  width: 80px;
  height: fit-content;
  border-radius: 42px;
  border: 1px solid #d9d9d9;
  position: absolute;
  top: 40%;
  left: 10px;
  transform: translateY(-40%);
  transition: border-radius 0.5s ease;

  z-index: 1001;
  &.opened {
    left: 0;
    border-radius: 0;
    height: 68vh;
    transform: translateY(0);
    top: unset;

    // top: 501px;
  }
  ul {
    position: relative;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      position: relative;
      z-index: 100;
      transition: all 0.5s ease;
      border-radius: 1.2rem;

      &.active {
        color: $primary !important;

        svg {
          color: $primary !important;
        }
      }

      .menu-text {
        opacity: 0;
        transition: all 0.5s ease;
        &.active-text {
          opacity: 1 !important;
        }
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.623);
        color: $primary;
      }
    }
  }

  .icontools {
    position: relative;
    z-index: 3;
  }

  .toolItems {
    color: black;
    position: absolute;
    z-index: 1000;
    // transform: translateX(100%);
    overflow-x: hidden;
    padding: 2rem 1.4rem;
    left: 80px;
    background-color: white;
    width: 370px;
    border: 1px solid #d9d9d9;
    height: 68vh;

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
      background: #68b;
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
    cursor: pointer;
  }
}
.hoverDataMenu {
  display: none;
  position: absolute;
  left: 75px;
  background: #646464;
  padding: 0.7rem;
  color: white;
  border-radius: 1rem;
  transition: all 1s ease;
  z-index: 1001;
  &::before {
    content: "";
    border-style: solid;
    border-width: 10px 15px 10px 15px;
    border-style: solid;
    border-width: 10px 15px 10px 10px;
    border-color: transparent #646464 transparent transparent;
    position: absolute;
    left: -22px;
    top: 10px;
    z-index: 1001;
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
