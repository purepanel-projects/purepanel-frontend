<template>
  <t-drawer :visible="drawerVisible"
            @close="closeDrawer"
            :footer="false"
            :show-overlay="false"
            size="large"
            header="AI 助手"
            :close-btn="true">
    <template #body>
      <div class="flex-row flex h-full text-[var(--td-text-color-primary)]">
        <div class="flex flex-col w-1/3 border-r border-r-[var(--td-border-level-1-color)] pr-3 mr-3">
          <div class="flex items-center flex-row py-1 px-2 gap-1
          hover:bg-[var(--td-bg-color-container-hover)] cursor-pointer rounded-lg">
            <t-icon name="edit-1"/>
            <span>新聊天</span>
          </div>
          <p class="text-[var(--td-text-color-secondary)] mt-8 ml-2">历史聊天</p>
          <div class="flex items-center flex-row py-1 px-2
          hover:bg-[var(--td-bg-color-container-hover)] cursor-pointer rounded-lg mt-2">
            <span>新聊天</span>
          </div>
        </div>
        <t-chat
            animation="moving"
            :data="chatList">
        </t-chat>
      </div>
    </template>
  </t-drawer>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import type {DialogProps} from "tdesign-vue-next";

//定义接收的参数
const props = defineProps<{
  drawerVisible: Boolean;
}>()

//定义事件
const emit = defineEmits<{
  (e: 'update:drawerVisible', value: Boolean): void;
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
const closeDrawer: DialogProps['onClose'] = () => {
  emit('update:drawerVisible', false)
};
</script>