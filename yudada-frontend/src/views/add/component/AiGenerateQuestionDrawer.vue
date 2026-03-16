<template>
  <a-button type="outline" @click="handleClick">AI生成题目</a-button>
  <a-drawer
    :width="340"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    unmountOnClose
    :footer="null"
  >
    <template #title> AI生成题目 </template>
    <div>
      <a-form :model="form" auto-label-width @submit="handleSubmit">
        <a-form-item label="应用 id:">
          {{ appId }}
        </a-form-item>
        <a-form-item field="questionNumber" label="题目数量">
          <a-input-number
            min="0"
            max="20"
            v-model="form.questionNumber"
            placeholder="请输入题目数量"
          />
        </a-form-item>
        <a-form-item field="optionNumber" label="选项数量">
          <a-input-number
            min="0"
            max="6"
            v-model="form.optionNumber"
            placeholder="请输入选项数量"
          />
        </a-form-item>
        <a-form-item>
          <a-space
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 28px;
            "
          >
            <a-button
              :loading="submitting"
              type="primary"
              html-type="submit"
              style="width: 200px"
              >{{ submitting ? "生成中" : "一键生成" }}</a-button
            >
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import API from "@/api";
import { defineProps, reactive, ref, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import { aiGenerateQuestionUsingPost } from "@/api/questionController";

interface Props {
  appId: string;
  onSuccess: (result: API.QuestionContentDTO[]) => void;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});

const form = reactive({
  optionNumber: 2,
  questionNumber: 10,
} as API.AiGenerateQuestionRequest);

const visible = ref(false);
const submitting = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
const handleSubmit = async () => {
  if (!props.appId) {
    return;
  }
  submitting.value = true;
  const res = await aiGenerateQuestionUsingPost({
    appId: props.appId as any,
    ...form,
  });
  if (res.data.code === 0 && res.data.data.length > 0) {
    if (props.onSuccess) {
      props.onSuccess(res.data.data);
    } else {
      message.success("生成题目成功");
      //关闭抽屉
      handleCancel();
    }
  } else {
    message.error("操作失败，" + res.data.message);
  }
  submitting.value = false;
};
</script>
