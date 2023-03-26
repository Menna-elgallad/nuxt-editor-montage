
import { defineStore } from 'pinia'
export const useColorsStore = defineStore('colors',  {

  state: () => ({ color: "red", backimage: '' , vidUploaded :" "  , removed :false}),

  actions: {
    changecolor(val :string) {
      this.color =val
    },
    createImgElment(val :string) {
      this.backimage =val
    },
    createVidElment(val :string) {
      this.vidUploaded =val
    },
    removeImgBack(val :boolean) {
      this.removed =val
    },
  },
   
  })