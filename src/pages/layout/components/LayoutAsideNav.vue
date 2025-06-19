<template>
  <div class="h-screen">
    <t-menu theme="system" value="item1" :collapsed="useAsideCollapsedStore().asideCollapsed">
      <t-menu-group class="mt-[var(--td-comp-size-xxxl)]" title="主导航">
        <t-menu-item value="item1" :router-link="true" to="/user">
          <template #icon>
            <t-icon name="app"/>
          </template>
          用户管理
        </t-menu-item>
      </t-menu-group>
      <template #operations>

      </template>
    </t-menu>
  </div>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'

</script>