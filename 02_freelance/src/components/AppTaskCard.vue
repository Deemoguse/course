<template lang="pug">

.card.p-3
  .card__header.pb-2.mb-3
    h2.card__title(:class="statusClass") {{ title }}
    app-task-status(:status-title="statusTitle" :status-class="statusClass")
  .card__body.typography.mb-3
    p {{ description.slice(0, 250) }}
      span.moreinfo(
        v-if="description.length > 249"
        @click=""
      ) ...
  .card__footer
    button.card__button(@click="$router.push('/task')") 🧐 Просмотреть подробности

//- end line
</template>

<script>
import { toRefs } from 'vue'
import { useGetStatus } from '../use/getTaskStatus'
import AppTaskStatus from './AppTaskStatus'

export default {
  props: { taskData: Object },
  setup (props) {
    const { statusClass, statusTitle } = useGetStatus(props.taskData.status)
    const refs = toRefs(props.taskData)
    return { ...refs, statusClass, statusTitle }
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
