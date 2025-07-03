<template>
  <t-head-menu>
    <t-button variant="text" @click="()=>useAsideCollapsedStore().reverse()">
      <template #icon>
        <t-icon v-if="useAsideCollapsedStore().asideCollapsed" name="menu-fold"/>
        <t-icon v-else name="menu-unfold"/>
      </template>
    </t-button>
    <span class="font-bold text-xl m-2">
      {{ usePageTitleStore().pageTitle }}
    </span>
    <t-input class="!w-56 !ml-auto mr-4" readonly default-value="搜索菜单">
      <template #suffixIcon>
        <t-icon name="search"/>
      </template>
    </t-input>
    <template #operations>
      <div class="flex flex-row items-center mr-[var(--td-comp-margin-xxl)] gap-2">
        <t-button class="!p-2" variant="text" @click="toggleFullScreen">
          <template #icon>
            <t-icon :name="isFullScreen?'fullscreen-exit':'fullscreen'"/>
          </template>
        </t-button>
        <t-button class="!p-2" variant="text">
          <template #icon>
            <t-icon name="notification"/>
          </template>
        </t-button>
        <t-dropdown :options="avatarDropdownOptions" trigger="click">
          <t-button class="!p-2" variant="text">
            <t-avatar class="" size="small" shape="circle"
                      image="https://ui.shadcn.com/avatars/shadcn.jpg"/>
          </t-button>
        </t-dropdown>
      </div>
    </template>
  </t-head-menu>
  <person-center-modal v-model:dialog-visible="personCenterDialogVisible"/>
  <change-pwd-modal v-model:dialog-visible="changePwdDialogVisible" :need-old-pwd="true"/>
</template>
<script setup lang="tsx">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'
import {usePageTitleStore} from "@/stores/pageTitleStore.ts";
import {onMounted, onUnmounted, ref} from "vue";
import PersonCenterModal from "@/components/PersonCenterModal.vue";
import type {DropdownProps} from "tdesign-vue-next";
import {KeyIcon, UserIcon, SettingIcon, SunnyIcon, LogoutIcon, MoonIcon} from "tdesign-icons-vue-next";
import {useRouter} from "vue-router";
import ChangePwdModal from "@/components/ChangePwdModal.vue";

const router = useRouter()


const isFullScreen = ref(false)
const personCenterDialogVisible = ref(false);
const changePwdDialogVisible = ref(false);
const avatarDropdownOptions: DropdownProps['options'] = [
  {
    content: '浅色模式',
    prefixIcon: () => <SunnyIcon/>,
    onClick: () => {
      document.documentElement.removeAttribute("theme-mode");
      localStorage.removeItem('theme-mode')
    }
  },
  {
    content: '深色模式',
    prefixIcon: () => <MoonIcon/>,
    onClick: () => {
      document.documentElement.setAttribute("theme-mode", "dark");
      localStorage.setItem('theme-mode', 'dark')
    },
    divider: true,
  },
  {
    content: '个人中心',
    prefixIcon: () => <UserIcon/>,
    onClick: () => {
      personCenterDialogVisible.value = true
    }
  },
  {
    content: '修改密码',
    prefixIcon: () => <KeyIcon/>,
    onClick: () => {
      changePwdDialogVisible.value = true
    }
  },
  // {
  //   content: '设置',
  //   prefixIcon: () => <SettingIcon/>,
  //   onClick: () => {
  //
  //   },
  //   divider: true,
  // },
  {
    content: '退出登录',
    prefixIcon: () => <LogoutIcon/>,
    onClick: () => {
      localStorage.removeItem('loginInfo')
      router.replace('/login')
    }
  },
]

function toggleFullScreen() {
  if (isFullScreen.value) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

function handleFullScreenChange() {
  isFullScreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullScreenChange)
})
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullScreenChange)
})
</script>