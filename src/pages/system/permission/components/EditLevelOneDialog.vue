<template>
  <t-form ref="form" :rules="FORM_RULES" :data="formData" @submit="onSubmit">
    <t-dialog :visible="dialogVisible" :close-btn="true" :on-close="closeDialog">
      <template #header>新建菜单权限</template>
      <template #body>
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
      </template>
      <template #footer>
        <t-button theme="primary" type="submit">保存</t-button>
      </template>
    </t-dialog>
  </t-form>
</template>
<script setup lang="ts">
import {type DialogProps, type FormProps, MessagePlugin} from "tdesign-vue-next";
import {reactive} from "vue";
import {addOrUpdateApi} from "@/api/permissionApi.ts";
import type {SysPermission} from "@/type/PermissionRes.ts";
//定义接收的参数
interface Props {
  dialogVisible: Boolean;
  onClose: () => void;
  oldData?: SysPermission;
}
const props = defineProps<Props>()
//关闭弹窗
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
//定义表单数据
const formData: FormProps['data'] = reactive({
  type: props.oldData?.type ?? 0,
  title: props.oldData?.title?? '',
  path: props.oldData?.path?? '',
  orderNo: props.oldData?.orderNo?? 0,
  isHidden: props.oldData?.isHidden?? false,
  expanded: props.oldData?.expanded?? false,
  id: props.oldData?.id?? '',
});
//定义表单提交事件
const onSubmit: FormProps['onSubmit'] = async ({validateResult}) => {
  if (validateResult !== true) {
    return;
  }
  const data: SysPermission = {
    type: Number.parseInt(formData?.type),
    path: formData?.path,
    title: formData?.title,
    orderNo: formData?.orderNo,
    isHidden: formData?.isHidden,
    expanded: formData?.expanded,
  }
  const res = await addOrUpdateApi(data)
  if (res.status === 200) {
    await MessagePlugin.success('保存成功')
    props.onClose();
  }
};
</script>