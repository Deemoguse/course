<template lang="pug">

//- main wrapper
.main-wrapper.pb-4

  //- header
  the-header

  //- body
  router-view.viewbox

//-  end line
</template>

<script>
import { useStore } from 'vuex'
import TheHeader from './components/TheHeader'

export default {
  components: { TheHeader },
  setup () {
    const store = useStore()

    if (localStorage.tasksStore) {
      const tasksStore = JSON.parse(localStorage.tasksStore)
      store.state.tasks = tasksStore.tasksList
      store.state.archive = tasksStore.archiveList
    }
  }
}
</script>

<style lang="scss" scoped>
  .viewbox {
    padding-top: 125px;
  }
</style>
