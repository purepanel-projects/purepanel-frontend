<template>
  <t-head-menu class="backdrop-blur-md !bg-transparent">
    <t-button  variant="text" shape="round" @click="useAsideCollapsedStore().reverse()">
      <template #icon>
        <t-icon :name="useAsideCollapsedStore().asideCollapsed?'menu-fold':'menu-unfold'" size="20"/>
      </template>
    </t-button>
<!--    <t-input class="!w-56 !ml-auto mr-4" readonly default-value="搜索菜单">-->
<!--      <template #suffixIcon>-->
<!--        <t-icon name="search"/>-->
<!--      </template>-->
<!--    </t-input>-->
    <template #operations>
      <div class="flex flex-row items-center mr-[var(--td-comp-margin-xxl)] gap-2">
        <t-tooltip content="AI 助理">
          <t-button class="!p-2" variant="text" shape="round" @click="router.push('/aiChatbot')">
            <template #icon>
              <t-icon name="chat-bubble-smile"/>
            </template>
          </t-button>
        </t-tooltip>
        <t-button class="!p-2" variant="text" shape="round">
          <template #icon>
            <t-icon name="notification"/>
          </template>
        </t-button>
        <t-button class="!p-2" variant="text" shape="round" @click="toggleFullScreen">
          <template #icon>
            <t-icon :name="isFullScreen?'fullscreen-exit':'fullscreen'"/>
          </template>
        </t-button>
        <t-dropdown :options="avatarDropdownOptions" max-column-width="300px">
          <t-button class="!p-1" variant="text" shape="round">
            <t-avatar v-if="avatarUrl" size="small" shape="round"
                      :image="avatarUrl"/>
            <t-avatar v-else size="small" shape="round">
              {{ nameAvatar }}
            </t-avatar>
          </t-button>
        </t-dropdown>
      </div>
    </template>
  </t-head-menu>
  <change-pwd-modal v-model:dialog-visible="changePwdDialogVisible"
                    :need-old-pwd="true"/>
</template>
<script setup lang="tsx">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'
import {onMounted, onUnmounted, ref} from "vue";
import {type DropdownProps, MessagePlugin} from "tdesign-vue-next";
import {KeyIcon, UserIcon, SunnyIcon, LogoutIcon, MoonIcon} from "tdesign-icons-vue-next";
import {useRouter} from "vue-router";
import ChangePwdModal from "@/components/ChangePwdModal.vue";
import {getFileNetworkPath} from "@/utils/fileUtils.ts";
import type {AccountLoginRes} from "@/api/loginApi.ts";

const router = useRouter()

//当前登录用户信息
const userInfo = ref<AccountLoginRes>({
  loginCode: "",
  sysUser: {
    name: "",
    avatar: "",
  }
})
//用户头像网络地址
const avatarUrl = ref<string>()
const nameAvatar = ref<string>()

onMounted(() => {
  const loginInfo = localStorage.getItem('loginInfo');
  if (loginInfo) {
    userInfo.value = JSON.parse(loginInfo) as AccountLoginRes
    avatarUrl.value = getFileNetworkPath(userInfo.value.sysUser.avatar!)
    nameAvatar.value = userInfo.value.sysUser.name!.substring(0, 1)
  }
})
//是否全屏
const isFullScreen = ref(false)
//修改密码对话框显隐
const changePwdDialogVisible = ref(false);
//头像下拉菜单定义
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
    content: '编辑个人资料',
    prefixIcon: () => <UserIcon/>,
    onClick: () => {
      router.push('/userProfile')
    }
  },
  {
    content: '修改密码',
    prefixIcon: () => <KeyIcon/>,
    divider: true,
    onClick: () => {
      changePwdDialogVisible.value = true
    }
  },
  {
    content: '退出登录',
    prefixIcon: () => <LogoutIcon/>,
    onClick: () => {
      MessagePlugin.success('已退出')
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