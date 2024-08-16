import { defineStore } from "pinia"

const useStyleStore = defineStore('style', {
  state: () => ({
    topLayoutHeight: '40px',
    bottomLayoutHeight: '40px',
    leftLayoutWidth: '200px',
    menuCollapsed: false,

    globalColorPrimary: '#1677FF',
  }),
  persist: true
})

export default useStyleStore