<template lang="pug">

//- wrapper
div.preview

  //- header
  h1.preview__title Предпросмотр

  //- preview box
  div.preview__container(v-if="modules.length")
    component(
      v-for="module in modules"
      :is="`app-resume-${module.type}`"
      :content="module.content")
  p.preview__alert(v-else) Пусто!

//- end line
</template>

<script>
import AppResumeTitle from './AppResumeTitle'
import AppResumeSubtitle from './AppResumeSubtitle'
import AppResumeText from './AppResumeText'
import AppResumeAvatar from './AppResumeAvatar'

export default {
  props: {
    modules: Object
  },
  components: {
    AppResumeTitle, AppResumeSubtitle, AppResumeText, AppResumeAvatar
  }
}
</script>

<style lang="scss" scoped>
  .preview {
    display: flex;
    flex-direction: column;
    gap: 20px;

    // inner
    &__title {
      padding-bottom: 9px;
      border-bottom: 1px solid black;
    }
    &__container {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    &__alert {
      color: rgb(182, 182, 182);
    }
  }
</style>
