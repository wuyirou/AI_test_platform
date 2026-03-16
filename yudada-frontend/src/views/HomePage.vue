<template>
  <div id="homePage">
    <div class="searchBar">
      <a-input-search
        v-model="searchKeyword"
        :style="{ width: '320px' }"
        size="large"
        placeholder="快速搜索应用"
        button-text="搜索"
        search-button
        @search="handleSearch"
      />
    </div>
    <a-list
      class="list-demo-action-layout"
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
      :bordered="false"
      :data="dataList"
      :pagination-Props="{
        total: total,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <app-card :app="item" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AppCard from "@/components/AppCard.vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { listAppByPageUsingPost } from "@/api/appController";
import { REVIEW_STATUS_ENUM } from "@/constant/app";

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 12,
};

const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.AppVO[]>([]);
const total = ref<number>(0);

/**
 * 加载数据
 */
const loadData = async () => {
  const params = {
    reviewStatus: REVIEW_STATUS_ENUM.PASS,
    ...searchParams.value,
  };
  const res = await listAppByPageUsingPost(params);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
.searchBar {
  text-align: center;
  margin-bottom: 28px;
}
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
