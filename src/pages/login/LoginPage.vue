<template>
  <div id="page">
    <login-header/>
    <login-form/>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from "@/pages/login/component/LoginForm.vue";
import LoginHeader from "@/pages/login/component/LoginHeader.vue";
</script>

<style scoped>
@reference "tailwindcss";

#page {
  @apply flex flex-col h-screen justify-center bg-white bg-cover bg-[100%]
  bg-[url(https://static.tdesign.tencent.com/starter/vue-next/assets/assets-login-bg-white-DhCleFXy.png)]
}

</style>