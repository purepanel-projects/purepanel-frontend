<template>
  <t-dialog attach="body" :visible="dialogVisible" :close-btn="true" cancel-btn="取消" :on-close="closeDialog">
    <template #header>新建菜单权限</template>
    <template #body>
      <t-form ref="form" :rules="FORM_RULES" :data="formData">
        <t-form-item label="标题" name="title">
          <t-input v-model="formData.title" placeholder="请输入标题"/>
        </t-form-item>
        <t-form-item label="类型" name="type">
          <t-radio-group variant="primary-filled" v-model="formData.type">
            <t-radio-button value="0">一级菜单</t-radio-button>
            <t-radio-button value="2">菜单组</t-radio-button>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="访问路径" name="path">
          <t-input v-model="formData.path" placeholder="请输入访问路径"/>
        </t-form-item>
        <t-form-item label="排序" name="path">
          <t-input-number v-model="formData.orderNo"/>
        </t-form-item>
        <t-form-item label="隐藏" name="isHidden">
          <t-switch v-model="formData.isHidden"/>
        </t-form-item>
        <t-form-item label="默认展开" name="expanded">
          <t-switch v-model="formData.expanded"/>
        </t-form-item>
      </t-form>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import type {DialogProps, FormProps} from "tdesign-vue-next";
import {reactive} from "vue";

interface Props {
  dialogVisible: Boolean;
  onClose: () => void;
}

const props = defineProps<Props>()

const closeDialog: DialogProps['onClose'] = () => {
  props.onClose();
};
//定义表单校验规则
const FORM_RULES: FormProps['rules'] = {
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    },
  ],
}
const formData: FormProps['data'] = reactive({
  type: '0',
  title: '',
  path: '',
  orderNo: 0,
  isHidden: false,
  expanded: false,
});
</script>