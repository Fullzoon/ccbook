<template>
  <div id="main">
    <div id="top" v-if="showTopLayout" :style="{ height: styleStore.topLayoutHeight }">
      <TopLayout></TopLayout>
    </div>
    <div id="center" :style="{ height: `calc(100% - ${showTopLayout?styleStore.topLayoutHeight:'0px'} - ${showBottomLayout?styleStore.bottomLayoutHeight:'0px'})`}">
      <div id="left">
        <LeftLayout></LeftLayout>
      </div>
      <div id="right">
        <router-view />
      </div>
    </div>
    <div id="bottom" v-if="showBottomLayout" :style="{ height: styleStore.bottomLayoutHeight }">
      <BottomLayout></BottomLayout>
    </div>
  </div>
</template>

<script setup>
import TopLayout from './Top.vue'
import LeftLayout from './Left.vue'
import BottomLayout from './Bottom.vue'

import useSettingStore from '../stores/setting'
import useStyleStore from '../stores/style'
import { storeToRefs } from 'pinia'
const settingStore = useSettingStore()
const styleStore = useStyleStore()
const { showTopLayout, showBottomLayout } = storeToRefs(settingStore)
</script>

<style lang="less" scoped>
@import '../style/global.less';
#main {
  width: 100%;
  height: 100%;
  #top {
    width: 100%;
    background-color: #ccc;
  }
  #center {
    width: 100%;
    // height: calc(100% - @topHeight - @bottomHeight);
    display: flex;
    #left {
      height: 100%;
    }
    #right {
      flex-shrink: 0;
      flex: 1;
      height: 100%;
    }
  }
  #bottom {
    width: 100%;
    background-color: #000;
    color: #fff;
  }
}
</style>