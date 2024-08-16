<template>
  <div class="main" :style="{
    backgroundColor: styleStore.globalColorPrimary
  }">
    Bottom
  </div>
</template>

<script setup>
import useStyleStore from '../stores/style'

const styleStore = useStyleStore()
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  border-radius: 0 0 10px 10px;
}
</style>