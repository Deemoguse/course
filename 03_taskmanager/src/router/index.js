import { createRouter, createWebHistory } from 'vue-router'
import PageMain from '../views/PageMain.vue'
import PageTask from '../views/PageTask.vue'
import PageCreateTask from '../views/PageCreateTask.vue'
import PageArchive from '../views/PageArchive.vue'

const routes = [
  {
    path: '/',
    alias: '/tasks',
    name: 'Список задач',
    component: PageMain
  },
  {
    path: '/archive',
    name: 'Архив',
    component: PageArchive
  },
  {
    path: '/createtask',
    name: 'Новая задача',
    component: PageCreateTask
  },
  {
    path: '/task/:id&:archive?',
    component: PageTask,
    props: route => ({
      id: route.query.id,
      archive: route.query.archive
    })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
