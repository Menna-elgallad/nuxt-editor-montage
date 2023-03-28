<template lang="pug">
.mycontainer-fluid.bg-blue-700
    .nav.flex.justify-content-between.align-items-center
        ul.left-part.flex.gap-2.align-items-center 
            li
              .content
                  Icon(name="fluent:list-16-filled" class="iconli")
                  span.ml-2.text-lg Animaider
            
            li: Icon.text-3xl.myicon(name="bi:question-circle" class="iconli" )   
            li
                
                Icon.text-3xl.myicon(name="ooui:undo-ltr" class="iconli") 
                Icon.text-3xl.myicon(name="ooui:undo-rtl" class="ml-2 iconli")
            
            li.span.font-bold {{ name }}
        ul.right-part.flex.gap-2.align-items-center    
                li: span.borderright.font-bold {{status}} 
                li: Mybutton(name="lucide:crown" label="Upgrade"  classname="bg-pink-300" btnclass="left"  )
                
                li: span.iconss.mysurface-400.text-50
                    i(class="pi pi-play"  )
                li: span.iconss.mysurface-400.text-50
                    i(class="pi pi-video" )
                li: span.iconss.surface-0.text-500
                    i(class="pi pi-share-alt"  )
                li: Mybutton(name="iconoir:download" label="Download"  classname="surface-0 text-color" btnclass="right"    )

</template>

<script setup>
const name = ref("untitled");
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
.left-part {
  li:not(:last-child) {
    border-right: 1px solid #cccccc93;
    padding: 0 1rem;
    .myicon {
      margin-right: 0.5rem;
    }
  }
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
