import 'tdesign-vue-next/es/style/index.css';
import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import TDesign from 'tdesign-vue-next';
import TDesignChat from '@tdesign-vue-next/chat';

import App from './App.vue'
import router from './router'
import authDirective from "@/directives/authDirective.ts";

const app = createApp(App)
app.directive('auth', authDirective)
app.use(createPinia())
app.use(router)
app.use(TDesign).use(TDesignChat);
app.mount('#app')
