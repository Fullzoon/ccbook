import { defineStore } from "pinia"

const useSettingStore = defineStore('setting', {
  state: () => ({
    title: '彳亍',
    showTopLayout: true,
    showBottomLayout: true,
  }),
  persist: true
})

export default useSettingStore