<template>
  <div class="main">
    <div class="box">
      setting
    </div>
    <div class="box">
      title: {{ settingStore.title }}
    </div>
    <div class="box">
      <p>
        显示 BottomLayout: 
        <a-switch
          v-model:checked="settingStore.showBottomLayout"
          checked-children="显示"
          un-checked-children="隐藏" />
      </p>
      <p>
        主题色【默认：#1677ff】 【当前：{{ styleStore.globalColorPrimary }}】 : <input type="color" :value="styleStore.globalColorPrimary" @change="colorChange" />
      </p>
    </div>
  </div>
</template>

<script setup>
import useSettingStore from '../../stores/setting'
import useStyleStore from '../../stores/style'

const settingStore = useSettingStore()
const styleStore = useStyleStore()

const colorChange = (e) => {
  styleStore.globalColorPrimary = e.target.value
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .box {
    padding: 20px;
  }
}
</style>