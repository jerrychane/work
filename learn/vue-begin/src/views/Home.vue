<template>
  <div>
    <div class="home">{{msg}}</div>
    <div class="left">
      <form v-if="isShow" action>
        <div class="item">
          菜品名称
          <input type="text" v-model="unit.name" />
        </div>
        <div class="item">
          菜品图片
          <input type="text" v-model="unit.url" />
        </div>
        <div class="item">
          菜品分类
          <input type="text" v-model="unit.type" />
        </div>
        <div class="item">
          菜品单价
          <input type="text" v-model="unit.price" />
        </div>
        <button type="button" @click="submit()">确定</button>
      </form>
      <div class="info" v-else>
        {{unit.name}}-{{unit.url}}-{{unit.type}}-{{unit.price}}
        <div class="ctrl">
          <button>添加</button>
          <button>取消</button>
        </div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item,index) in lists" :key="index">{{unit.name}}-{{unit.type}}-{{unit.price}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      msg: "hello world",
      isShow: true,
      unit: {
        name: "",
        url: "",
        type: "",
        price: ""
      },
      lists: []
    };
  },
  components: {},
  mounted() {},
  methods: {
    submit() {
      this.isShow = false;
    }
  }
};
</script>

<style lang="scss">
.left {
  float: left;
  width: 40%;
}
.right {
  float: left;
  width: 60%;
}
</style>