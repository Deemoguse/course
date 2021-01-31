<template lang="pug">

div.main__wrapper
  div.wrapper__manager.wrapper
    AppManager(:modules="managerModules" @action="addModule")

  div.wrapper__preview.wrapper
    AppPreview(:modules="resume")

  div.wrapper__comments.wrapper
    AppComments(:comments="comments" @action="getComments")

//- end
</template>

<script>
import AppManager from './components/AppManager.vue'
import AppPreview from './components/AppPreview.vue'
import AppComments from './components/AppComments.vue'
// imports

export default {
  data () {
    return {
      resume: [],
      managerModules: [
        { value: 'title', title: 'Заголовок', hint: 'Введите заголовок' },
        { value: 'subtitle', title: 'Подзаголовок', hint: 'Введите подзаголовок' },
        { value: 'avatar', title: 'Аватар', hint: 'Введите ссылку на изображение' },
        { value: 'text', title: 'Параграф', hint: 'Введите параграф' }
      ],
      comments: {
        status: 'data-false',
        error: false,
        data: []
      }
    }
  },
  methods: {
    addModule (val) {
      this.resume.push(val)
    },
    async getComments () {
      this.comments.status = 'data-load'
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42')
        this.comments.status = 'data-true'
        this.comments.data = await response.json()
      } catch (e) {
        this.comments.error = true
        this.comments.status = 'data-false'
        console.log(e.message)
      }
    }
  },
  components: {
    AppManager, AppPreview, AppComments
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  .main__wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 1024px;
    padding: 0 15px;
    margin: 25px auto;
    gap: 20px;

    // inner main__wrapper
    .wrapper {
      padding: 20px;
      border: 1px solid black;
      border-radius: 5px;
      background: white;
      box-shadow: 0px 4px 12px rgba($color: #000000, $alpha: .2);

      &__manager {
        flex: 1;
      }
      &__preview {
        flex: 3;
      }
      &__comments {
        width: 100%;
      }
    }
  }
</style>
