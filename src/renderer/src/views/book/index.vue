<template>
  <div class="layout">
    <div
      class="top"
      v-if="showTopLayout"
      :style="{
        height: styleStore.topLayoutHeight + 'px',
      }">
      <TopLayout></TopLayout>
    </div>
    <div
      class="center"
      :style="{
        height: `calc(100% - ${showTopLayout?styleStore.topLayoutHeight:0}px`
      }">
      <div class="main custom-scroller1">
        <h1 class="title">{{ route.query.id }}</h1>
        <pre class="text">{{ text }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TopLayout from '../../layouts/Top.vue'
import useSettingStore from '../../stores/setting'
import useStyleStore from '../../stores/style'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const fs = require('fs')

const route = useRoute()
const settingStore = useSettingStore()
const styleStore = useStyleStore()
const { showTopLayout } = storeToRefs(settingStore)
let text = ref('loading')

onMounted(() => {
  const tmp1 = (new Date()).getTime()
  const content = fs.readFileSync(`./book/${route.query.id}/book.txt`, { encoding: 'utf-8' })
  console.log('readFile', (new Date()).getTime() - tmp1)

  // console.log(content)
  // console.log('console', (new Date()).getTime() - tmp1)

  text.value = content
  // console.log(text.value)
  console.log('document', (new Date()).getTime() - tmp1)
})

</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
  }
  .center {
    width: 100%;
    display: flex;
    .main {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background-color: #fff;
      .title {
        font-size: 30px;
        padding: 20px;
        font-weight: bold;
        text-align: center;
      }
      .text {
        padding: 20px;
        // text-indent: 2em;
        // white-space: pre-wrap;
        white-space: break-spaces;
      }
    }
  }
}
</style>