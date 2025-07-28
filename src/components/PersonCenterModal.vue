<template>
  <t-dialog :visible="dialogVisible" :close-btn="true" :on-close="closeDialog">
    <template #header>ID: {{ userInfo.sysUser.id }}</template>
    <template #body>
      <div class="flex flex-col mt-5 text-[var(--td-text-color-primary)]">
        <div class="flex flex-row gap-4">
          <t-avatar size="60px" shape="round"
                    :image="getFileNetworkPath(userInfo.sysUser.avatar!)"/>
          <div class="flex flex-col justify-center">
            <span class="font-bold">{{ userInfo.sysUser.name }}</span>
            <span class="text-[var(--td-text-color-secondary)] text-sm">{{ userInfo.sysUser.account }}</span>
          </div>
        </div>

      </div>
    </template>
    <template #footer>
      &nbsp;
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import type {DialogProps} from "tdesign-vue-next";
import type {AccountLoginRes} from "@/api/loginApi.ts";
import {getFileNetworkPath} from "@/utils/fileUtils.ts";

//获取用户信息
const userInfo = JSON.parse(localStorage.getItem('loginInfo')!) as AccountLoginRes


//定义接收的参数
const props = defineProps<{
  dialogVisible: Boolean;
}>()
//定义事件
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: Boolean): void;
}>()


//关闭弹窗
const closeDialog: DialogProps['onClose'] = () => {
  emit('update:dialogVisible', false)
};
</script>
