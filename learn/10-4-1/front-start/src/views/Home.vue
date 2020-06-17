<template>
  <div>
    <jerry-panel></jerry-panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <jerry-list></jerry-list>
        </div>
        <div class="layui-col-md4">
          <jerry-tips></jerry-tips>
          <jerry-sign></jerry-sign>
          <jerry-hotlist></jerry-hotlist>
          <jerry-ads></jerry-ads>
          <jerry-links></jerry-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import Tips from "@/components/sidebar/Tips";
import Sign from "@/components/sidebar/Sign";
import HotList from "@/components/sidebar/HotList";
import Ads from "@/components/sidebar/Ads";
import Links from "@/components/sidebar/Links";
import List from "@/components/contents/List";
export default {
  name: "home",
  components: {
    "jerry-panel": Panel,
    "jerry-tips": Tips,
    "jerry-sign": Sign,
    "jerry-hotlist": HotList,
    "jerry-ads": Ads,
    "jerry-links": Links,
    "jerry-list": List
  }
};
</script>

<style lang="scss" scoped>
</style>