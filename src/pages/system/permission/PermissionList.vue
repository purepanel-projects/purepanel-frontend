<template>
  <div class="h-full">
    <t-form layout="inline" class="">
      <t-form-item label-width="0">
        <t-input class="!w-48" placeholder="请输入标题"/>
      </t-form-item>
      <t-form-item label-width="0">
        <t-input class="!w-64" placeholder="请输入访问路径"/>
      </t-form-item>
      <t-button @click="addDialogVisible=true">
        新增
      </t-button>
    </t-form>
    <edit-level-one-dialog :on-close="()=>addDialogVisible=false" :dialog-visible="addDialogVisible"/>
    <t-enhanced-table
        class="!mt-4"
        resizable
        bordered
        stripe
        :data="data"
        row-key="id"
        :columns="columns"
        :tree="treeConfig"
    />
  </div>
</template>

<script setup lang="tsx">
import {ref, onMounted, reactive} from 'vue';
import EditLevelOneDialog from "@/pages/system/permission/components/EditLevelOneDialog.vue";
import {allTreeListApi} from "@/api/permissionApi.ts";
import type {SysPermissionTreeListRes} from "@/type/PermissionRes.ts";
import {EnhancedTable, type EnhancedTableProps} from "tdesign-vue-next";

const addDialogVisible = ref(false);

const data = ref<SysPermissionTreeListRes[]>();

onMounted(() => {
  getPermissionData();
})

const columns: EnhancedTableProps['columns'] = [
  {
    colKey: "title",
    title: "标题",
    align: "center",
  },
  {
    colKey: "type",
    title: "类型",
    align: "center",
  },
  {
    colKey: "path",
    title: "访问路径",
    align: "center",
  },
  {
    colKey: "orderNo",
    title: "序号",
    align: "center",
  },
  {
    colKey: "authCode",
    title: "授权编码",
    align: "center",
  },
  {
    colKey: "link",
    title: "操作",
    align: "center",
    cell: (h, {row}) => (
        <t-space>
          <t-link theme="primary">添加下级</t-link>
          <t-link theme="danger">删除</t-link>
        </t-space>
    ),
  }
]
const treeConfig: EnhancedTableProps['tree'] = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
  indent: 50,
  expandTreeNodeOnClick: false,
});

function getPermissionData(): SysPermissionTreeListRes[] {
  allTreeListApi().then(res => {
    data.value = res.payload;
  })
}
</script>