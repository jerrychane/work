<template>
  <div>
    <my-header title="修改设置"></my-header>
    <div class="container">
      <div class="wrapper">
        <div class="img">
          <label for="img">
            <img src="/img/bear-200-200.jpg" alt />
            <i></i>
          </label>
          <input type="file" class="none" id="img" />
          <svg-icon icon="camera" class="upload"></svg-icon>
        </div>
      </div>
      <mt-field label="账号" placeholder="请输入邮箱" v-model="username"></mt-field>
      <mt-field label="昵称" placeholder="请输入昵称" v-model="name"></mt-field>
      <mt-field label="城市" placeholder="请输入城市" v-model="location"></mt-field>
      <mt-cell title="性别" @click.native="showAction()">
        <span>
          <svg-icon icon="arrow-right"></svg-icon>
        </span>
      </mt-cell>
      <mt-field
        class="cell-title"
        label="个人签名"
        placeholder="介绍一下你吧"
        type="textarea"
        rows="3"
        v-model="regmark"
      ></mt-field>
      <mt-actionsheet :actions="genderAction" v-model="sheetVisible"></mt-actionsheet>
      <div class="ctrls">
        <mt-button type="primary" size="large">确定</mt-button>
        <mt-button type="default" size="large">取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      username: '',
      name: '',
      gender: '0',
      location: '',
      regmark: '',
      sheetVisible: false,
      genderAction: []
    }
  },
  mounted () {
    this.genderAction = [
      {
        name: '男',
        value: '0',
        method: this.setGender
      },
      {
        name: '女',
        value: '1',
        method: this.setGender
      }
    ]
  },
  methods: {
    setGender (obj) {
      this.gender = obj.value
    },
    showAction () {
      this.sheetVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // padding-top: $header-height + 10;
  padding: $header-height + 10 30px 30px;
}
.divider {
  height: 24px;
  background: #f6f6f6;
  width: 100vw;
  margin-left: -30px;
}
.wrapper {
  text-align: center;
}
.img {
  margin: 40px 0;
  text-align: center;
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  img {
    border-radius: 50%;
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
  }
  i {
    display: inline-block;
    width: 200px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    z-index: 50;
    left: 50%;
    margin-left: -100px;
  }
  .none {
    display: none;
  }
  .upload {
    position: absolute;
    bottom: 10px;
    left: 50%;
    color: #fff;
    font-size: 40px;
    margin-left: -20px;
    z-index: 100;
  }
}
.ctrls {
  padding: 0 30px;
  margin-top: 60px;
  button {
    margin-bottom: 30px;
  }
}
</style>
