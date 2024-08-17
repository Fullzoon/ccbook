<template>
  <div class="main">
    <div class="head" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="styleStore.menuCollapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <a-menu
      mode="inline"
      class="menu"
      :style="{
        width: styleStore.menuCollapsed ? '80px' : styleStore.leftLayoutWidth,
        backgroundColor: '#ffffff00'
      }"
      @click="clickMenuItem"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      :inline-collapsed="styleStore.menuCollapsed"
      :items="menuMap"
    ></a-menu>
  </div>
</template>

<script setup>
import { reactive, watch, h, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import routeMap from '../router/routes.js'
import useStyleStore from '../stores/style'

const styleStore = useStyleStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  activeKey: route.name,
  selectedKeys: [],
  openKeys: []
})
let menuMap = []

const toggleCollapsed = () => {
  styleStore.menuCollapsed = !styleStore.menuCollapsed
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
  } else {
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

watch(route, (toRoute, fromRoute) => {
  state.activeKey = toRoute.name
  state.selectedKeys = [toRoute.name]
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-app-region: drag;
  .head {
    -webkit-app-region: no-drag;
    cursor: pointer;
    height: 40px;
    width: 100%;
    border-right: 1px solid #0000000f;
    border-bottom: 1px solid #0000000f;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      transition: all ease-in-out .1s;
    }
    &:hover {
      span {
        transform: scale(1.2);
      }
    }
  }
  .menu {
    height: calc(100% - 40px);
    :deep(.ant-menu-item) {
      -webkit-app-region: no-drag;
    }
  }
}
</style>