<template>
  <t-form ref="form" :rules="FORM_RULES" :data="formData" @submit="onSubmit">
    <t-dialog :visible="dialogVisible" :close-btn="true" :on-close="closeDialog">
      <template #header>填写菜单权限信息</template>
      <template #body>
        <t-form-item label="标题" name="title">
          <t-input v-model="formData.title" placeholder="请输入标题"/>
        </t-form-item>
        <t-form-item label="类型" name="type">
          <t-radio-group variant="primary-filled" v-model="formData.type" @change="handleTypeChange">
            <t-radio-button value="0">菜单</t-radio-button>
            <t-radio-button value="1">按钮</t-radio-button>
            <t-radio-button value="2">菜单组</t-radio-button>
          </t-radio-group>
        </t-form-item>
        <t-form-item v-if="formData.type==='0'||formData.type==='1'" label="父级" name="pid">
          <t-tree-select
              v-model="formData.pid"
              :data="parentOptions"
              clearable
              filterable
              placeholder="请选择父级"
              :tree-props="parentOptionsTreeProps"
          />
        </t-form-item>
        <t-form-item label="访问路径" name="path">
          <t-input v-model="formData.path" placeholder="请输入访问路径"/>
        </t-form-item>
        <t-form-item label="排序" name="path">
          <t-input-number v-model="formData.orderNo"/>
        </t-form-item>
        <t-form-item label="隐藏" name="isHidden">
          <t-switch v-model="formData.isHidden"/>
        </t-form-item>
        <t-form-item label="默认展开" name="expanded">
          <t-switch v-model="formData.expanded"/>
        </t-form-item>
      </template>
      <template #footer>
        <t-button theme="primary" type="submit">保存</t-button>
      </template>
    </t-dialog>
  </t-form>
</template>
<script setup lang="ts">
import {type DialogProps, type FormProps, MessagePlugin, type TreeSelectProps} from "tdesign-vue-next";
import {onMounted, reactive, ref} from "vue";
import {addOrUpdateApi, allTreeListApi} from "@/api/permissionApi.ts";
import type {SysPermission, SysPermissionTreeListRes} from "@/type/PermissionRes.ts";

const parentOptions = ref<SysPermissionTreeListRes[]>([])

onMounted(() => {
  allTreeListApi().then(res => {
    if (res.status === 200) {
      parentOptions.value = res.payload
    }
  })
})
const parentOptionsTreeProps: TreeSelectProps['treeProps'] = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};

//定义接收的参数
interface Props {
  dialogVisible: Boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  oldData?: SysPermission;
}

const props = defineProps<Props>()
//关闭弹窗
const closeDialog: DialogProps['onClose'] = () => {
  props.onClose();
};

//定义表单校验规则
const FORM_RULES: FormProps['rules'] = {
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    },
  ],
}
//定义表单数据
const formData: FormProps['data'] = reactive({
  type: props.oldData?.type ?? '0',
  title: props.oldData?.title ?? '',
  path: props.oldData?.path ?? '',
  orderNo: props.oldData?.orderNo ?? 0,
  isHidden: props.oldData?.isHidden ?? false,
  expanded: props.oldData?.expanded ?? false,
  id: props.oldData?.id ?? '',
  pid: props.oldData?.pid ?? '',
});
//定义表单提交事件
const onSubmit: FormProps['onSubmit'] = async ({validateResult}) => {
  if (validateResult !== true) {
    return;
  }
  const data: SysPermission = {
    type: Number.parseInt(formData?.type),
    path: formData?.path,
    title: formData?.title,
    orderNo: formData?.orderNo,
    isHidden: formData?.isHidden,
    expanded: formData?.expanded,
    id: formData?.id,
    pid: formData?.pid,
  }
  const res = await addOrUpdateApi(data)
  if (res.status === 200) {
    await MessagePlugin.success('保存成功')
    props.onClose();
    props.onSubmitSuccess()
  }
};

function handleTypeChange(value: string) {
  if (value === '2') {
    formData.pid = undefined
  }
}
</script>