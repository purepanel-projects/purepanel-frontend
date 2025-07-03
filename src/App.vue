<template>
  <RouterView/>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'

const themeMode = localStorage.getItem('theme-mode')
if (themeMode === 'dark') {
  document.documentElement.setAttribute("theme-mode", "dark");
}
</script>

<style scoped>

</style>
