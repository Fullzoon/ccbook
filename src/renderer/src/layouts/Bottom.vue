<template>
  <div
    class="main"
    :style="{
      backgroundColor: styleStore.bottomLayoutBGC + styleStore.BGCTransTo16
    }">
    Bottom
    {{ $env }}
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
  color: #fff;
  border-radius: 0 0 10px 10px;
}
</style>