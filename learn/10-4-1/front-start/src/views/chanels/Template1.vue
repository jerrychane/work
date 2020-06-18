<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <jerry-list></jerry-list>
      </div>
      <div class="layui-col-md4">
        <jerry-hotlist></jerry-hotlist>
        <jerry-ads></jerry-ads>
        <jerry-links></jerry-links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from "@/components/sidebar/HotList";
import Ads from "@/components/sidebar/Ads";
import Links from "@/components/sidebar/Links";
import List from "@/components/contents/List";
export default {
  name: "template1",
  components: {
    "jerry-hotlist": HotList,
    "jerry-ads": Ads,
    "jerry-links": Links,
    "jerry-list": List
  }
};
</script>

<style lang="scss" scoped>
</style>