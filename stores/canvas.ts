import { defineStore } from 'pinia'

export const useCanvas = defineStore('canvas' , {
state :()=>({mycanvas : "" , canasWrapper :""}) , 
actions : {
    canvasref (canvas:any ){
        this.mycanvas = canvas
    } , 
    canvasWrapperRef (canasWrapper:any ){
        this.canasWrapper = canasWrapper
    }
}
})