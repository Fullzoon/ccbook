<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: styleStore.globalColorPrimary,
      },
    }">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import useStyleStore from './stores/style'

const styleStore = useStyleStore()
</script>

<style lang="less" scoped>

</style>
