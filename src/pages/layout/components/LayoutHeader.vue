<template>
  <div class="fixed w-full z-1 backdrop-blur-md">
    <t-head-menu class="!bg-transparent">
      <template #logo>
        <img class="w-24" src="@/assets/logo-h.png" alt="logo"/>
      </template>
      <t-button variant="text" @click="()=>useAsideCollapsedStore().reverse()">
        <template #icon>
          <t-icon name="view-list"/>
        </template>
      </t-button>
      <template #operations>
        <t-button variant="text">
          <template #icon>
            <t-icon name="mail"/>
          </template>
        </t-button>
      </template>
    </t-head-menu>
  </div>

</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from '@/stores/asideCollapsedStore.ts'
</script>