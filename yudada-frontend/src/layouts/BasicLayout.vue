<template>
  <div id="basicLayout">
    <a-layout style="height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.code-nav.cn" target="_blank">
          miaow @2025.11.29
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  max-height: 1200px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 28px;
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

.footer {
  position: fixed; /* 固定定位 */
  bottom: 0; /* 贴到底部 */
  left: 0; /* 贴到左边 */
  width: 100%; /* 占满宽度 */
  z-index: 999; /* 防止被其他元素遮挡 */
  padding: 16px;
  text-align: center;
  background: #efefef;
}
</style>
