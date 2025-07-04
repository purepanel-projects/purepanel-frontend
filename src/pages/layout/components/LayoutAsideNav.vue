<template>
  <t-menu :value="activeMenu"
          :collapsed="useAsideCollapsedStore().asideCollapsed"
          @change="handleMenuChange" :expandMutex="true">
    <template #logo>
      <img v-if="useAsideCollapsedStore().asideCollapsed" class="w-8" src="@/assets/logo-bg.png" alt="logo">
      <img v-else class="!ml-0 w-50" src="@/assets/logo-h.png" alt="logo">
    </template>
    <!--遍历菜单树-->
    <template v-for="menu in menuTree" :key="menu.id">
      <!--类型为菜单组-->
      <t-menu-group v-if="menu.type === '2'" :title="menu.title">
        <template v-for="menuSub in menu.children" :key="menuSub.id">
          <t-menu-item v-if="menuSub.children.length === 0" :value="menuSub.id" :router-link="true"
                       :to="menuSub.path">
            <template #icon>
              <t-icon :name="menuSub.icon"/>
              <template v-if="useAsideCollapsedStore().asideCollapsed">
                &nbsp;
              </template>
            </template>
            {{ menuSub.title }}
          </t-menu-item>
          <t-submenu v-else :title="menuSub.title" :value="menuSub.id">
            <template #icon>
              <t-icon :name="menuSub.icon"/>
              <template v-if="useAsideCollapsedStore().asideCollapsed">
                &nbsp;
              </template>
            </template>
            <t-menu-item v-for="menuItem in menuSub.children" :key="menuItem.id" :router-link="true"
                         :value="menuItem.id"
                         :to="menuItem.path">
              <template #icon>
                <t-icon :name="menuItem.icon"/>
              </template>
              <template v-if="useAsideCollapsedStore().asideCollapsed">
                &nbsp;
              </template>
              {{ menuItem.title }}
            </t-menu-item>
          </t-submenu>
        </template>
      </t-menu-group>
      <!--菜单子节点不为空-->
      <t-submenu v-else-if="menu.children.length > 0" :title="menu.title"
                 :value="menu.id">
        <template #icon>
          <t-icon :name="menu.icon"/>
        </template>
        <t-menu-item v-for="menuItem in menu.children" :key="menuItem.id" :router-link="true" :value="menuItem.id"
                     :to="menuItem.path">
          <template #icon>
            <t-icon :name="menuItem.icon"/>
            <template v-if="useAsideCollapsedStore().asideCollapsed">
              &nbsp;
            </template>
          </template>
          {{ menuItem.title }}
        </t-menu-item>
      </t-submenu>
      <!--菜单子节点为空-->
      <t-menu-item v-else :value="menu.id" :router-link="true"
                   :to="menu.path">
        <template #icon>
          <t-icon :name="menu.icon"/>
          <template v-if="useAsideCollapsedStore().asideCollapsed">
            &nbsp;
          </template>
        </template>
        {{ menu.title }}
      </t-menu-item>
    </template>
    <template #operations>

    </template>
  </t-menu>
</template>
<script setup lang="ts">
import {useAsideCollapsedStore} from "@/stores/asideCollapsedStore.ts";
import {onMounted, ref} from "vue";
import {getLoginUserPermissionApi} from "@/api/permissionApi.ts";
import type {SysPermissionTreeListRes} from "@/type/SysPermission.ts";
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
      activeMenu.value = menuTreeRes[0].id ?? '';
      usePageTitleStore().update(menuTreeRes[0].title)
    }
    useBtnPermissionStore().update(res.payload.btnList)
  })
}

function handleMenuChange(value: string) {
  activeMenu.value = value
}
</script>