<template>
  <RouterView/>
</template>

<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'

const router = useRouter()

if (localStorage.getItem("token")) {
  router.replace("/home")
} else {
  router.replace("/login")
}

</script>

<style scoped>

</style>
