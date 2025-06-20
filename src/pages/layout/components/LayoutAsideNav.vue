<template>
  <div class="h-screen max-w-min pl-4 py-4">
    <div class="bg-[var(--td-bg-color-page)] h-full rounded-xl">
      <t-menu class="!bg-transparent" value="item1" :collapsed="useAsideCollapsedStore().asideCollapsed">
        <template #logo>
          <img class="w-28" src="@/assets/logo-h.png" alt="logo">
        </template>
        <t-menu-group title="系统管理">
          <t-menu-item value="item1" :router-link="true" to="/user">
            <template #icon>
              <t-icon name="usergroup"/>
            </template>
            用户管理
          </t-menu-item>
        </t-menu-group>
        <template #operations>

        </template>
      </t-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from "@/stores/asideCollapsedStore.ts";
</script>