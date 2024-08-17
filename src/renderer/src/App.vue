<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: styleStore.globalColorPrimary,
        colorBgBase: '#ffffff',
        colorBgContainer: '#ffffff',
        colorPrimaryBg: '#1677FF1f',
      },
    }">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import useStyleStore from './stores/style'
import useSettingStore from './stores/setting'

const styleStore = useStyleStore()
const settingStore = useSettingStore()

if (settingStore.showTray) window.electron.ipcRenderer.send('trayShow')
</script>

<style lang="less" scoped>

</style>
