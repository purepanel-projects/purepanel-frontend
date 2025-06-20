<template>
  <t-head-menu>
    <t-button variant="text" @click="()=>useAsideCollapsedStore().reverse()">
      <template #icon>
        <t-icon name="view-list"/>
      </template>
    </t-button>
    <span class="font-bold text-2xl m-2">
      {{ usePageTitleStore().pageTitle}}
    </span>
    <template #operations>
      <t-button variant="text">
        <template #icon>
          <t-icon name="notification"/>
        </template>
      </t-button>
      <t-button variant="text">
        <template #icon>
          <t-icon name="user"/>
        </template>
      </t-button>
    </template>
  </t-head-menu>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'
import {usePageTitleStore} from "@/stores/pageTitleStore.ts";
</script>