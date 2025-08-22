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
          <p v-if="conversationList.length > 0" class="text-[var(--td-text-color-secondary)] mt-8 ml-2">历史聊天</p>
          <div v-for="conversation in conversationList"
               :key="conversation.id"
               @mouseenter="hoverConversationId=conversation.id"
               class="flex items-center flex-row py-1 px-2 hover:bg-[var(--td-bg-color-container-hover)] cursor-pointer rounded-lg mt-2">
            <span>{{ conversation.title }}</span>
            <t-dropdown v-if="hoverConversationId === conversation.id"
                        trigger="click"
                        :options="conversationOptions"
                        :hide-after-item-click="true"
                        class="ml-auto">
              <t-icon @click="hoverConversationId=conversation.id" name="more"/>
            </t-dropdown>
          </div>
        </div>
        <div>
          <t-chat
              animation="moving"
              :data="chatList">
            <template #footer>
              <t-chat-input placeholder="请输入消息..." @send="handelSend"></t-chat-input>
            </template>
          </t-chat>
        </div>
      </div>
    </template>
  </t-drawer>
</template>
<script setup lang="tsx">
import {onMounted, ref} from 'vue';
import type {DialogProps} from "tdesign-vue-next";
import {listChatbotConversationApi} from "@/api/chatbotApi.ts";
import type {AiChatbotConversation} from "@/types/AiChatbotConversation.ts";
import {Edit2Icon, DeleteIcon, ShareIcon} from 'tdesign-icons-vue-next';

//定义接收的参数
const props = defineProps<{
  drawerVisible: Boolean;
}>()

//定义事件
const emit = defineEmits<{
  (e: 'update:drawerVisible', value: Boolean): void;
}>()

const currentConversationId = ref<string>()
const hoverConversationId = ref<string>()

onMounted(() => {
  //获取会话列表
  listConversation()
})

const conversationOptions = [
  {
    content: '重命名',
    value: 1,
    prefixIcon: () => <Edit2Icon/>,
  },
  {
    content: '分享',
    value: 1,
    prefixIcon: () => <ShareIcon/>,
  },
  {
    content: '删除',
    value: 1,
    prefixIcon: () => <DeleteIcon/>,
    theme: 'error',
  },
]

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

const conversationList = ref<AiChatbotConversation[]>([])

//获取会话列表
function listConversation() {
  listChatbotConversationApi().then(res => {
    conversationList.value = res.payload
  })
}

function handelSend(value: string) {

}
</script>