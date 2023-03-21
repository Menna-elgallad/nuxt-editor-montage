<template lang="pug">
span.px-3.icobutton(v-if="btnclass === 'left'" :class="classname")  
    Icon.mr-2(:name="name")
    span.text-xs {{ label}}
span.px-3.icobutton(v-if="btnclass === 'right'" :class="classname")    
    span.spanborder.text-xs {{ label}}    
    Icon.ml-2(:name="name")

</template>

<script setup>
const props = defineProps({
  name: String,
  label: String,
  btnclass: String,
  classname: String,
});
</script>

<style lang="scss" scoped>
.icobutton {
  border-radius: 0.8rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.1rem;
}
.spanborder {
  border-right: 1px solid #77777767;
  display: inline-block;
  padding-right: 0.5rem;
  margin-top: 2px;
}
</style>
