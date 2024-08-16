import { defineStore } from "pinia"

const useSettingStore = defineStore('setting', {
  state: () => ({
    title: 'Hello world ccbook',
    showTopLayout: true,
    showBottomLayout: true,
  }),
  persist: true
})

export default useSettingStore