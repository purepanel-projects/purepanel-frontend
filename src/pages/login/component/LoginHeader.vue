<template>
  <div class="h-14 absolute top-0 w-full backdrop-blur-md
    flex flex-row items-center px-6">
    <img class="w-24" src="@/assets/logo-h.png" alt="logo">
    <div class="ml-auto">
      <a target="_blank" href="https://github.com/purepanel-projects">
        <t-button variant="text">
          <template #icon>
            <logo-github-icon/>
          </template>
        </t-button>
      </a>
      <a target="_blank" href="https://github.com/purepanel-projects">
        <t-button variant="text">
          <template #icon>
            <help-circle-icon/>
          </template>
        </t-button>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import {LogoGithubIcon, HelpCircleIcon} from "tdesign-icons-vue-next";
</script>