import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      staticData: {
        statusList: [
          { alias: 'pending', title: 'В очереди' },
          { alias: 'active', title: 'В работе' },
          { alias: 'done', title: 'Выполненно' },
          { alias: 'cancelled', title: 'Отмененно' },
          { alias: 'archive', title: 'Архивировано' }
        ]
      },
      tasks: [],
      archive: []
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
    },
    taskChangeStatus (state, payload) {
      state.tasks.find(obj => obj.id === payload.id).status = payload.status
    },
    taskToArchive (state, payload) {
      state.tasks.unshift(state.tasks.splice(state.tasks.indexOf(obj => obj.id === payload)))
    }
  }

})
