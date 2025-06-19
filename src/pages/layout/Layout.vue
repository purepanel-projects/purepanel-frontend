<template>
  <div class="flex flex-col">
    <layout-header/>
    <div class="flex flex-row w-full">
      <layout-aside-nav/>
      <layout-content/>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from "@/pages/layout/components/LayoutHeader.vue";
import LayoutAsideNav from "@/pages/layout/components/LayoutAsideNav.vue";
import LayoutContent from "@/pages/layout/components/LayoutContent.vue";
</script>