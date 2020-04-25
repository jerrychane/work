<template>
  <div>
    <div class="left">
      左侧是下单
      <ul>
        <li
          v-for="(item,index) in lists"
          :key="'order'+index"
        >{{item.name}}  - {{item.price}}</li>
      </ul>
    </div>
    <div class="right">计算部分</div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      lists: this.$store.state.lists
    };
  }
};
</script>

<style lang="scss" scoped>
</style>