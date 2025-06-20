<template>
  <t-head-menu class="!bg-transparent">
    <t-button variant="text" @click="()=>useAsideCollapsedStore().reverse()">
      <template #icon>
        <t-icon v-if="useAsideCollapsedStore().asideCollapsed" name="menu-fold"/>
        <t-icon v-else name="menu-unfold"/>
      </template>
    </t-button>
    <span class="font-bold text-2xl m-2">
      {{ usePageTitleStore().pageTitle }}
    </span>
    <template #operations>

      <t-button variant="text">
        <template #icon>
          <t-icon name="notification"/>
        </template>
      </t-button>
      <t-avatar class="!mr-[var(--td-comp-margin-xxl)]" size="small" shape="round" image="https://ui.shadcn.com/avatars/shadcn.jpg"/>
    </template>
  </t-head-menu>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'
import {usePageTitleStore} from "@/stores/pageTitleStore.ts";
</script>