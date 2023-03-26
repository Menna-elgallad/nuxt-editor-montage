<template lang="pug">
.containerr.mt-4
    h4 Tools
    .tools.flex.justify-content-center.flex-column.mt-3
        .color.flex.justify-content-space-between.align-items-center.ml-5
            input(type="color" v-model ="color" :style="{backgroundColor : color}")
            img.icon(:class="[textData.underline ? 'selected' : '']" @click="(changeElement('underline' , true))" src="~/assets/underline.png")
            img.icon(:class="[textData.overline ? 'selected' : '']" @click="(changeElement('overline' , true))" src="~/assets/overline.png")
            img.icon(:class="[textData.linethrough ? 'selected' : '']" @click="(changeElement('linethrough' , true))" src="~/assets/strikethrough.png")
    h4.text-headers Basic Text
    button#heading-text.btn(@click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: 'heading'}))") Add heading
    button#subheading-text.btn(@click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: 'subheading'}))") Add subheading
    button#body-text.btn(@click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: 'body'}))") Add body text
    h4.text-headers Sans Serif
    button#item-text.btn(v-for="f in TEXT_ITEMS?.sansSerif" :key="f" :style="{fontFamily: `${f}, sans-serif`}" @click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: f}))") {{ f }}
    h4.text-headers Serif
    button#item-text.btn(v-for="f in TEXT_ITEMS.serif" :key="f" :style="{fontFamily: `${f}`}" @click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: f}))") {{ f }}
    h4.text-headers Monospace
    button#item-text.btn(v-for="f in TEXT_ITEMS.monospace" :key="f" :style="{fontFamily: `${f}`}" @click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: f}))") {{ f }}
    h4.text-headers Handwriting
    button#item-text.btn(v-for="f in TEXT_ITEMS.handwriting" :key="f" :style="{fontFamily: `${f}`}" @click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: f}))") {{ f }}
    h4.text-headers Display
    button#item-text.btn(v-for="f in TEXT_ITEMS.display" :key="f" :style="{fontFamily: `${f}`}" @click="(emit('addAsset' , {type: ASSET_TYPE.TEXT,value: f}))") {{ f }}
</template>

<script setup lang="ts">
const props = defineProps({
  selectedElement: Object,
  canvas: Object,
});
const textData = ref({
  underline: false,
  overline: false,
  linethrough: false,
});
const emit = defineEmits(["addAsset"]);
const color = ref("black");
enum ASSET_TYPE {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  EMOJI = "EMOJI",
  SHAPE = "SHAPE",
  VIDEO = "VIDEO",
  UPLOAD = "UPLOAD",
}

function changeElement(prop: any, data: any) {
  const item = props.selectedElement?.get(prop);
  props.selectedElement?.set(prop, typeof data === "boolean" ? !item : data);
  props.canvas?.renderAll();
  if (typeof data === "boolean") textData.value[`${prop}`] = !item;
}

const TEXT_ITEMS = {
  sansSerif: ["Roboto", "Montserrat", "Poppins"],
  serif: ["Playfair Display", "Merriweather", "IBM Plex Serif"],
  monospace: ["Roboto Mono", "Inconsolata", "Source Code Pro"],
  handwriting: ["Dancing Script", "Pacifico", "Indie Flower"],
  display: ["Lobster", "Bebas Neue", "Titan One"],
};

watch(color, () => {
  changeElement("fill", color.value);
});
</script>

<style scoped lang="scss">
#heading-text {
  font-size: 22px;
  font-weight: 700;
  height: 44px;
  line-height: 44px;
  font-family: Roboto;
}

#subheading-text {
  font-size: 16px;
  font-weight: 500;
  height: 34px;
  line-height: 34px;
  font-family: Roboto;
}

#body-text {
  font-size: 12px;
  font-weight: 400;
  height: 28px;
  line-height: 28px;
  font-family: Roboto;
}

#item-text {
  font-size: 16px;
  font-weight: 500;
  height: 34px;
  line-height: 34px;
}

.text-headers {
  margin-left: 3px;
  margin-top: 8px;
}

.selected {
  transform: scale(1.1);
  border: 1px rgba(80, 80, 80, 0.247);
}

.icon {
  -webkit-appearance: none;
  border: none;
  width: 27px;
  height: 27px;
  margin-left: 7px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}

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

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px rgba(65, 64, 64, 0.76);
  margin-top: 15px;

  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  --tw-bg-opacity: 1;
  background-color: rgb(248 248 248);
  border-radius: 0.475rem;
}
</style>
