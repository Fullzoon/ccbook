<template>
  <div class="main">
    <a-collapse
      :bordered="false">
      <a-collapse-panel key="1" header="样式">
        <div class="setting-item">
          <div class="label">显示 TopLayout：</div>
          <a-switch
            v-model:checked="settingStore.showTopLayout"
            checkedChildren="显示"
            unCheckedChildren="隐藏" />
        </div>
        <div class="setting-item">
          <div class="label">显示 BottomLayout：</div>
          <a-switch
            v-model:checked="settingStore.showBottomLayout"
            checkedChildren="显示"
            unCheckedChildren="隐藏" />
        </div>
        <div class="setting-item">
          <div class="label">主题色：</div>
          <input type="color" :value="styleStore.globalColorPrimary" @change="e=>styleStore.globalColorPrimary=e.target.value" />
          <a-button size="small" type="primary" @click="styleStore.globalColorPrimary='#1677ff'">恢复默认</a-button>
        </div>
        <div class="setting-item">
          <div class="label">TopLayout背景色：</div>
          <input type="color" :value="styleStore.topLayoutBGC" @change="e=>styleStore.topLayoutBGC=e.target.value" />
          <a-button size="small" type="primary" @click="styleStore.topLayoutBGC=styleStore.globalColorPrimary">设为主题色</a-button>
        </div>
        <div class="setting-item">
          <div class="label">CenterLayout背景色：</div>
          <input type="color" :value="styleStore.centerLayoutBGC" @change="e=>styleStore.centerLayoutBGC=e.target.value" />
          <a-button size="small" type="primary" @click="styleStore.centerLayoutBGC=styleStore.globalColorPrimary">设为主题色</a-button>
          (不建议修改)
        </div>
        <div class="setting-item">
          <div class="label">BottomLayout背景色：</div>
          <input type="color" :value="styleStore.bottomLayoutBGC" @change="e=>styleStore.bottomLayoutBGC=e.target.value" />
          <a-button size="small" type="primary" @click="styleStore.bottomLayoutBGC=styleStore.globalColorPrimary">设为主题色</a-button>
        </div>
        <div class="setting-item">
          <div class="label">背景透明度：</div>
          <div style="width: 200px;">
            <a-slider v-model:value="styleStore.BGCTransparency" :min="0" :max="1" :step="0.1" />
          </div>
        </div>
        <div class="setting-item">
          <div class="label">TopLayout高度 [10-100]：</div>
          <a-input-number v-model:value="styleStore.topLayoutHeight" :min="10" :max="100" :step="1" />
        </div>
        <div class="setting-item">
          <div class="label">BottomLayout高度 [10-100]：</div>
          <a-input-number v-model:value="styleStore.bottomLayoutHeight" :min="10" :max="100" :step="1" />
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="程序">
        <!-- <div class="setting-item">
          <div class="label">settingStore.title：</div>
          <div class="value">
            {{ settingStore.title }}
          </div>
        </div> -->
        <div class="setting-item">
          <div class="label">显示 系统托盘：</div>
          <a-switch
            v-model:checked="settingStore.showTray"
            @change="changeTray"
            checkedChildren="显示"
            unCheckedChildren="隐藏" />
        </div>
        <div class="setting-item">
          <div class="label">隐藏退出弹窗：</div>
          <a-switch
            v-model:checked="settingStore.hideCloseDialog"
            checkedChildren="隐藏"
            unCheckedChildren="显示" />
        </div>
        <div class="setting-item">
          <div class="label">退出应用程序：</div>
          <a-switch
            v-model:checked="settingStore.closeType"
            :checkedValue="1"
            :unCheckedValue="2"
            checkedChildren="退出应用程序"
            unCheckedChildren="最小化到系统托盘" />
        </div>

      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useSettingStore from '../../stores/setting'
import useStyleStore from '../../stores/style'

const settingStore = useSettingStore()
const styleStore = useStyleStore()

const changeTray = v => {
  window.electron.ipcRenderer.send(v?'trayShow':'trayHide')
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .setting-item {
    display: flex;
    padding: 10px 0;
    align-items: center;
    .label {
      flex-shrink: 0;
      width: 200px;
      margin-right: 20px;
      text-align: right;
    }
    .item {
      flex: 1;
      flex-shrink: 0;
    }
  }
}
</style>