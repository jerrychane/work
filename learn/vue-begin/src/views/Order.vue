<template>
  <div>
    <div class="left">
      左侧是下单
      <ul>
        <li v-for="(item,index) in lists" :key="'order'+index">
          <span>{{item.name}} - {{item.price}}</span>
          <button type="button" @click="minus(item,index)">-</button>
          <span>{{typeof item.num === "undefined" ? 0 : item.num}}</span>
          <button type="button" @click="add(item,index)">+</button>
        </li>
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
  },
  methods: {
    minus(item, index) {
      if (typeof item.num === "undefined") {
        item.num = 0;
      }
      item.num--;
      if (item.num < 0) {
        item.num = 0;
      }
      this.$set(this.lists,index,item);
    },
    add(item, index) {
      if (typeof item.num === "undefined") {
        item.num = 0;
      }
      item.num++;
      if (item.num > 100) {
        item.num = 100;
      }
      this.$set(this.lists,index,item);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>