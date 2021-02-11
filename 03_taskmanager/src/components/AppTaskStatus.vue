<template lang="pug">
.taskstatus(:class="status") {{ statusTitle }}
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props: { status: String },

  setup (props) {
    const statusList = useStore().state.staticData.statusList
    const statusTitle = computed(() => {
      return statusList.find(obj => obj.alias === props.status).title
    })

    return { statusTitle }
  }
}
</script>

<style lang="scss" scoped>
  .taskstatus {
    padding: 3px 9px;
    border: 2px solid currentColor;
    border-radius: 3px;

    font-size: 14px;
    font-weight: 500;

    &.pending {
      color: var(--dark-color);
      opacity: .35;
    }
    &.active {
      color: var(--warning-color);
    }
    &.done {
      color: var(--link-color);
    }
    &.cancelled {
      color: var(--danger-color);
    }
  }
</style>
