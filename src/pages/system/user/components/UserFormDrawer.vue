<template>
  <t-form :rules="formRules" :data="formData" @submit="handleSubmit">
    <t-drawer destroy-on-close :visible="drawerVisible" @close="closeDrawer"
              header="填写用户信息"
              size="medium"
              :close-btn="true">
      <t-form-item label="名称" name="name">
        <t-input v-model="formData.name" placeholder="请输入名称"/>
      </t-form-item>
      <t-form-item label="账号" name="account">
        <t-input v-model="formData.account" placeholder="请输入账号"/>
      </t-form-item>
      <t-form-item label="联系电话" name="phoneNumber">
        <t-input v-model="formData.phoneNumber" placeholder="请输入联系电话"/>
      </t-form-item>
      <t-form-item label="邮箱" name="email">
        <t-input v-model="formData.email" placeholder="请输入邮箱"/>
      </t-form-item>
      <t-form-item label="头像" name="email">
        <t-upload
            accept="image/*"
            theme="image"
        />
      </t-form-item>
      <t-form-item label="密码" name="pwd">
        <t-input v-model="formData.pwd" placeholder="请输入密码" type="password"/>
      </t-form-item>
      <t-form-item label="确认密码" name="confirmPwd">
        <t-input v-model="formData.confirmPwd" placeholder="请确认密码" type="password"/>
      </t-form-item>
      <t-form-item label="已启用" name="status">
        <t-switch v-model="formData.status"/>
      </t-form-item>
      <template #footer>
        <t-button>确定</t-button>
        <t-button variant="outline">取消</t-button>
      </template>
    </t-drawer>
  </t-form>
</template>
<script setup lang="ts">
import type {AddSysUserFormData, SysUser} from "@/types/SysUser.ts";
import type {FormProps} from "tdesign-vue-next";
import {reactive} from "vue";

//定义接收的参数
const props = defineProps<{
  drawerVisible: Boolean;
  oldData?: SysUser | null;
}>()
//定义事件
const emit = defineEmits<{
  (e: 'update:drawerVisible', value: Boolean): void;
  (e: 'submit-success'): void;
}>()

//定义表单校验规则
const formRules: FormProps['rules'] = {
  name: [
    {
      required: true,
      message: '请输入名称',
    },
  ],
}
//定义表单数据
let formData = reactive<AddSysUserFormData>({});

//定义表单提交事件
const handleSubmit: FormProps['onSubmit'] = ({validateResult}) => {

}

//关闭抽屉
function closeDrawer() {
  emit('update:drawerVisible', false)
}
</script>