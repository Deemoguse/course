<template lang="pug">
.taskstatus(:class="statusClass") {{ statusTitle }}
</template>

<script>
export default {
  props: {
    statusTitle: String,
    statusClass: String
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
