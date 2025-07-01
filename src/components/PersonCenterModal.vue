<template>
  <t-dialog :visible="dialogVisible" :close-btn="true" :on-close="closeDialog">
    <template #header>个人中心</template>
    <template #body>
      <div class="flex flex-col mt-5 text-[var(--td-text-color-primary)]">
        <div class="flex flex-row gap-4">
          <t-avatar class="" size="50px" shape="circle"
                    image="https://ui.shadcn.com/avatars/shadcn.jpg"/>
          <div class="flex flex-col justify-center">
            <span class="font-bold">1</span>
            <span class="text-[var(--td-text-color-secondary)] text-sm">zyan1226@163.com</span>
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
