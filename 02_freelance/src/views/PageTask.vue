<template lang="pug">

.container
  .card.p-3
    .card__header.pb-2.mb-3
      h2.card__title(:class="task.status") {{ task.title }}
      app-task-status(:status="task.status")
    .card__body.typography.mb-3
      p {{ task.description }}
    .card__footer
      .inner__wrapper
        button.card__button(
          v-for="button in buttons"
          :class="{ 'card__button--disabled': button.newStatus === task.status }"
          @click="changeStatus(task.id, task.status, button.newStatus)"
        ) {{ button.text }}

      button.card__button(
        :class="{ 'card__button--disabled': task.status === 'archive' }"
        @click="changeStatus(task.id, task.status, 'archive')"
      ) 📦 Отправить в архив

//- end line
</template>

<script>
/* eslint-disable */
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import AppTaskStatus from '../components/AppTaskStatus'
import { useLocalStorage } from '../use/useLocalStorage'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const buttons = [
      { newStatus: 'done', text: '📈 Завершить задачу' },
      { newStatus: 'active', text: '🎮 Приступить к задаче' },
      { newStatus: 'cancelled', text: '❌ Отменить задачу' }
    ]

    const taskId = Number(route.params.id)
    const task = computed(() => {
      return store.state.tasks.find(obj => obj.id === taskId)
    })

    const changeStatus = (id, oldStatus, newStatus) => {
      if (newStatus !== oldStatus) {
        store.commit('taskChangeStatus', { id: id, status: newStatus })
        useLocalStorage()
      }
    }

    return {
      task,
      buttons,
      changeStatus
    }
  },
  components: { AppTaskStatus }
}
</script>

<style lang="scss" scoped>
  .card {
    border: 1px solid #dfdfdf;
    background: #fff;

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
      &.archive {
        --border-color: var(--dark-color)
      }
    }

    &__deadline {
      width: fit-content;

      font-size: 13px;
      font-weight: 500;

      box-shadow: 0px 1px 0px currentColor;
      opacity: 0.4;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
    }

    &__button {
      padding: .5em 1.1em .6em;
      border: 1px solid #dfdfdf;
      border-radius: 3px;

      font-size: 16px;

      background: transparent;
      cursor: pointer;

      & + & {
        margin-left: 20px;
      }

      &--disabled {
        border: 1px solid #c7c7c7;
        opacity: 0.5;
        cursor: default;

        &:active, &:focus {
          outline: none;
        }
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
