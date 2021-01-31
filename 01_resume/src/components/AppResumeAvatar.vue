<template lang="pug">
img(:src="content")
</template>

<script>
export default {
  props: {
    content: String
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 50%;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
  }
</style>
