import { defineStore } from "pinia"

const useStyleStore = defineStore('style', {
  state: () => ({
    topLayoutHeight: '40px',
    bottomLayoutHeight: '40px',
  }),
  persist: true
})

export default useStyleStore