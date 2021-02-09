<template lang="pug">

header.header.fixed.top.left.right.pt-2.pb-2.pl-5.pr-5
  h2.header__title(@click="logoPush") 😁 Tasks
  nav.header__menu
    ul.header__list
      li.header__item(v-for="link in links" :key="link.path")
        router-link(
          class="header__link"
          active-class="header__link--active"
          exact-active-class="header__link--active"
          :to="link.path"
        ) {{ link.name }}

//- end line
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const links = store.state.staticData.routerLinks
    const logoPush = () => {
      if (route.path !== '/') {
        router.push('/')
        console.log('okkkk')
      }
    }

    return { links, logoPush }
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
