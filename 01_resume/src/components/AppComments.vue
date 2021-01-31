<template lang="pug">

//- wrapper
div.comments

  //- comments button
  div.comments__body(v-if="comments.status === 'data-false'")
    button.comments__button(@click="getComments") Загрузить комментарии

  //- comments body
  div.comments__body(v-else-if="comments.status === 'data-true'")
    div.comments__item(v-for="item in comments.data")
      h3.comments__user Имя: {{ item.name }} | Почта: {{ item.email }}
      p.comments__text {{ item.body }}
      hr

  //- comments load
  div.comments__body(v-if="comments.status === 'data-load'")
    AppLoading

  //- comments error
  div.comments__body(v-if="comments.error === true && comments.status === 'data-false'")
    h3.comments__error Что-то пошло не так!

//- end line
</template>

<script>
import AppLoading from './AppLoading'

export default {
  emits: ['action'],
  props: {
    comments: Object
  },
  methods: {
    getComments () {
      this.$emit('action')
    }
  },
  components: { AppLoading }
}
</script>

<style lang="scss" scoped>
  .comments__item hr {
    margin-top: 25px;
  }
  .comments__item + .comments__item {
    margin-top: 25px;
  }
  .comments__button {
    display: block;
    margin: 0 auto;
    padding: .5em;
  }
  .comments__error{
    text-align: center;
  }
</style>
