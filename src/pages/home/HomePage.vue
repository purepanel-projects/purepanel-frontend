<template>
  <t-layout>
    <home-header/>
    <t-layout>
      <home-aside-nav/>
      <home-content/>
    </t-layout>
  </t-layout>
</template>
<script setup lang="ts">
import HomeHeader from "@/pages/home/components/HomeHeader.vue";
import HomeAsideNav from "@/pages/home/components/HomeAsideNav.vue";
import HomeContent from "@/pages/home/components/HomeContent.vue";

</script>