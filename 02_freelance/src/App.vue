<template lang="pug">

//- main wrapper
.main-wrapper

  //- header
  the-header

  //- body
  router-view.viewbox

//-  end line
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>

<style lang="scss" scoped>
  .viewbox {
    padding-top: 125px;
  }
</style>
