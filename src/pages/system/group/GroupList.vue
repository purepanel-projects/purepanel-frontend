<template>
  <div class="h-full flex flex-col gap-4 p-6">
    <t-form @reset="resetSearchFormData" @submit="getGroupTreeList" layout="inline">
      <t-form-item label-width="0">
        <t-input clearable v-model="searchFormData.name" placeholder="按名称模糊查询"/>
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
          新增
        </t-button>
      </div>
    </t-form>
    <t-enhanced-table table-layout="auto"
                      bordered stripe
                      ref="tableRef"
                      size="small"
                      :data="data"
                      row-key="id"
                      :columns="columns"
                      :tree="treeConfig"/>
  </div>
</template>

<script setup lang="tsx">
import {onMounted, onUpdated, reactive, ref} from "vue";
import {groupAllTreeListApi} from "@/api/groupApi.ts";
import type {DropdownProps, EnhancedTableInstanceFunctions, EnhancedTableProps} from "tdesign-vue-next";
import type {SysGroupTreeListRes} from "@/types/SysGroup.ts";

const tableRef = ref<EnhancedTableInstanceFunctions>();

onMounted(() => {
  getGroupTreeList()
})

onUpdated(() => {
  tableRef.value!.expandAll()
})

//查询表单数据
const searchFormData = ref<{
  name?: string,
}>({})

//重置查询表单数据
function resetSearchFormData() {
  searchFormData.value = {}
}

//定义表格列
const columns: EnhancedTableProps['columns'] = [
  {
    colKey: "name",
    title: "名称",
  },
  {
    colKey: "orderNo",
    title: "序号",
  },
  {
    colKey: "createTime",
    title: "创建时间",
  },
  {
    colKey: "updateTime",
    title: "更新时间",
  },
  {
    colKey: "link",
    title: "操作",
    align: "center",
    cell: (h, {row}) => {
      const moreOptions: DropdownProps['options'] = [
        {
          content: '添加下级',
          onClick: () => {

          }
        }, {
          content: () => {
            return (
                <t-popconfirm content={"如存在下级，也将一并删除。确定删除吗？"}>
                  <div class="text-[var(--td-error-color)]">删除</div>
                </t-popconfirm>
            )
          }
        }
      ]
      return (
          <t-space>
            <t-link theme="primary" onClick={() => {

            }}>编辑
            </t-link>
            <t-dropdown hideAfterItemClick={false} options={moreOptions}>
              <t-link theme="primary">
                更多
                <t-icon name="chevron-down-s"/>
              </t-link>
            </t-dropdown>
          </t-space>
      )
    }
  }
]
//定义表格数据
const data = ref<SysGroupTreeListRes[]>();

//获取表格数据
async function getGroupTreeList() {
  const res = await groupAllTreeListApi(searchFormData.value)
  data.value = res.payload;
}

//表配置
const treeConfig: EnhancedTableProps['tree'] = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
  indent: 40,
  expandTreeNodeOnClick: false,
  //Tdesgin 有BUG，这个配置不生效
  defaultExpandAll: true,
});

</script>