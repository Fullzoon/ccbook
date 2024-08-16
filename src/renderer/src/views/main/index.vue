<template>
  <div class="main">
    <div class="actions">
      <div class="action">
        <a-button>
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
        </a-button>
      </div>
      <div class="action">
        <a-button @click="ipcHandle">Send IPC</a-button>
      </div>
      <div class="action">
        <a-button @click="$message.success('Hello world!')">Msg Box</a-button>
      </div>
    </div>
    <Versions />

    <a-alert
      message="当前环境："
      :description="$env"
      type="success"
      show-icon
    />
    <div class="box">
      <a-button type="primary" @click="$router.push('/setting')">
        跳转setting页
      </a-button>
      <a-button type="primary" @click="$router.push('/anywhere')">
        跳转到404页
      </a-button>
    </div>
    <div class="box pinia">
      <div>pinia 使用：</div>
      <div class="box">
        title: {{ settingStore.title }}
        <a-input v-model:value="settingStore.title" />
      </div>
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
    padding: 20px;
  }
  .pinia {
    width: 100%;
    border: 1px solid black;
  }
}
</style>