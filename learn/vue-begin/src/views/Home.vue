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
          <button type="button" @click="add">添加</button>
          <button type="button" @click="cancel">取消</button>
        </div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item,index) in lists" :key="index">{{item.name}}-{{item.type}}-{{item.price}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data () {
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
  mounted () {},
  methods: {
    submit () {
      this.isShow = false;
    },
    add () {
      // 添加 unit,菜单项目到list列表
      // let obj = new Object()
      // ... 扩展运算符
      // obj.name = this.unit.name; obj.url = this.unit.url; obj.type = this.unit.type; obj.price = this.unit.price;
      this.lists.push({ ...this.unit });
      this.unit.name = "";
      this.unit.url = "";
      this.unit.type = "";
      this.unit.price = "";
      this.isShow = true;
    },
    cancel () {
      this.isShow = true;
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