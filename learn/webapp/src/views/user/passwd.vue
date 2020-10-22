<template>
  <div>
    <my-header :hasBack="true" title="修改密码" :zIndex="100"></my-header>
    <div class="container">
      <mt-field label="旧密码" placeholder="请输入旧密码" type="password" v-model="oldpass"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="password"></mt-field>
      <mt-field label="确认密码" placeholder="请再次输入新密码" type="password" v-model="confirm"></mt-field>
      <div class="ctrls">
        <mt-button type="primary" size="large">确定</mt-button>
        <mt-button type="default" size="large">取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'passwd',
  data () {
    return {
      oldpass: '',
      password: '',
      confirm: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // padding-top: $header-height + 10;
  padding: $header-height - 2 30px 30px;
  position: relative;
  z-index: 0;
}
.ctrls {
  padding: 0 30px;
  margin-top: 60px;
  button {
    margin-bottom: 30px;
  }
}
</style>
