<template lang="pug">

//- wrapper
div.manager

  //- constructor
  select.manager__select(v-model="type")
    option(
      v-for="module in modules"
      v-bind:value="module.value"
      ) {{ module.title }}

  textarea.manager__textarea(
    v-model="content"
    :placeholder="typeHint")

  button.manager__button(
    @click="addModule"
    :class="{ 'manager__button--disabled': content.length < 4 }"
    ) Добавить

//- end line
</template>

<script>
export default {
  emits: ['action'],
  props: {
    modules: Array
  },
  data: () => ({
    type: 'title',
    content: ''
  }),
  methods: {
    addModule () {
      if (this.content.length > 3) {
        this.$emit('action', { type: this.type, content: this.content })
        this.type = 'title'
        this.content = ''
      }
    }
  },
  computed: {
    typeHint () {
      return this.modules.find(key => key.value === this.type).hint
    }
  }
}
</script>

<style lang="scss" scoped>
  .manager {
    display: flex;
    flex-direction: column;
    gap: 15px;

    // inner manager
    &__select {
      padding: 0.5em;
    }
    &__textarea {
      padding: 0.5em;
      min-height: 150px;
      resize: none;
    }
    &__button {
      padding: 0.5em;
      border: 1px solid black;
      border-radius: 2px;
      border-style: solid;

      // modifications
      &--disabled {
        border-color: rgb(124, 124, 124);
        background: rgb(216, 216, 216);
        color: rgb(124, 124, 124);
      }
    }
  }
</style>
