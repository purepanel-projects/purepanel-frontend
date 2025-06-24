<template>
  <div id="page" class="flex flex-col h-screen justify-center bg-cover bg-[100%] bg-[url(https://static.tdesign.tencent.com/starter/vue-next/assets/assets-login-bg-white-DhCleFXy.png)]">
    <login-header/>
    <login-form/>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from "@/pages/login/components/LoginForm.vue";
import LoginHeader from "@/pages/login/components/LoginHeader.vue";
import {useRouter} from "vue-router";

// const router = useRouter()
// if (localStorage.getItem('loginInfo')){
//   router.replace('/home')
// }
</script>

<style scoped>

</style>