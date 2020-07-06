<template>
  <div class="tips animation" v-show="isShow" ref="tips">
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: "Pop",
  props: {
    type: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.tips {
  position: fixed;
  left: 50%;
  top: 50%;
}
.animation {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}
</style>