<template lang="pug">

header.header.fixed.top.left.right.pt-2.pb-2.pl-5.pr-5
  h2.header__title(@click="logoPush") 😁 Tasks
  nav.header__menu
    ul.header__list
      li.header__item
        router-link.header__link(
          active-class="header__link--active"
          :class="routeMainPage"
          to="/"
        ) Список задач
      li.header__item
        router-link.header__link(
          active-class="header__link--active"
          :class="routeArchivePage"
          to="/archive"
        ) Архив
      li.header__item
        router-link.header__link(
          active-class="header__link--active"
          to="/createtask"
        ) Создать задачу

//- end line
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()

    const routeMainPage = computed(() => {
      return {
        'header__link--active': Boolean(route.params.archive) === false && route.path.indexOf('task') === 1
      }
    })
    const routeArchivePage = computed(() => {
      return {
        'header__link--active': Boolean(route.params.archive) === true && route.path.indexOf('task') === 1
      }
    })

    const logoPush = () => {
      if (route.path !== '/' && route.path !== '/tasks/') {
        router.push('/')
      }
    }

    return { logoPush, routeMainPage, routeArchivePage }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #dfdfdf;

    background: #fff;
    box-shadow: 0px 5px 8px rgba($color: #000000, $alpha: 0.03);
    z-index: 3;

    // inner header
    &__title {
      margin: 0;
      cursor: pointer;
    }

    &__menu &__list {
      display: flex;
      list-style: none;
    }

    &__item + &__item {
      margin-left: 35px;
    }

    &__link {
      font-size: 120%;
      color: var(--dark-color);

      &--active,
      &:hover {
        box-shadow: 0 2px 0 var(--link-color)
      }
    }
  }
</style>
