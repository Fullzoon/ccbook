<script setup>
import Versions from './components/Versions.vue'
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
const test = () => {
  console.log('test')
}
</script>

<template>
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
    <div class="action">
      <a-button @click="test">
        Test
      </a-button>
    </div>
  </div>
  <Versions />
</template>
