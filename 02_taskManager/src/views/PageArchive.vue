<template lang="pug">

.container

  the-filter-tasks(v-if="$store.state.archive.length" v-model="searchByStatus")

  template(v-if="tasks.length")
    app-task-card(
      v-for="task in tasks" :key="task.id"
      :task-data="task"
    )

  h2(v-else).alert Архив пуст

//- end line
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppTaskCard from '../components/AppTaskCard'
import TheFilterTasks from '../components/TheFilterTasks'

export default {
  setup () {
    const store = useStore()

    const searchByStatus = ref('all')
    const tasks = computed(() => {
      return searchByStatus.value === 'all'
        ? store.state.archive
        : store.state.archive.filter(tasks => tasks.status === searchByStatus.value)
    })

    return { tasks, searchByStatus }
  },
  components: {
    AppTaskCard, TheFilterTasks
  }
}
</script>

<style lang="scss" scope>
  .alert {
    width: 100%;

    margin-top: 115px;

    font-style: italic;
    text-align: center;

    opacity: .17;
  }
</style>
