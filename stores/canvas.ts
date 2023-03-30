import { defineStore } from 'pinia'

let mycanvas:Ref<fabric.Canvas>;
let selectedElement:Ref<any>

export const useCanvas = defineStore('canvas' , {
state :()=>({mycanvas : "" , canasWrapper : "" , color : "" , canvasref : ""}) , 

})