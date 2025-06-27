<template>
  <div class="h-full">
    <t-button @click="addDialogVisible=true">
      新建
    </t-button>
    <add-level-one-dialog :on-close="()=>addDialogVisible=false" :dialog-visible="addDialogVisible"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import AddLevelOneDialog from "@/pages/system/permission/components/AddLevelOneDialog.vue";

const addDialogVisible = ref(false);
</script>