<template>
  <t-drawer destroy-on-close :visible="true" @close="()=>{}"
            header="选择权限"
            size="medium"
            :close-btn="true">
    <t-tree
        ref="tree"
        :data="permissionTree"
        :keys="{value:'id',label:'title'}"
        v-model="checkedPermission"
        line
        checkable
        hover
        expand-all
        value-mode="all"
        @change="()=>{console.log(checkedPermission)}"
    />
  </t-drawer>
</template>
<script lang="ts" setup>
import {getLoginUserPermissionApi} from "@/api/permissionApi.ts";
import {onMounted, ref} from "vue";
import type {SysPermissionTreeListRes} from "@/types/SysPermission.ts";

onMounted(() => {
  getPermissionTree()
})

//权限树
const permissionTree = ref<SysPermissionTreeListRes[]>()
//已选择的权限树
const checkedPermission = ref([]);

//获取权限树
function getPermissionTree() {
  getLoginUserPermissionApi().then(res => {
    permissionTree.value = res.payload.permissionTree
  })
}
</script>