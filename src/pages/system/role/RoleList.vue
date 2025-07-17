<template>
  <page-box>
    <t-form @reset="resetSearchFormData" @submit="getRolePageList" layout="inline">
      <t-form-item label-width="0">
        <t-input clearable v-model="searchFormData.name" placeholder="按名称模糊查询"/>
      </t-form-item>
    </t-form>
    <t-enhanced-table table-layout="auto"
                      bordered
                      stripe
                      :pagination="pagination"
                      @page-change="onPageChange"
                      ref="tableRef"
                      size="small"
                      :data="data"
                      row-key="id"
                      :columns="columns"/>
  </page-box>
</template>
<script setup lang="ts">
import PageBox from "@/components/PageBox.vue";
import {onMounted, ref} from "vue";
import {rolePageListApi} from "@/api/roleApi.ts";
import type {SysRole} from "@/types/SysRole.ts";
import type {EnhancedTableProps, TableProps} from "tdesign-vue-next";

onMounted(() => {
  getRolePageList()
})

//查询表单数据
const searchFormData = ref<{
  name?: string,
}>({})

//重置查询表单数据
function resetSearchFormData() {
  searchFormData.value = {}
  getRolePageList()
}

//表格数据定义
const data = ref<SysRole[]>();
//定义表格列
const columns: EnhancedTableProps<SysRole>['columns'] = [
  {
    colKey: "name",
    title: "名称",
  },
  {
    colKey: "createTime",
    title: "创建时间",
  }
  ,
  {
    colKey: "updateTime",
    title: "更新时间",
  }
]

//分页对象
const pagination = ref<TableProps['pagination']>({
  pageSize: 10,
  total: 0,
  current: 1,
  showJumper: true,
});

//分页变化事件
const onPageChange: TableProps['onPageChange'] = (pageInfo) => {
  pagination.value!.current = pageInfo.current;
  pagination.value!.pageSize = pageInfo.pageSize;
  getRolePageList();
};

//获取表格数据
function getRolePageList() {
  rolePageListApi({
    name: searchFormData.value.name,
    current: pagination.value!.current!,
    size: pagination.value!.pageSize!,
  }).then(res => {
    data.value = res.payload.records
    pagination.value!.total = res.payload.total
  })
}
</script>