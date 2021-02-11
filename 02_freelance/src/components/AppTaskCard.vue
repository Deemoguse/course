<template lang="pug">

.card

  //- header
  .card__header.pb-2.mb-3
    h2.card__title(:class="status") {{ title }}
    app-task-status(:status="status")

  //- body
  .card__body.typography.mb-3
    p {{ description.slice(0, 200) }}
      span.moreinfo(v-if="description.length > 199") ...

  //- footer
  .card__footer
    button.button.card__button(
      v-if="$route.path === '/'"
      @click="$router.push(`/task/${id}&`)"
    ) 🧐 Просмотреть подробности
    template(v-if="$route.path === '/archive'")
      button.button.card__button(@click="$router.push(`/task/${id}&true`)") 🧐 Просмотреть подробности
      button.button.card__button(@click="taskToTasks(id)") 👼 Вернуть из архива
      button.button.card__button(@click="removeTask(id)") 🔥 Удалить

//- end line
</template>

<script>
import { toRefs } from 'vue'
import { useStore } from 'vuex'
import AppTaskStatus from './AppTaskStatus'

export default {
  props: { taskData: Object },
  setup (props) {
    const store = useStore()

    const refs = toRefs(props.taskData)
    const removeTask = id => { store.commit('removeTask', id) }
    const taskToTasks = id => { store.commit('taskToTasks', id) }

    return {
      ...refs,
      removeTask,
      taskToTasks
    }
  },
  components: { AppTaskStatus }
}
</script>

<style lang="scss" scoped>
  .card {

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

    &__footer > * + * {
      margin-left: 20px;
    }

    &__actions {
      display: flex;

      & > * + * {
        margin-left: 20px;
      }
    }

    .moreinfo {
      margin-left: 4px;
      color: #9e9e9e;

      cursor: pointer;

      &:hover {
        color: var(--link-hover-color);
      }
    }
  }
</style>
