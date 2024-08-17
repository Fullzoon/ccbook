<template>
  <div class="main">
    <Versions />
    <div class="box">
      <div class="trans"></div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import Versions from '../../components/Versions.vue'
import useSettingStore from '../../stores/setting'

const settingStore = useSettingStore()

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .box {
    padding: 40px;
    background-color: #1677FF;
    .trans {
      width: 20px;
      height: 20px;
      background-color: #ffffffe0;
    }
  }
}
</style>