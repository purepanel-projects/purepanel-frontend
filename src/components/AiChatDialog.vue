<template>
  <t-dialog :visible="dialogVisible"
            :on-close="closeDialog"
            :footer="false"
            header="AI 助手"
            mode="modeless"
            draggable
            right="0">
    <template #body>
      <t-chat
          animation="moving"
          :data="chatList">
      </t-chat>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import type {DialogProps} from "tdesign-vue-next";

//定义接收的参数
const props = defineProps<{
  dialogVisible: Boolean;
}>()

//定义事件
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: Boolean): void;
}>()

// 倒序渲染
const chatList = ref([
  {
    content: `模型由 <span>hunyuan</span> 变为 <span>GPT4</span>`,
    role: 'model-change',
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'TDesignAI',
    datetime: '今天16:38',
    content: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
    role: 'assistant',
  },
  {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: '今天16:38',
    content: '南极的自动提款机叫什么名字？',
    role: 'user',
  },
]);

//关闭弹窗
const closeDialog: DialogProps['onClose'] = () => {
  emit('update:dialogVisible', false)
};
</script>