import { defineStore } from 'pinia'

export const useLocalStorageStore = defineStore('localStorage', {
  state: () => ({
    srcsImages: [],
    srcsVideos: [],
    
  }),
  getters: {
    getsrcsImages() {
      return this.srcsImages 
    },
    getsrcsVideos() {
        return  this.srcsVideos
    },
  },
  actions: {
    setsrcsImages(data) {
      this.srcsImages = data
   
    },
    setsrcsVideos(data) {
        this.srcsImages = data

      },
  },
})