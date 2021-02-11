<template lang="pug">

.card

  h3.card__title 🔎 Найти задачи

  div.card__dropdown.card__dropdown--dropdown(:class="{ 'card__dropdown--active': dropdown }")
    button.button.card__button.card__button--dropdown(@click="dropdown = !dropdown")
      span.inner__text {{ selectedValue.text }}
      span.inner__emoji {{ selectedValue.emoji }}
    ul.card__list
      li.card__item(v-for="button in buttons")
        button.button.card__button(
          :class="{ 'card__button--active': button.value === props.modelValue, [button.value]: true }"
          @click="changeSearchByStatus(button.value)"
        )
          span.inner__text {{ button.text }}
          span.inner__emoji {{ button.emoji }}

</template>

<script>
import { reactive, ref } from 'vue'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: String
  },
  setup (props, context) {
    const buttons = [
      { value: 'all', text: 'Все задачи', emoji: '👨‍👩‍👧‍👦' },
      { value: 'pending', text: 'В очереди', emoji: '🥶' },
      { value: 'active', text: 'В работе', emoji: '👷‍♂️' },
      { value: 'done', text: 'Выполненные', emoji: '🥳' },
      { value: 'cancelled', text: 'Отмененные', emoji: '💀' }
    ]
    const changeSearchByStatus = value => {
      const obj = buttons.find(obj => obj.value === value)
      selectedValue.text = obj.text
      selectedValue.emoji = obj.emoji
      dropdown.value = !dropdown.value
      context.emit('update:modelValue', value)
    }

    const dropdown = ref(false)

    const selectedValue = reactive({
      text: buttons.find(obj => obj.value === props.modelValue).text,
      emoji: buttons.find(obj => obj.value === props.modelValue).emoji
    })

    return { props, buttons, changeSearchByStatus, selectedValue, dropdown }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;

    z-index: 2;

    &__title {
      margin: 0;
    }

    &__dropdown {
      position: relative;
      min-width: 200px;

      &--active, &--active .card__list {
        box-shadow: 0px 5px 12px rgba($color: #000000, $alpha: 0.06);
      }

      &--active .card__button.card__button--dropdown {
        border-radius: 3px 3px 0 0;

        &::after {
          clip-path: polygon(0 95%, 5% 100%, 95% 100%, 100% 95%, 53% 0, 47% 0);
        }
      }

      &--active .card__list {
        display: block;
      }
    }

    &__list {
      display: none;

      border: 1px solid #dfdfdf;
      border-radius: 0 0 3px 3px;

      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      right: 0;

      list-style: none;
      background: #fff;
      z-index: 1;
    }

    &__item + &__item {
      border-top: 1px solid #dfdfdf;
    }

    &__button {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;

      padding: .5em 1.1em .6em;
      border: none;

      font-size: 16px;

      background: transparent;
      cursor: pointer;

      &--dropdown {
        border: 1px solid #dfdfdf;
        border-radius: 3px;

        position: relative;

        &::after {
          content: '';
          display: inline-block;

          width: 12px;
          height: 8px;

          background: #b6b6b6;
          clip-path: polygon(0% 6%, 5% 0%, 96% 0%, 100% 5%, 54% 100%, 47% 100%);
        }

        & .inner__emoji {
          margin: 0 10px 0 auto;
        }
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
</style>
