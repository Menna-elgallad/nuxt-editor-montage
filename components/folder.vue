<template lang="pug">
.folder
    img(src="../assets/folders/shapes.png")
    span(class=" bg-white border-round p-2 absolute down-up ")
        Icon(name="material-symbols:arrow-drop-down" class=" text-xl" style="transform : rotate(-52deg);" v-if="!show")
        Icon(name="material-symbols:arrow-drop-up" class=" text-xl" style="transform : rotate(-52deg);" v-else) 
</template>

<script script lang="ts">
const props = defineProps({
  show: String,
  text: String,
  img: String,
});
</script>

<style lang="scss" scoped></style>
