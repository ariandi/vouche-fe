import Vue from 'vue'
import VueRouter from 'vue-router'
import { initialize } from '@/store/helpers/general'
import store from '@/store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/login/Login'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/chat-room',
    name: 'ChatRoom',
    component: () => import('../pages/chat-room/ChatRoom'),
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

initialize(store, router)

export default router
