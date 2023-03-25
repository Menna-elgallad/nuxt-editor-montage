
import { defineStore } from 'pinia'
export const useColorsStore = defineStore('colors', () => {
   const color = ref<String>("red")
   const backimage = ref()
   const vidUploaded = ref()
   const removed = ref(false)

    function changecolor(val:String ) { 
        color.value = val
    }
    function createImgElment(val ) { 
      backimage.value =  val
    
  }
  function createVidElment(val ) { 
    vidUploaded.value =  val
  
}
  function removeImgBack(val) {
    removed.value = val
  }
    return { color , changecolor ,backimage,removed ,removeImgBack,createImgElment ,vidUploaded ,createVidElment}
  })