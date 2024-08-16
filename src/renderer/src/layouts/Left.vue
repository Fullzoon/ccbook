<template>
  <div class="main">
    <div class="head">
      <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="state.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
    <a-menu
      mode="inline"
      class="menu"
      @click="clickMenuItem"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      :inline-collapsed="state.collapsed"
      :items="menuMap"
    ></a-menu>
  </div>
</template>

<script setup>
import { reactive, watch, h, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import routeMap from '../router/routes.js'

const route = useRoute()
const router = useRouter()
const state = reactive({
  collapsed: false,
  activeKey: route.name,
  selectedKeys: [],
  openKeys: [],
})
let menuMap = []

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
}
const clickMenuItem = ({ item, key, keyPath }) => {
  if (state.activeKey === key) return
  else {
    state.activeKey = key
    router.push(item.path)
    // console.log('state.openKeys', state.openKeys)
  }
}
const formattingRoutes = (routes) => {
  if (Array.isArray(routes)) {
    return routes.map((item, index) => {
      // 判断菜单是否为隐藏
      if (item.meta.hide) {
        return null
      }
      return {
        key: item.name,
        path: item.path,
        title: item.meta.title,
        label: item.meta.title,
        icon: item.meta.icon ? () => h(item.meta.icon) : null,
        children: Array.isArray(item.children) ? formattingRoutes(item.children) : null
      }
    })
  }
  else {
    return []
  }
}

onBeforeMount(() => {
  state.selectedKeys = [route.name]
  const routeArr = route.fullPath.split('/')
  if (routeArr.length > 2) {
    state.openKeys = [routeArr[1]]
  }
  menuMap = reactive(formattingRoutes(routeMap))
})

watch(
  route,
  (toRoute, fromRoute) => {
    state.activeKey = toRoute.name
    state.selectedKeys = [toRoute.name]
})

</script>

<style lang="less" scoped>
@import '../style/global.less';
.main {
  width: 100%;
  height: 100%;
  .head {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00ffaa;
  }
  .menu {
    height: calc(100% - 50px);
    &.ant-menu-inline {
      width: @leftWidth;
    }
  }
}
</style>