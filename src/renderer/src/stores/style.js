import { defineStore } from "pinia"

const useStyleStore = defineStore('style', {
  state: () => ({
    topLayoutHeight: 30,
    bottomLayoutHeight: 20,
    leftLayoutWidth: '200px',
    menuCollapsed: false,

    topLayoutBGC: '#2E2E2E',
    centerLayoutBGC: '#ffffff',
    bottomLayoutBGC: '#000000',
    BGCTransparency: 1,

    globalColorPrimary: '#1677FF',
  }),
  getters: {
    BGCTransTo16: (state) => {
      const trans = parseInt(state.BGCTransparency * 255).toString(16)
      return trans.length > 1 ? trans : '0'+trans
    },
  },
  persist: true
})

export default useStyleStore