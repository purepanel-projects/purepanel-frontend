<template>
  <div class="flex flex-col w-full p-5 h-screen overflow-auto">
    <div class="!mt-[var(--td-comp-size-xxxl)] h-full">
      <RouterView/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>