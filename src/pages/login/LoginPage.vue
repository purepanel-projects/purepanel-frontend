<template>
  <div id="page">
    <t-form class="w-[400px]" ref="form" :data="formData" :label-width="0" @submit="onSubmit">
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
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {MessagePlugin, type FormProps} from 'tdesign-vue-next';
import {UserIcon, LockOnIcon} from 'tdesign-icons-vue-next';

const formData: FormProps['data'] = reactive({
  account: '',
  password: '',
});
const onSubmit: FormProps['onSubmit'] = () => {

};
</script>

<style scoped>
@reference "tailwindcss";

#page {
  @apply flex h-screen items-center justify-center bg-white bg-cover bg-[100%] bg-[url(https://static.tdesign.tencent.com/starter/vue-next/assets/assets-login-bg-white-DhCleFXy.png)]
}

</style>