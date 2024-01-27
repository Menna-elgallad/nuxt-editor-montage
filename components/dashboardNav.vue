<template lang="pug">
.mycontainer-fluid.bg-primary
    .nav.py-2 
        ul.left-part.flex.justify-between.items-center
            li          
                  Nuxt-Link(to="/"): img(src="/logo-light.svg")

            li {{ name }}
            
            li.flex.items-center.gap-3
                div
                  Icon.text-xl.myicon(name="ci:arrow-undo-up-left") 
                  Icon.text-xl.myicon.opacity-50(name="ci:arrow-undo-up-right" class="ml-2 ")
                .rounded-full.bg-pink-500.flex.justify-center.items-center(class='w-[40px] h-[40px]') K 
                .btn.text-primary.bg-white.w-fit.ml-2 Share

</template>

<script setup>
const name = ref("Untitled");
const status = ref("saved");
const items = [
  {
    label: "Download MB4",
    icon: "pi pi-video",
  },
  {
    label: "Download JPG",
    icon: "pi pi-image",
  },
];
</script>

<style lang="scss" scoped>
.mycontainer-fluid {
  padding: 0.3rem 1rem;
  color: white;
  position: relative;
  z-index: 100;
}
.iconss {
  border-radius: 0.5rem;
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  transition: all 0.5s ease;

  &:hover {
    background-color: #cccccc60 !important;
    cursor: pointer;
  }
}
.mysurface-400 {
  background-color: #5251518c;
}

.borderright {
  border-right: 1px solid #cccccc93;
  padding-right: 0.5rem;
}
ul {
  li {
    .myicon {
      border-radius: 5px;
      padding: 0.2rem;
      transition: all 0.5s ease;
      &:hover {
        background-color: #cfcece46;
        cursor: pointer;
      }
    }
  }
}
</style>
