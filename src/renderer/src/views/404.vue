<template>
  <a-result class="main" status="404" title="404" sub-title="抱歉，您访问的页面不存在。">
    <template #extra>
      <a-button type="primary" @click="$router.go(-1)">返回</a-button>
    </template>
  </a-result>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  padding-top: 100px;
}
</style>