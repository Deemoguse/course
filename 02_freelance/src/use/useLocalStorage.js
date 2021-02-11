import store from '../store'

export function useLocalStorage () {
  if (localStorage.tasksStore) {
    localStorage.tasksStore = JSON.stringify({
      tasksList: store.state.tasks,
      archiveList: store.state.archive
    })
  } else {
    localStorage.setItem('tasksStore', JSON.stringify({
      tasksList: store.state.tasks,
      archiveList: store.state.archive
    }))
  }
}
