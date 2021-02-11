import { createStore } from 'vuex'
import { useLocalStorage } from '../use/useLocalStorage'

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
      searhBy: 'all',
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
      useLocalStorage()
    },
    taskChangeStatus (state, payload) {
      state.tasks.find(obj => obj.id === payload.id).status = payload.status
      useLocalStorage()
    },
    taskToArchive (state, payload) {
      const id = state.tasks.indexOf(obj => obj.id === payload)
      const obj = state.tasks.splice(id)
      state.archive.push({ ...obj[0] })
      useLocalStorage()
    },
    taskToTasks (state, payload) {
      const id = state.archive.indexOf(obj => obj.id === payload)
      const obj = state.archive.splice(id)
      state.tasks.unshift({ ...obj[0] })
      useLocalStorage()
    },
    removeTask (state, payload) {
      const id = state.archive.indexOf(obj => obj.id === payload)
      state.archive.splice(id)
      useLocalStorage()
    }
  }

})
