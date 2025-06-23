<template>
  <t-menu theme="global" :value="activeMenu" :collapsed="useAsideCollapsedStore().asideCollapsed"
          @change="handleMenuChange" :expandMutex="true">
    <template #logo>
      <img class="w-28" src="@/assets/logo-h.png" alt="logo">
    </template>
    <t-menu-item value="home" :router-link="true" to="/home">
      <template #icon>
        <t-icon name="home"/>
      </template>
      首页
    </t-menu-item>
    <t-menu-group title="系统管理">
      <t-menu-item value="item2" :router-link="true" to="/user">
        <template #icon>
          <t-icon name="usergroup"/>
        </template>
        用户管理
      </t-menu-item>
    </t-menu-group>
    <template #operations>

    </template>
  </t-menu>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from "@/stores/asideCollapsedStore.ts";
import {ref} from "vue";

const activeMenu = ref('home')

function handleMenuChange(value: string) {
  activeMenu.value = value
}
</script>