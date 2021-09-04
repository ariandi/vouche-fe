import Vue from 'vue'
import VueRouter from 'vue-router'

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
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
