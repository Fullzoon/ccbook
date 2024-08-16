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
        显示 TopLayout: 
        <a-switch
          v-model:checked="settingStore.showTopLayout"
          checked-children="显示"
          un-checked-children="隐藏" />
      </p>
      <p>
        显示 BottomLayout: 
        <a-switch
          v-model:checked="settingStore.showBottomLayout"
          checked-children="显示"
          un-checked-children="隐藏" />
      </p>
    </div>
  </div>
</template>

<script setup>
import useSettingStore from '../../stores/setting'

const settingStore = useSettingStore()


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