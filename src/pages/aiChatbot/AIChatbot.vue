<template>
  <div class="flex-row flex h-full text-[var(--td-text-color-primary)]">
    <div class="flex flex-col w-1/6 border-r border-r-[var(--td-border-level-1-color)] p-4">
      <div class="flex items-center flex-row p-2 gap-1
          hover:bg-[var(--td-bg-color-container-hover)] cursor-pointer rounded-lg">
        <t-icon name="edit-1"/>
        <span>新聊天</span>
      </div>
      <p v-if="conversationList.length > 0" class="text-[var(--td-text-color-secondary)] mt-8 ml-2">历史聊天</p>
      <div v-for="conversation in conversationList"
           :key="conversation.id"
           @mouseenter="hoverConversationId=conversation.id"
           class="flex items-center flex-row p-2 hover:bg-[var(--td-bg-color-container-hover)] cursor-pointer rounded-lg mt-2">
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
    <chat
        :reverse="false"
        class="!p-6"
        animation="moving"
        :clear-history="chatList.length > 0"
        :data="chatList">
      <div v-if="chatList.length === 0" class="flex flex-col justify-center gap-10 h-full">
        <p class="w-full text-center text-3xl">😊 我们先从哪里开始呢？</p>
        <chat-sender :textarea-props="{placeholder: '询问任何问题'}"
                     @send="handelSend"/>
      </div>
      <template #footer>
        <chat-sender v-if="chatList.length > 0" :textarea-props="{placeholder: '询问任何问题'}"
                     @send="handelSend"/>
      </template>
    </chat>
  </div>
</template>
<script setup lang="tsx">
import {onMounted, ref} from 'vue';
import {listChatbotConversationApi} from "@/api/chatbotApi.ts";
import type {AiChatbotConversation} from "@/types/AiChatbotConversation.ts";
import {Edit2Icon, DeleteIcon, ShareIcon} from 'tdesign-icons-vue-next';
import {Chat, ChatSender} from '@tdesign-vue-next/chat'

const currentConversationId = ref<string>()
const hoverConversationId = ref<string>()

onMounted(() => {
  //获取会话列表
  listConversation()
})

//历史聊天菜单项
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

//消息对话列表
const chatList = ref<{
  avatar?: string;
  name?: string;
  datetime?: string;
  content: string;
  role: 'user' | 'assistant' | 'model-change',
}[]>([]);

//会话列表
const conversationList = ref<AiChatbotConversation[]>([])

//获取会话列表
function listConversation() {
  listChatbotConversationApi().then(res => {
    conversationList.value = res.payload
  })
}

function handelSend(value: string) {
  chatList.value.push({
    name: '自己',
    content: value,
    role: 'user',
  })

}
</script>