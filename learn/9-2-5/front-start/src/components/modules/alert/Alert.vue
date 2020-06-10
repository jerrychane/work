<template>
  <div v-show="isShow">
    <div class="alert">
      <div>{{msg}}</div>
      <div class="btnCommon" @click="close()">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  method: {
    close() {
      this.isShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background: #fff;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  z-index: 3000;
}
.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
}
</style>