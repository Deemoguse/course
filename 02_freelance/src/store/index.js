import { createStore } from 'vuex'
import router from '../router/'

export default createStore({
  state () {
    return {
      staticData: {
        routerLinks: router.options.routes.filter(link => link.visible),
        statusList: [
          { alias: 'pending', title: 'В очереди', class: 'pending' },
          { alias: 'active', title: 'В работе', class: 'active' },
          { alias: 'done', title: 'Выполненно', class: 'done' },
          { alias: 'cancelled', title: 'Отмененно', class: 'cancelled' }
        ]
      },
      tasks: [
        { id: 0, status: 'pending', title: 'First task', description: 'Lorem', deadline: '01.12.2021' }
      ]
    }
  },

  mutations: {
    createTask (state, payload) {
      state.tasks.unshift({
        id: Date.now(),
        status: 'pending',
        title: payload.title,
        description: payload.description,
        deadline: payload.deadline
      })
    }
  }

})
