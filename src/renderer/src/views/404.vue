<template>
  <a-result class="main" status="404" title="404" sub-title="抱歉，您访问的页面不存在。">
    <template #extra>
      <a-button style="-webkit-app-region: no-drag;" type="primary" @click="$router.go(-1)">返回</a-button>
    </template>
  </a-result>
</template>

<style lang="less" scoped>
.main {
  -webkit-app-region: drag;
  height: 100%;
  padding-top: 100px;
  border-radius: 10px;
  background-color: #fff;
}
</style>