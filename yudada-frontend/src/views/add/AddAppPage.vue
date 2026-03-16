<template>
  <div id="addAppPage">
    <h2 style="margin-bottom: 32px">创建应用</h2>
    <a-form
      :model="form"
      :style="{ width: '600px' }"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="appName" label="应用名称">
        <a-input v-model="form.appName" placeholder="请输入应用名称" />
      </a-form-item>
      <a-form-item field="appDesc" label="应用描述">
        <a-input v-model="form.appDesc" placeholder="请输入应用描述" />
      </a-form-item>
      <a-form-item field="appIcon" label="应用图标">
        <a-input v-model="form.appIcon" placeholder="请输入应用图标" />
        <!--        <picture-uploader-->
        <!--          :value="form.appIcon"-->
        <!--          on-change="(value)=>(form.appIcon=value)"-->
        <!--        ></picture-uploader>-->
      </a-form-item>
      <a-form-item field="appType" label="应用类型">
        <a-select
          v-model="form.appType"
          placeholder="请选择应用类型"
          allow-clear
        >
          <a-option
            v-for="(value, key) of APP_TYPE_MAP"
            :key="key"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="scoringStrategy" label="评分策略">
        <a-select
          v-model="form.scoringStrategy"
          placeholder="请选择评分策略"
          allow-clear
        >
          <a-option
            v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
            :key="key"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space
          style="
            display: flex;
            justify-content: center;
            width: 85%;
            margin-top: 28px;
          "
        >
          <a-button type="primary" html-type="submit" style="width: 320px"
            >提交</a-button
          >
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";
import API from "@/api";
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import { useRouter } from "vue-router";
import {
  addAppUsingPost,
  editAppUsingPost,
  getAppVoByIdUsingGet,
} from "@/api/appController";
import message from "@arco-design/web-vue/es/message";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return "";
  },
});

const router = useRouter();

const form = ref({
  appDesc: "",
  appIcon: "",
  appName: "",
  appType: 0,
  scoringStrategy: 0,
} as API.AppAddRequest);

const oldApp = ref<API.AppVO>();

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }
  const res = await getAppVoByIdUsingGet({
    id: props.id as any,
  });
  if (res.data.code === 0 && res.data.data) {
    oldApp.value = res.data.data;
    form.value = res.data.data;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

// 获取旧数据
watchEffect(() => {
  loadData();
});

/**
 * 提交
 */
const handleSubmit = async () => {
  let res: any;
  // 如果是修改
  if (props.id) {
    res = await editAppUsingPost({
      id: props.id as any,
      ...form.value,
    });
  } else {
    // 创建
    res = await addAppUsingPost(form.value);
  }
  if (res.data.code === 0) {
    message.success("操作成功，即将跳转到应用详情页");
    setTimeout(() => {
      router.push(`/app/detail/${props.id || res.data.data}`);
    }, 3000);
  } else {
    message.error("操作失败，" + res.data.message);
  }
};
</script>

<style scoped>
#addAppPage {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
