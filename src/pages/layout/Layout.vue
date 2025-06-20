<template>
  <div class="flex flex-row">
    <layout-aside-nav/>
    <div class="w-full h-screen overflow-auto">
      <div class="flex flex-col mt-4">
        <layout-header/>
        <layout-content/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from "@/pages/layout/components/LayoutHeader.vue";
import LayoutAsideNav from "@/pages/layout/components/LayoutAsideNav.vue";
import LayoutContent from "@/pages/layout/components/LayoutContent.vue";
</script>