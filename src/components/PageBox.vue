<template>
  <div class="h-full flex flex-col gap-4 p-6">
    <p class="text-3xl font-bold">{{ title }}</p>
    <slot/>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  title: string
}>()
</script>