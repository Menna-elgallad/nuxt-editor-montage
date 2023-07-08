<template lang="pug">
.shapes.mt-3.container
    .BasicRepo(@click="showbasics =!showbasics" class=" myborder pb-2 relative") 
        .myhead
            img(src="../assets/folders/shapes.png")
            span(class=" bg-white border-round p-2 absolute down-up ")
                Icon(name="material-symbols:arrow-drop-down" class=" text-xl" style="transform : rotate(-52deg);" v-if="!showbasics")
                Icon(name="material-symbols:arrow-drop-up" class=" text-xl" style="transform : rotate(-52deg);" v-else)
        h5(class=" text-black-alpha-50 mt-2 text-center") Basic Shapes
    .basicShapes.ml-3(v-if="showbasics") 
        Icon(v-for="(ele , index ) in shapes" :name="ele.icon" class=" text-7xl text-black-alpha-50 cursor-pointer" @click="addshape(ele.type)")    
    
      
    
</template>

<script setup lang="ts">
import { useCanvas } from "~~/stores/canvas";
import { fabric } from "fabric";

const canvasStore = useCanvas();
const emit = defineEmits(["selectprop"]);
const showbasics = ref(false);
const shapes = [
  { icon: "mdi-light:shape-square", type: "square" },
  { icon: "mdi-light:shape-triangle", type: "triangle" },
  { icon: "mdi-light:shape-circle", type: "circle" },
  { icon: "mdi-light:shape-octagon", type: "polygon" },
  { icon: "fluent-mdl2:ellipse", type: "ellipse" },
  { icon: "material-symbols:star-outline", type: "star" },
  { icon: "material-symbols:favorite-outline", type: "heart" }
];
let fabricCanvas: any;

onMounted(() => {
  //@ts-ignore
  const mycanvas = document.getElementById("mycanvas").fabric;
  fabricCanvas = mycanvas;

  //   canvaswrapper = canasWrapper.value;
});
function addshape(type: any) {
  let shape;
  switch (type) {
    case "circle":
      shape = new fabric.Circle({
        radius: 50,
        fill: "#ccc",
        left: 50,
        top: 0
      });
      break;
    case "square":
      shape = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "#ccc",
        left: 100,
        top: 100
      });
      break;

    case "polygon":
      shape = new fabric.Polygon(
        [
          { x: 50, y: 0 },
          { x: 100, y: 0 },
          { x: 150, y: 50 },
          { x: 150, y: 100 },
          { x: 100, y: 150 },
          { x: 50, y: 150 },
          { x: 0, y: 100 },
          { x: 0, y: 50 }
        ],
        {
          fill: "#ccc",
          left: 100,
          top: 100
        }
      );
      break;
    case "ellipse":
      shape = new fabric.Ellipse({
        rx: 70,
        ry: 50,
        fill: "#ccc",
        left: 100,
        top: 100
      });
      break;
    case "triangle":
      shape = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: "#ccc",
        left: 100,
        top: 100
      });
      break;
    case "star":
      shape = new fabric.Polygon(
        [
          { x: 349.9, y: 75 },
          { x: 379, y: 160.9 },
          { x: 469, y: 160.9 },
          { x: 397, y: 214.9 },
          { x: 423, y: 300.9 },
          { x: 350, y: 249.9 },
          { x: 276.9, y: 301 },
          { x: 303, y: 215 },
          { x: 231, y: 161 },
          { x: 321, y: 161 }
        ],
        {
          fill: "#ccc",
          scaleX: 0.5,
          scaleY: 0.5,
          left: 100,
          top: 100
        }
      );

      break;
    // Create a heart shape
    case "heart":
      shape = new fabric.Path(
        "M 272.70141,238.71731 \
    C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731  \
    C 152.70146,493.47282 288.63461,528.80461 381.26391,662.02535 \
    C 468.83815,529.62199 609.82641,489.17075 609.82641,358.71731 \
    C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731  \
    C 441.77851,238.71731 400.42481,267.08774 381.26391,307.90481 \
    C 362.10311,267.08773 320.74941,238.7173 272.70141,238.71731  \
    z "
      );
      var scale = 100 / shape.width;
      shape.set({
        left: 20,
        top: 0,
        scaleX: scale,
        scaleY: scale,
        fill: "#ccc"
      });

      break;
    default:
      throw new Error(`Invalid shape type: ${type}`);
  }

  // shape.animate("angle", 45, {
  //   onChange: fabricCanvas.renderAll.bind(fabricCanvas)
  // });
  shape.animate("top", "+=100", {
    onChange: fabricCanvas.renderAll.bind(fabricCanvas),
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce
  });
  fabricCanvas.add(shape);
  fabricCanvas.renderAll();
  shape.on("mousedown", (ele: any) => {
    canvasStore.$patch({ selectedProp: ele.target });
    canvasStore.$patch({ selectedID2: Math.random() });

    console.log(shape.fill);

    canvasStore.$patch({ selectedPropColor: shape.fill });
    canvasStore.$patch({ selectedPropBorder: shape.stroke });
    // Change the color of a shape in the animation data object
  });
}
</script>

<style lang="scss" scoped>
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
.down-up {
  bottom: -30px;
  width: fit-content;
  height: 56px;
  right: 7px;
  transform: rotate(52deg);
}
.myhead {
  width: 100%;
  height: 100px;
}
</style>
