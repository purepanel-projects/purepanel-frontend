<template>
  <t-menu :value="activeMenu" :collapsed="useAsideCollapsedStore().asideCollapsed"
          @change="handleMenuChange" :expandMutex="true">
    <template #logo>
      <img class="w-28" src="@/assets/logo-h.png" alt="logo">
    </template>
    <template v-for="menu in menuTree">
      <t-menu-item v-if="menu.children.length === 0 && menu.menuLevel === 2" :value="menu.id" :router-link="true"
                   :to="menu.path">
        <template #icon>
          <t-icon :name="menu.icon"/>
        </template>
        {{ menu.title }}
      </t-menu-item>
      <t-submenu v-else-if="menu.children.length > 0 && menu.menuLevel === 2" :title="menu.title"
                 :value="menu.id">
        <template #icon>
          <t-icon :name="menu.icon"/>
        </template>
        <t-menu-item v-for="menuItem in menu.children" :router-link="true"
                     :to="menuItem.path">
          <template #icon>
            <t-icon :name="menuItem.icon"/>
          </template>
          {{ menuItem.title }}
        </t-menu-item>
      </t-submenu>
      <template v-else>
        <t-menu-group :title="menu.title">
          <template v-for="menuSub in menu.children">
            <t-menu-item v-if="menuSub.children.length === 0" :value="menuSub.id" :router-link="true"
                         :to="menuSub.path">
              <template #icon>
                <t-icon :name="menuSub.icon"/>
              </template>
              {{ menuSub.title }}
            </t-menu-item>
            <t-submenu v-else :title="menuSub.title" :value="menuSub.id">
              <template #icon>
                <t-icon :name="menuSub.icon"/>
              </template>
              <t-menu-item v-for="menuItem in menuSub.children" :router-link="true"
                           :to="menuItem.path">
                <template #icon>
                  <t-icon :name="menuItem.icon"/>
                </template>
                {{ menuItem.title }}
              </t-menu-item>
            </t-submenu>
          </template>
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