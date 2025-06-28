<template>
  <div class="h-full flex flex-col gap-4">
    <t-form layout="inline" class="">
      <t-form-item label-width="0">
        <t-input class="!w-48" placeholder="请输入标题"/>
      </t-form-item>
      <t-form-item label-width="0">
        <t-input class="!w-64" placeholder="请输入访问路径"/>
      </t-form-item>
      <div class="flex flex-row gap-4 ml-auto">
        <t-button type="submit">
          <template #icon>
            <t-icon name="search"/>
          </template>
          查询
        </t-button>
        <t-button @click="add">
          新建
        </t-button>
      </div>
    </t-form>
    <edit-permission :key="addDialogKey" :on-close="()=>addDialogVisible = false" :dialog-visible="addDialogVisible"
                     :on-submit-success="()=> getPermissionData()" :old-data="addInitData"/>
    <edit-permission :key="updateData?.id" :on-close="()=>updateDialogVisible = false"
                     :dialog-visible="updateDialogVisible"
                     :on-submit-success="()=> getPermissionData()" :old-data="updateData"/>
    <t-enhanced-table resizable bordered stripe ref="tableRef" :data="data" row-key="id" :columns="columns"
                      :tree="treeConfig"/>
  </div>
</template>

<script setup lang="tsx">
import {ref, onMounted, reactive, onUpdated} from 'vue';
import EditPermission from "@/pages/system/permission/components/EditPermission.vue";
import {allTreeListApi, deleteApi} from "@/api/permissionApi.ts";
import type {SysPermission, SysPermissionTreeListRes} from "@/type/PermissionRes.ts";
import {
  type DropdownProps,
  type EnhancedTableInstanceFunctions,
  type EnhancedTableProps,
  MessagePlugin
} from "tdesign-vue-next";
import {nanoid} from "nanoid";

const addDialogVisible = ref(false);
const updateData = ref<SysPermission>();
const addInitData = ref<SysPermission>();
const updateDialogVisible = ref(false);
const tableRef = ref<EnhancedTableInstanceFunctions>();
const data = ref<SysPermissionTreeListRes[]>();

onMounted(() => {
  getPermissionData();
})

onUpdated(() => {
  tableRef.value?.expandAll()
})
//定义表格列
const columns: EnhancedTableProps['columns'] = [
  {
    colKey: "title",
    title: "标题",
    align: "center",
  },
  {
    title: "类型",
    align: "center",
    cell: (h, {row}) => (
        <span>
        {
          row.type === 0 ? '菜单' : row.type === 2 ? '菜单组' : '按钮'
        }
      </span>
    )
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
    title: "操作",
    align: "center",
    cell: (h, {row}) => {
      const moreOptions: DropdownProps['options'] = [
        {
          content: '添加下级',
          onClick: () => {
            addDialogKey.value = nanoid(32)
            setTimeout(() => {
              addDialogVisible.value = true;
            }, 1)
            addInitData.value = {
              pid: row.id,
            }
          }
        }
      ]
      return (
          <t-space>
            <t-link theme="primary" onClick={() => {
              updateData.value = {...row, type: row.type.toString()}
              setTimeout(() => {
                updateDialogVisible.value = true
              }, 1)
            }}>编辑
            </t-link>
            <t-popconfirm content={"确认删除吗"} onConfirm={() => deleteById(row.id)}>
              <t-link theme="danger">删除</t-link>
            </t-popconfirm>
            <t-dropdown options={moreOptions} trigger='click'>
              <t-link theme="default">更多操作</t-link>
            </t-dropdown>
          </t-space>
      )
    },
  }
]
//表配置
const treeConfig: EnhancedTableProps['tree'] = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
  indent: 40,
  expandTreeNodeOnClick: false,
  //Tdesgin 有BUG，这个配置不生效
  defaultExpandAll: true,
});

//获取表格数据
async function getPermissionData() {
  const res = await allTreeListApi()
  data.value = res.payload;
}

//删除
function deleteById(id: string) {
  deleteApi(id).then(res => {
    MessagePlugin.success('删除成功');
    getPermissionData();
  })
}

const addDialogKey = ref(nanoid(32));

function add() {
  addDialogKey.value = nanoid(32)
  setTimeout(() => {
    addDialogVisible.value = true;
  }, 1)
}
</script>