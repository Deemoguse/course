<template lang="pug">

.container
  .card(:class="{ 'card--archive': $route.params.archive}")

    //- header
    .card__header.pb-2.mb-3
      h2.card__title(:class="task.status") {{ task.title }}
        span.inner(v-if="$route.params.archive") (архив)
      app-task-status(:status="task.status")

    //- body
    .card__body.typography.mb-3
      p {{ task.description }}
      p.card__deadline 🥵 Дэдлайн: {{ task.deadline }}

    //- footer
    .card__footer
      //- if url /task/...&true
      template(v-if="$route.params.archive")
        .inner__wrapper
          button.button.card__button(@click="taskToTasks(task.id)") 👼 Вернуть из архива
          button.button.card__button(@click="removeTask(task.id)") 🔥 Удалить

      //- if url /task/...
      template(v-else)
        .inner__wrapper
          button.button.card__button(
            v-for="button in buttons"
            :class="{ 'button--disabled': button.newStatus === task.status }"
            @click="changeStatus(task.id, task.status, button.newStatus)"
          ) {{ button.text }}
        button.button.card__button.archive(
          @click="taskToArchive(task.id)"
        ) 📦 Отправить в архив

//- end line
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import AppTaskStatus from '../components/AppTaskStatus'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const buttons = [
      { newStatus: 'done', text: '📈 Завершить задачу' },
      { newStatus: 'active', text: '🎮 Приступить к задаче' },
      { newStatus: 'cancelled', text: '❌ Отменить задачу' }
    ]

    const { id, archive } = route.params
    const task = computed(() => {
      if (Boolean(archive) === false) {
        return store.state.tasks.find(obj => obj.id === Number(id))
      } else {
        return store.state.archive.find(obj => obj.id === Number(id))
      }
    })

    const changeStatus = (id, oldStatus, newStatus) => {
      if (newStatus !== oldStatus) {
        store.commit('taskChangeStatus', { id: id, status: newStatus })
      }
    }

    const taskToArchive = id => {
      router.push('/')
      store.commit('taskToArchive', id)
    }

    const taskToTasks = id => {
      router.push('/archive')
      store.commit('taskToTasks', id)
    }

    const removeTask = id => {
      router.push('/archive')
      store.commit('removeTask', id)
    }

    return {
      task,
      buttons,
      changeStatus,
      taskToArchive,
      taskToTasks,
      removeTask
    }
  },
  components: { AppTaskStatus }
}
</script>

<style lang="scss" scoped>
  .card {

    &--archive {
      .card__title .inner {
        margin-left: 12px;
        opacity: 0.3;
      }
    }

    & + & {
      margin-top: 25px;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      border-bottom: 2px solid #dfdfdf;
    }

    &__title {
      margin: 0;
      padding: 0;
      padding-left: 8px;
      border-left: 4px solid var(--border-color);

      & .card__title--archive .inner {
        margin-left: 10px;
        font-style: italic;
        font-weight: 600;
        opacity: 0.17;
      }

      &.pending {
        --border-color: rgba(0,0,0,.25);
      }
      &.active {
        --border-color: var(--warning-color);
      }
      &.done {
        --border-color: var(--link-color);
      }
      &.cancelled {
        --border-color: var(--danger-color);
      }
    }

    &__deadline {
      width: fit-content;
      padding: 20px 0;
      border-bottom: 1px solid #f0f0f0;
      border-top: 1px solid #f0f0f0;
      margin-top: 35px;

      font-size: 20px;
      font-weight: 500;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
    }

    &__button {
      & + & {
        margin-left: 20px;
      }
    }

    .moreinfo {
      margin-left: 4px;

      font-size: 115%;
      font-weight: bold;
      color: var(--link-color);

      cursor: pointer;

      &:hover {
        color: var(--link-hover-color);
      }
    }
  }
</style>
