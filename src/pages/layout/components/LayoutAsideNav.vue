<template>
  <t-menu :value="activeMenu" :collapsed="useAsideCollapsedStore().asideCollapsed"
          @change="handleMenuChange" :expandMutex="true">
    <template #logo>
      <img class="w-28" src="@/assets/logo-h.png" alt="logo">
    </template>
    <template v-for="menu in menuTree">
      <template v-if="menu.children.length===0">
        <t-menu-item :value="menu.id" :router-link="true" :to="menu.path">
          <template #icon>
            <t-icon :name="menu.icon"/>
          </template>
          {{ menu.title }}
        </t-menu-item>
      </template>
      <template v-else>
        <t-menu-group title="系统管理">
          <t-menu-item value="item2" :router-link="true" to="/user">
            <template #icon>
              <t-icon name="usergroup"/>
            </template>
            用户管理
          </t-menu-item>
        </t-menu-group>
      </template>
    </template>
    <template #operations>

    </template>
  </t-menu>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from "@/stores/asideCollapsedStore.ts";
import {onMounted, ref} from "vue";
import {getLoginUserPermissionApi} from "@/api/permission.ts";
import type {SysPermissionTreeListRes} from "@/type/GetUserPermissionRes.ts";
import {useBtnPermissionStore} from "@/stores/btnPermissionStore.ts";
import {usePageTitleStore} from "@/stores/pageTitleStore.ts";

const activeMenu = ref('')
const menuTree = ref<SysPermissionTreeListRes[]>([])

onMounted(() => {
  getLoginUserPermission()
})

function getLoginUserPermission() {
  getLoginUserPermissionApi().then((res) => {
    const menuTreeRes = res.payload.menuTree;
    menuTree.value = menuTreeRes;
    if (menuTreeRes.length > 0) {
      activeMenu.value = menuTreeRes[0].id
      usePageTitleStore().update(menuTreeRes[0].title)
    }
    useBtnPermissionStore().update(res.payload.btnList)
  })
}

function handleMenuChange(value: string) {
  activeMenu.value = value
}
</script>