<template>
  <div class="ml-26 gap-6 flex flex-col h-screen justify-center w-[410px]">
    <div class="p-10 flex flex-col gap-6 rounded-xl backdrop-blur-md">
      <span class="text-4xl/14 font-bold">登录到<br/>PurePanel</span>
      <t-form ref="form" :data="formData" :label-width="0" @submit="onSubmit" :rules="formRules">
        <t-form-item name="account">
          <t-input size="large" v-model="formData.account" clearable placeholder="请输入账号">
            <template #prefix-icon>
              <user-icon/>
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input size="large" v-model="formData.password" type="password" clearable placeholder="请输入密码">
            <template #prefix-icon>
              <lock-on-icon/>
            </template>
          </t-input>
        </t-form-item>
        <t-form-item>
          <t-button size="large" theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
    <t-typography-text class="absolute bottom-10" theme="secondary">Copyright @ 2021-2025 PurePanel. All Rights
      Reserved
    </t-typography-text>
  </div>
</template>
<script setup lang="ts">
import {LockOnIcon, UserIcon} from "tdesign-icons-vue-next";
import type {FormProps} from "tdesign-vue-next";
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {MessagePlugin} from 'tdesign-vue-next';

const router = useRouter()


const formRules: FormProps['rules'] = {
  account: [{
    required: true,
    message: '请输入账号'
  }],
  password: [
    {
      required: true,
      message: '请输入密码'
    }, {
      min: 6,
      message: '密码至少 6 位'
    }
  ]
}

const formData: FormProps['data'] = reactive({
  account: '',
  password: '',
});

const onSubmit: FormProps['onSubmit'] = ({validateResult}) => {
  if (validateResult !== true) {
    return;
  }
  localStorage.setItem('token', '1')
  MessagePlugin.success('登录成功')
  router.replace('/layout')
};
</script>