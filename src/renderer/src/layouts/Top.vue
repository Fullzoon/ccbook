<template>
  <div
    class="main"
    :style="{
      backgroundColor: styleStore.topLayoutBGC + styleStore.BGCTransTo16
    }">
    <div class="icon">
    </div>
    <div class="title">
    </div>
    <div class="btn-box">
      <div class="btn" @click="handleMin">
        <MinusOutlined />
      </div>
      <div class="btn" @click="handleMax">
        <PlusOutlined />
      </div>
      <div class="btn close" @click="handleClose">
        <CloseOutlined />
      </div>
    </div>
  </div>
  <a-modal v-model:open="showCloseModal" title="退出提示">
    <template #footer>
      <div class="modal-footer">
        <a-checkbox class="checkbox" v-model:checked="settingStore.hideCloseDialog">不再显示</a-checkbox>
        <a-button type="primary" @click="handleCloseOk">确认</a-button>
      </div>
    </template>
    <a-radio-group class="radio-group" v-model:value="settingStore.closeType">
      <a-radio class="radio-item" :value="1">退出应用程序</a-radio>
      <a-radio class="radio-item" :value="2">最小化到系统托盘</a-radio>
    </a-radio-group>
  </a-modal>
</template>

<script setup>
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons-vue'
import useStyleStore from '../stores/style'
import useSettingStore from '../stores/setting'
import { ref, reactive } from 'vue'

const styleStore = useStyleStore()
const settingStore = useSettingStore()
const showCloseModal = ref(false)

const handleMin = () => window.electron.ipcRenderer.send('windowMin')
const handleMax = () => window.electron.ipcRenderer.send('windowMax')
const handleClose = () => {
  if (settingStore.hideCloseDialog) {
    handleCloseOk()
  }
  else {
    showCloseModal.value = true
  }
}

const handleCloseOk = () => {
  showCloseModal.value = false
  if (settingStore.closeType === 1) {
    window.electron.ipcRenderer.send('windowClose')
  }
  else {
    settingStore.showTray = true
    window.electron.ipcRenderer.send('trayShow')
    window.electron.ipcRenderer.send('windowHide')
  }
}

</script>

<style lang="less" scoped>
.main {
  -webkit-app-region: drag;
  user-select: none;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  .icon {
    width: 40px;
    height: 100%;
    flex-shrink: 0;
  }
  .title {
    flex: 1;
    text-align: center;
    color: #fff;
  }
  .btn-box {
    display: flex;
    height: 100%;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    .btn {
      -webkit-app-region: no-drag;
      position: relative;
      width: 40px;
      height: 80%;
      margin-right: 8px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      span {
        position: absolute;
        top: 50%;
        left: 50;
        transform: translate(-50%, -50%);
      }
      &:hover {
        background-color: #fff3;
      }
      &.close {
        &:hover {
          background-color: #E81123;
        }
      }
    }
  }
}
.modal-footer {
  display: flex;
  .checkbox {
    display: flex;
    align-items: center;
    flex: 1;
  }
}
.radio-group {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .radio-item {
    display: flex;
    height: 30px;
    width: 150px;
    line-height: 30px;
  }
}
</style>