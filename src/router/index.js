import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/present',
    name: 'Presentation',
    component: () => import('@/views/Presentation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
