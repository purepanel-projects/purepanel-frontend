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
              :data="allTreeList"
              clearable
              filterable
              placeholder="请选择父级"
              :tree-props="parentOptionsTreeProps"
          />
        </t-form-item>
        <t-form-item v-if="formData.type==='0'||formData.type==='1'" label="访问路径" name="path">
          <t-input v-model="formData.path" placeholder="请输入访问路径"/>
        </t-form-item>
        <t-form-item label="排序" name="path">
          <t-input-number v-model="formData.orderNo"/>
        </t-form-item>
        <t-form-item v-if="formData.type==='0'||formData.type==='1'" label="图标" name="icon">
          <t-select
              v-model="formData.icon"
              placeholder="请选择"
              :popup-props="{ overlayInnerStyle: { width: '360px' } }">
            <t-option v-for="item in iconOptions" :key="item.stem" :value="item.stem" class="!inline-block !text-2xl">
              <div>
                <t-icon :name="item.stem"/>
              </div>
            </t-option>
            <template #valueDisplay>
              <t-icon :name="formData.icon" class="mr-2"/>
              {{ formData.icon }}
            </template>
          </t-select>
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
import {reactive, ref, watch} from "vue";
import {addOrUpdateApi} from "@/api/permissionApi.ts";
import type {SysPermission, SysPermissionTreeListRes} from "@/type/PermissionRes.ts";
import {manifest} from 'tdesign-icons-vue-next';

// 获取全部图标的列表
const iconOptions = ref(manifest);

const parentOptionsTreeProps: TreeSelectProps['treeProps'] = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};

//定义接收的参数
interface Props {
  allTreeList: SysPermissionTreeListRes[] | undefined;
  dialogVisible: Boolean;
  oldData?: SysPermission | null;
}

const props = defineProps<Props>()

watch(() => props.oldData, () => {
  if (props.oldData) {
    // 编辑模式
    formData = reactive({...props.oldData})
  } else {
    // 新增模式
    formData = reactive<SysPermission>({
      type: '0',
      orderNo: 0,
      isHidden: false,
      expanded: false,
    });
  }
})
//定义事件
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: Boolean): void;
  (e: 'submit-success'): void;
}>()

//关闭弹窗
const closeDialog: DialogProps['onClose'] = () => {
  emit('update:dialogVisible', false)
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
let formData = reactive<SysPermission>({});
//定义表单提交事件
const onSubmit: FormProps['onSubmit'] = async ({validateResult}) => {
  if (validateResult !== true) {
    return;
  }
  const data: SysPermission = {
    type: formData.type,
    path: formData.path,
    title: formData.title,
    orderNo: formData.orderNo,
    isHidden: formData.isHidden,
    expanded: formData.expanded,
    id: formData.id,
    pid: formData.pid,
    version: formData.version,
    icon: formData.icon,
  }
  const res = await addOrUpdateApi(data)
  if (res.status === 200) {
    await MessagePlugin.success('保存成功')
    emit('update:dialogVisible', false)
    emit('submit-success')
  }
};

function handleTypeChange(value: string) {
  if (value === '2') {
    formData.pid = undefined
    formData.path = undefined
    formData.icon = undefined
  }
}
</script>