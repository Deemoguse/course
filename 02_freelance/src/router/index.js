import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../views/PageMain.vue'
import PageTask from '../views/PageTask.vue'
import PageCreateTask from '../views/PageCreateTask.vue'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: PageMain,
    visible: true
  },
  {
    path: '/createtask',
    name: 'Новая задача',
    component: PageCreateTask,
    visible: true
  },
  {
    path: '/task/:id?',
    component: PageTask
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
