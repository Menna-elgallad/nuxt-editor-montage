import { defineStore } from 'pinia'

export const useCanvas = defineStore('canvas' , {
state :()=>({mycanvas : ""}) , 
actions : {
    canvasref (canvas:any ){
        this.mycanvas = canvas
    }
}
})