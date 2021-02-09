<template lang="pug">

.container
  .card.p-3
    h2.card__title.pb-2.mb-3 🐣 Новая задача
    form.card__form(@submit.prevent="createTask")
      .card__formrow
        .inner__wrapper.inner__wrapper--title
          label(for="title") 🤓 Название задачи
          input(v-model="taskTitle" type="text" name="title")
        .inner__wrapper.inner__wrapper--deadline
          label(for="deadline") 🤬 Дедлайн задачи
          input(v-model="taskDeadline" type="date" :min="dateNow" name="deadline")
      .card__formrow.card__formrow--textarea
        label(for="description") 🧐 Описание задачи
        textarea(v-model="taskDescription" name="description")
      .card__formrow
        button.card__button(type="submit") ✅ Создать задачу

//- end line
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const dateNow = computed(() => {
      const date = new Date()
      const day = [date.getUTCDate()].length < 2
        ? `0${date.getUTCDate()}`
        : date.getUTCDate()
      const month = [date.getUTCMonth() + 1].length < 2
        ? `0${date.getUTCMonth() + 1}`
        : date.getUTCMonth() + 1
      const year = date.getUTCFullYear()
      return `${year}-${month}-${day}`
    })

    const taskTitle = ref('')
    const taskDescription = ref('')
    const taskDeadline = ref(dateNow)

    const createTask = () => {
      store.commit('createTask', {
        title: taskTitle.value,
        description: taskDescription.value,
        deadline: taskDeadline.value
      })

      router.push('/')
    }

    return {
      taskTitle,
      taskDescription,
      taskDeadline,
      createTask,
      dateNow
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    border: 1px solid #dfdfdf;
    background: #fff;

    &__title {
      width: 100%;
      margin-top: 0;
      border-bottom: 2px solid #dfdfdf;
    }

    &__button {
      padding: .5em 1.1em .6em;
      border: 1px solid #dfdfdf;
      border-radius: 3px;

      font-size: 16px;

      background: transparent;
      cursor: pointer;
    }

    &__formrow {
      display: flex;

      & + & {
        margin-top: 26px;
      }

      &--textarea {
        display: flex;
        flex-direction: column;
      }

      & label {
        font-size: 20px;
        margin-bottom: 10px;
      }

      & input, & textarea {
        min-height: 30px;
        padding: .5em 1.1em .6em;
        border: 1px solid #dfdfdf;
        border-radius: 3px;
        font-size: 20px;
      }

      & textarea {
        min-height: 250px;
        resize: none;
      }

      & input:active, & textarea:active,
      & input:focus, & textarea:focus {
        outline-color: var(--link-color);
      }

      & .inner__wrapper {
        display: flex;
        flex-direction: column;

        &--title {
          flex: 10;
        }
        &--deadline {
          flex: 1;
          margin-left: 20px;
        }
      }
    }
  }
</style>
