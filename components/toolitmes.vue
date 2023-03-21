<template lang="pug">


</template>

<script setup>
const props = defineProps({
  elment: String,
});
</script>

<style lang="scss">
.toolItems {
  box-shadow: 0 0 4px 2px #cccccc3b;
  position: absolute;
  color: black;
  left: -10px;
  top: 0;
  padding: 1rem;
  height: 100vh;
  z-index: -1;
  width: 250px;
}
</style>
