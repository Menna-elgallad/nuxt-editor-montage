<template lang="pug">
.mcontainer.surface-200.p-5
    .slides.py-4
        .flex.gap-3.mt-3(v-for="(element, index) in state.array" :key="index" :class="{ 'array-item': true, 'show': element.show }") 
            h4.text-blue-900 0{{index}}
            .slide
    .addslide.flex.justify-content-center.align-items-center.mt-3.flex-column(@click="addnewslide()" )
        Icon(name="bx:layer-plus" class="text-5xl text-blue-900 add" )
        h4.text-blue-900.mt-2 Blank slide
        
</template>

<script lang="ts" setup>
const nextIndex = ref(0);
const state = reactive({
  array: [{ index: nextIndex.value, show: true }],
});

async function addnewslide() {
  // create a new element object with a show property
  nextIndex.value++;
  const newElement = { index: nextIndex.value, show: false };

  state.array.push(newElement);
  console.log(state.array);

  newElement.show = true;

  console.log(state.array);
}
</script>

<style scoped lang="scss">
.mcontainer {
  margin-top: -50px;
}
.slides {
  border-bottom: 2px solid #cccccc9c;

  .slide {
    background-color: white;
    border-radius: 1.2rem;
    width: 200px;
    height: 100px;
    box-shadow: 0px 3px 8px 2px #ccc;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      background-color: #ffffff27;
    }
  }
}
.addslide {
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    .add {
      color: #777 !important;
      transform: scale(1.05);
    }
    h4 {
      color: #777 !important;
    }
  }
  h4 {
    transition: all 0.5s ease;
  }
  .add {
    transition: all 0.5s ease;
  }
}
.array-item {
  opacity: 0;
  transition: opacity 5s ease-in-out;
}
@keyframes animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}
.show {
  animation: animate 0.2s ease-in forwards;
}
</style>
