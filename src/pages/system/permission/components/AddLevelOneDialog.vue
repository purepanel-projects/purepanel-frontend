<template>
  <t-dialog attach="body" :visible="dialogVisible" :close-btn="true" cancel-btn="取消" :on-close="closeDialog">
    <template #header>新建菜单权限</template>
    <template #body>
      <t-form ref="form" :rules="FORM_RULES" :data="formData" :colon="true">
        <t-form-item label="类型" name="type">
          <t-radio-group variant="primary-filled" v-model="formData.type">
            <t-radio-button value="0">一级菜单</t-radio-button>
            <t-radio-button value="2">菜单组</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import type {DialogProps, FormProps} from "tdesign-vue-next";
import {reactive} from "vue";

interface Props {
  dialogVisible: Boolean;
  onClose: () => void;
}

const props = defineProps<Props>()

const closeDialog: DialogProps['onClose'] = () => {
  props.onClose();
};
//定义表单校验规则
const FORM_RULES: FormProps['rules'] = {

}
const formData: FormProps['data'] = reactive({
  type: '1',
});
</script>