<template lang="pug">

.card.p-3
  .card__header.pb-2.mb-3
    h2.card__title(:class="status") {{ title }}
    app-task-status(:status="status")
  .card__body.typography.mb-3
    p {{ description.slice(0, 200) }}
      span.moreinfo(
        v-if="description.length > 199"
        @click="$router.push(`/task/${id}`)"
      ) ...
  .card__footer
    button.card__button(@click="$router.push(`/task/${id}`)") 🧐 Просмотреть подробности

//- end line
</template>

<script>
import { toRefs } from 'vue'
import AppTaskStatus from './AppTaskStatus'

export default {
  props: { taskData: Object },
  setup (props) {
    const refs = toRefs(props.taskData)
    return { ...refs }
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

    &__button {
      padding: .5em 1.1em .6em;
      border: 1px solid #dfdfdf;
      border-radius: 3px;

      font-size: 16px;

      background: transparent;
      cursor: pointer;
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
