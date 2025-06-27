<template>
  <t-layout>
    <t-aside class="max-w-min h-screen">
      <layout-aside-nav/>
    </t-aside>
    <t-layout class="h-screen">
      <t-header>
        <layout-header/>
      </t-header>
      <t-content class="overflow-auto p-3">
        <layout-content/>
      </t-content>
    </t-layout>
  </t-layout>
</template>
<script setup lang="ts">
import LayoutHeader from "@/pages/layout/components/LayoutHeader.vue";
import LayoutAsideNav from "@/pages/layout/components/LayoutAsideNav.vue";
import LayoutContent from "@/pages/layout/components/LayoutContent.vue";
</script>