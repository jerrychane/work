<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item layui-nav-itemed"
        v-for="(item,index) in lists"
        :key="'center' + index"
      >
        <a href="javascript:;">
          <i class="iconfont-tomic" :class="item.icon"></i>
          {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "center",
  data() {
    return {
      lists: [
        {
          name: "我的主页",
          icon: "iconhome1"
        },
        {
          name: "基本设置",
          icon: "iconSettings"
        },
        {
          name: "我的帖子",
          icon: "icondocument"
        },
        {
          name: "我的消息",
          icon: "iconmessage1"
        },
        {
          name: "其他设置",
          icon: "iconSimilarproducts"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/custom/iconfont.css";
.iconfont-tomic {
  margin-right: 10px;
}
</style>