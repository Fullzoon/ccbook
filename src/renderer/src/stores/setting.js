import { defineStore } from "pinia"

const useSettingStore = defineStore('setting', {
  state: () => ({
    title: '彳亍',
    // 布局
    showTopLayout: true,
    showBottomLayout: true,
    // 系统托盘
    showTray: false,
    // 关闭
    hideCloseDialog: false,
    closeType: 1, // 1 直接关闭，2 关闭到系统托盘
  }),
  persist: true
})

export default useSettingStore