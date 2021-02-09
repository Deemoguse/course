<template lang="pug">

.container
  template(v-if="tasks.length")
    app-task-card(
      v-for="task in tasks" :key="task.id"
      :task-data="task"
    )

  h2(v-else).alert Список задач пуст

//- end line
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppTaskCard from '../components/AppTaskCard'

export default {
  setup () {
    const searchByStatus = ref('all')
    const tasks = computed(() => {
      return searchByStatus.value === 'all'
        ? useStore().state.tasks
        : useStore().state.tasks.filter(tasks => tasks.status === searchByStatus.value)
    })

    const changeSearchByStatus = value => {
      searchByStatus.value = value
    }

    return { tasks, changeSearchByStatus }
  },
  components: {
    AppTaskCard
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
