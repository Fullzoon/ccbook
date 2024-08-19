<template>
  <div id="main">
    <div
      id="top"
      v-if="showTopLayout"
      :style="{
        height: styleStore.topLayoutHeight + 'px',
      }">
      <TopLayout></TopLayout>
    </div>
    <div
      id="center"
      :style="{
        height: `calc(100% - ${showTopLayout?styleStore.topLayoutHeight:0}px - ${showBottomLayout?styleStore.bottomLayoutHeight:0}px)`,
        backgroundColor: styleStore.centerLayoutBGC + styleStore.BGCTransTo16,
      }">
      <div
        id="left"
        :style="{

        }">
        <LeftLayout></LeftLayout>
      </div>
      <div
        id="right"
        class="custom-scroller1"
        :style="{

        }">
        <router-view v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>    
        </router-view>
      </div>
    </div>
    <div
      id="bottom"
      v-if="showBottomLayout"
      :style="{
        height: styleStore.bottomLayoutHeight + 'px'
      }">
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
#main {
  width: 100%;
  height: 100%;
  #top {
    width: 100%;
  }
  #center {
    width: 100%;
    display: flex;
    #left {
      height: 100%;
    }
    #right {
      flex: 1;
      flex-shrink: 0;
      height: 100%;
      overflow-y: auto;
    }
  }
  #bottom {
    width: 100%;
  }
}
</style>