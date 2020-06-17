<template>
  <div>
    <jerry-pane></jerry-pane>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">list 列表</div>
        <div class="layui-col-md4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import Tips from "@/components/Tips";
import Sign from "@/components/Sign";
import HotList from "@/components/HotList";
import Ads from "@/components/Ads";
import Links from "@/components/Links";
export default {
  name: "home",
  components: {
    "jerry-pane": Panel,
    "jerry-tips": Tips,
    "jerry-sign": Sign,
    "jerry-hotlist": HotList,
    "jerry-ads": Ads,
    "jerry-links": Links
  }
};
</script>

<style lang="scss" scoped>
</style>