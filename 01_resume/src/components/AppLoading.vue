<template lang="pug">

div.load__wrapper
  svg.load__body(viewbox="0 0 60 60")
    circle.load__circle(cx="30" cy="30" r="28")

</template>

<style lang="scss" scoped>
  .load__wrapper {
    width: max-content;
    margin: 0 auto;
  }

  .load__body {
    display: block;
    width: 60px;
    height: 60px;
    animation: load-anim-body 3s infinite linear;
  }

  @keyframes load-anim-body {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  .load__circle {
    stroke-width: 4px;
    stroke: black;
    fill: transparent;
    stroke-dasharray: 50%;
    stroke-dashoffset: -100%;
  }
</style>
