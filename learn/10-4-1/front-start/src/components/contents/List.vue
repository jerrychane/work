<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this':status ==='' && tag ===''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':status ==='0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':status === '1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this':sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this':sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" @nextPage="nextPage()"></list-item>
  </div>
</template>

<script>
import { getList } from "@/api/content";
import ListItem from "./ListItem";
export default {
  name: "list",
  components: {
    ListItem
  },
  data() {
    return {
      status: "",
      tag: "",
      sort: "created",
      page: 0,
      limit: 20,
      catalog: "",
      lists: []
    };
  },
  mounted() {
    this._getLists();
  },
  methods: {
    _getLists() {
      let options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      };
      getList(options).then(res => {
        console.log(res);
      });
    },
    nextPage() {
      this.page++;
      this._getLists();
    },
    search(val) {
      switch (val) {
        // 未结帖
        case 0:
          this.status = "0";
          this.tag = "";
          break;
        // 已结帖
        case 1:
          this.status = "1";
          this.tag = "";
          break;
        // 查询'精华'标签
        case 2:
          this.status = "";
          this.tag = "精华";
          break;
        // 按最新，按照日期查询
        case 3:
          this.sort = "created";
          break;
        // 按热议，按照评论数查询
        case 4:
          this.sort = "answer";
          break;
        // 默认综合查询
        default:
          this.status = "";
          this.tag = "";
          break;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>