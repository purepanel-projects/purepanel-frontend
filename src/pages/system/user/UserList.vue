<template>
  <page-card>
    <t-form @reset="resetSearchFormData" @submit="getUserPageList" layout="inline">
      <t-form-item label-width="0">
        <t-input clearable v-model="searchFormData.name" placeholder="按名称模糊查询"/>
      </t-form-item>
      <t-form-item label-width="0" name="path">
        <t-input clearable v-model="searchFormData.account" placeholder="按账号模糊查询"/>
      </t-form-item>
      <div class="flex flex-row gap-4">
        <t-button type="submit">
          查询
        </t-button>
        <t-button variant="outline" type="reset">
          重置
        </t-button>
      </div>
      <div class="flex flex-row gap-4 ml-auto">
        <t-button>
          新建
        </t-button>
      </div>
    </t-form>
    <t-enhanced-table resizable bordered stripe ref="tableRef" size="small" :data="data" row-key="id"
                      :columns="columns"/>
  </page-card>
</template>
<script setup lang="tsx">
import PageCard from "@/components/PageCard.vue";
import {onMounted, ref} from "vue";
import {userPageListApi} from "@/api/userApi.ts";
import type {SysUser} from "@/types/SysUser.ts";
import type {DropdownProps, EnhancedTableProps} from "tdesign-vue-next";

const data = ref<SysUser[]>();
//查询表单数据
const searchFormData = ref<{
  name?: string,
  account?: string,
}>({})

onMounted(() => {
  getUserPageList()
})

//重置查询表单数据
function resetSearchFormData() {
  searchFormData.value = {}

}

//定义表格列
const columns: EnhancedTableProps['columns'] = [
  {
    colKey: "id",
    title: "ID",
  },
  {
    colKey: "name",
    title: "名称",
  },
  {
    colKey: "account",
    title: "账号",
  },
  {
    colKey: "phoneNumber",
    title: "联系电话",
  },
  {
    colKey: "email",
    title: "邮箱",
  },
  {
    colKey: "status",
    title: "状态",
    cell: (h, {row}) => {
      if (row.status === 1) {
        return <t-tag theme="success">正常</t-tag>
      } else {
        return <t-tag theme="danger">禁用</t-tag>
      }
    }
  },
  {
    colKey: "createTime",
    title: "创建时间",
  },
  {
    colKey: "link",
    title: "操作",
    align: "center",
    cell: (h, {row}) => {
      const moreOptions: DropdownProps['options'] = [
        {
          content: '重置密码',
          onClick: () => {

          }
        },
        {
          content: () => {
            return (
                <t-popconfirm content={"确定禁用吗？"}>
                  <div>禁用</div>
                </t-popconfirm>
            )
          }
        },
        {
          content: () => {
            return (
                <t-popconfirm content={"确定删除吗？"}>
                  <div class="text-[var(--td-error-color)]">删除</div>
                </t-popconfirm>
            )
          }
        },
      ]
      return (<t-space>
        <t-link theme="primary" onClick={() => {

        }}>编辑
        </t-link>
        <t-dropdown hideAfterItemClick={false} options={moreOptions}>
          <t-link theme="primary">
            更多
            <t-icon name="chevron-down-s"/>
          </t-link>
        </t-dropdown>
      </t-space>)
    }
  }
]

//获取表格数据
function getUserPageList() {
  userPageListApi({
    current: 1,
    size: 10,
    name: searchFormData.value.name,
    account: searchFormData.value.account,
  }).then(res => {
    data.value = res.payload.records
  })
}
</script>