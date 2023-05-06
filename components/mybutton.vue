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
  classname: String
});
</script>

<style lang="scss" scoped>
.icobutton {
  border-radius: 0.4rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  font-weight: 700;
  // letter-spacing: 0.08rem;
  transition: all 0.3s ease;
  &:hover {
    // transform: scale(1.05);
    cursor: pointer;
    box-shadow: 0 0 2px 2px rgb(153 153 153 / 59%);
  }
}
.spanborder {
  border-right: 1px solid #77777767;
  display: inline-block;
  padding-right: 0.3rem;
  margin-top: 2px;
}
</style>
