<template>
  <t-head-menu>
    <t-button variant="text" @click="()=>useAsideCollapsedStore().reverse()">
      <template #icon>
        <t-icon v-if="useAsideCollapsedStore().asideCollapsed" name="menu-fold"/>
        <t-icon v-else name="menu-unfold"/>
      </template>
    </t-button>
    <span class="font-bold text-xl m-2">
      {{ usePageTitleStore().pageTitle }}
    </span>
    <t-input class="!w-56 !ml-auto mr-4" readonly default-value="搜索菜单">
      <template #suffixIcon>
        <t-icon name="search"/>
      </template>
    </t-input>
    <template #operations>
      <div class="flex flex-row items-center mr-[var(--td-comp-margin-xxl)] gap-2">
        <t-button class="!p-2" variant="text">
          <template #icon>
            <t-icon name="notification"/>
          </template>
        </t-button>
        <t-button class="!p-2" variant="text">
          <t-avatar class="" size="small" shape="circle"
                    image="https://ui.shadcn.com/avatars/shadcn.jpg"/>
        </t-button>
      </div>
    </template>
  </t-head-menu>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'
import {usePageTitleStore} from "@/stores/pageTitleStore.ts";
</script>