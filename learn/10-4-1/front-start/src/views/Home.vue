<template>
  <div>
    <jerry-panel></jerry-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  name: "home",
  components: {
    "jerry-panel": Panel
  }
};
</script>

<style lang="scss" scoped>
</style>