<template lang="pug">
.containerr.mt-4
  h4 Tools
  .tools.flex.justify-content-center.flex-column.mt-3
    .color.flex.justify-content-space-between.align-items-center.ml-5
      input(type="color" v-model ="color" :style="{backgroundColor : color}")
      img.icon(:class="[textData?.underline ? 'selected' : '']" @click="(changeElement('underline' , true))" src="~/assets/underline.png")
      img.icon(:class="[textData?.overline ? 'selected' : '']" @click="(changeElement('overline' , true))" src="~/assets/overline.png")
      img.icon(:class="[textData?.linethrough ? 'selected' : '']" @click="(changeElement('linethrough' , true))" src="~/assets/strikethrough.png")
  h4.text-headers Basic Text
  button#heading-text.btn(@click="addText('heading')") Add heading
  button#subheading-text.btn(@click="addText('subheading')") Add subheading
  button#body-text.btn(@click="addText('body')") Add body text
  h4.text-headers Sans Serif
  button#item-text.btn(v-for="f in TEXT_ITEMS?.sansSerif" :key="f" :style="{fontFamily: `${f}, sans-serif`}" @click="addText(f)") {{ f }}
  h4.text-headers Serif
  button#item-text.btn(v-for="f in TEXT_ITEMS.serif" :key="f" :style="{fontFamily: `${f}`}" @click="addText(f)") {{ f }}
  h4.text-headers Monospace
  button#item-text.btn(v-for="f in TEXT_ITEMS.monospace" :key="f" :style="{fontFamily: `${f}`}" @click="addText(f)") {{ f }}
  h4.text-headers Handwriting
  button#item-text.btn(v-for="f in TEXT_ITEMS.handwriting" :key="f" :style="{fontFamily: `${f}`}" @click="addText(f)") {{ f }}
  h4.text-headers Display
  button#item-text.btn(v-for="f in TEXT_ITEMS.display" :key="f" :style="{fontFamily: `${f}`}" @click="addText(f)") {{ f }}
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCanvas } from "~~/stores/canvas";
import { fabric } from "fabric";
const selectedElement = ref();
const canvasStore = useCanvas();
const { mycanvas, canasWrapper } = storeToRefs(canvasStore);
let fabricCanvas: fabric.Canvas;
onMounted(() => {
  fabricCanvas = mycanvas.value;
});
const textData = ref({
  underline: false,
  overline: false,
  linethrough: false
});
const color = ref("black");
enum ASSET_TYPE {
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  EMOJI = "EMOJI",
  SHAPE = "SHAPE",
  VIDEO = "VIDEO",
  UPLOAD = "UPLOAD"
}

function changeElement(prop: any, data: any) {
  const item = selectedElement.value?.get(prop);
  const selectedItem: fabric.Textbox = selectedElement.value;
  if (prop === "fill") {
    selectedItem.setSelectionStyles({ fill: `${data}` });
    return;
  }
  selectedItem.set(prop, typeof data === "boolean" ? !item : data);
  fabricCanvas?.renderAll();
  //@ts-ignore
  if (typeof data === "boolean") textData.value[`${prop}`] = !item;
}

const TEXT_ITEMS = {
  sansSerif: ["Roboto", "Montserrat", "Poppins"],
  serif: ["Playfair Display", "Merriweather", "IBM Plex Serif"],
  monospace: ["Roboto Mono", "Inconsolata", "Source Code Pro"],
  handwriting: ["Dancing Script", "Pacifico", "Indie Flower"],
  display: ["Lobster", "Bebas Neue", "Titan One"]
};

const calculateTextWidth = (text: string, font: string) => {
  const ctx = fabricCanvas?.getContext();
  ctx!.font = font;
  return ctx!.measureText(text).width + 20;
};

function addText(data: string) {
  switch (data) {
    case "heading":
      newTextbox(50, 700, "Heading", "Roboto");
      break;
    case "subheading":
      newTextbox(22, 500, "Subheading", "Roboto");
      break;
    case "body":
      newTextbox(18, 400, "Body", "Roboto");
      break;
    default:
      newTextbox(18, 400, "Text", data);
      break;
  }
}

function newTextbox(
  fontSize: number,
  fontWeight: string | number | undefined,
  text: string,
  font: string
) {
  const id = String(Math.floor(100000 + Math.random() * 900000));
  const newText = new fabric.Textbox(text, {
    left: fabricCanvas.getWidth() / 2,
    top: fabricCanvas.getHeight() / 2,
    originX: "center",
    originY: "center",
    fontFamily: "Roboto",
    fill: "#111",
    fontSize,
    fontWeight,
    textAlign: "center",
    cursorWidth: 1,
    stroke: "#000",
    strokeWidth: 0,
    cursorDuration: 1,
    paintFirst: "stroke",
    objectCaching: false,
    absolutePositioned: true,
    strokeUniform: true,
    //@ts-ignore
    inGroup: false,
    cursorDelay: 250,
    width: calculateTextWidth(text, `${fontWeight} ${fontSize}px Roboto`),
    id: `text_${id}`
  });
  fabricCanvas?.add(newText);
  fabricCanvas?.setActiveObject(newText);
  fabricCanvas?.bringToFront(newText);
  newText.enterEditing();
  newText.selectAll();
  fabricCanvas?.renderAll();
  newText.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedElement: ele.target });
  });

  newText.on("mousedblclick", (ele: any) => {
    ele.target.enterEditing();
  });
  //@ts-ignore
  fabricCanvas!.getActiveObject()!.set("fontFamily", font);
  fabricCanvas?.renderAll();
  // state.layers.push({
  //   id: `text_${id}`,
  //   object: newText,
  //   type: ASSET_TYPE.TEXT,
  //   color: randomColorHex()
  // });
}

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
  appearance: none;
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
