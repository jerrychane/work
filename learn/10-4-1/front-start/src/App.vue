<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "app",
  components: {
    "imooc-header": Header,
    "imooc-footer": Footer
  }
};
</script>

<style lang="scss">
@import "assets/css/global.css";
// 公用样式
.pl0 {
  padding-left: 0;
}
// .pl20 {
//   padding: 20px;
// }
@for $i from 0 through 5 {
  .pd#{$i} {
    padding: $i * 10 + px;
  }
}
.pr0 {
  padding-right: 0;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.svg {
  position: relative;
  top: -4px;
}
</style>
