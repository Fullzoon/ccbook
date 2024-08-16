<template>
  <div class="main" :style="{
    backgroundColor: styleStore.globalColorPrimary
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
</template>

<script setup>
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons-vue'
import useStyleStore from '../stores/style'

const styleStore = useStyleStore()
const handleMin = () => window.electron.ipcRenderer.send('windowMin')
const handleMax = () => window.electron.ipcRenderer.send('windowMax')
const handleClose = () => window.electron.ipcRenderer.send('windowClose')

</script>

<style lang="less" scoped>
.main {
  -webkit-app-region: drag;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 10px 10px 0 0;
  user-select: none;
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
    align-content: center;
    justify-content: center;
    .btn {
      -webkit-app-region: no-drag;
      width: 40px;
      height: 32px;
      margin-right: 8px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
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
</style>