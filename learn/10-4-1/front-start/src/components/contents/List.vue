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
      lists: [
        {
          uid: {
            name: "jerry",
            isVip: 1
          },
          title: "大前端课程",
          content: "",
          created: "2020-06-19 01:00:00",
          catalog: "ask",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
          // uid	String	否		用户ID
          // title	String	否		文章标题
          // content	String	否		文章内容
          // created	Date	否	now()	创建时间
          // catalog	String	否		帖子分类，index-全部，ask-提问，advise-建议，discuss-讨论，share-分享，news-动态
          // fav	Number	否		帖子积分
          // isEnd	String		0	0-未结束，1-已结帖
          // reads	Number	否	0	阅读记数
          // answer	Number	否	0	回答记数
          // status	String	否	0	0-打开回复，1-关闭回复
          // isTop	String	否	0	0-未置顶，1-已置顶
          // sort	String	否	0	置顶排序
          // tags	String	否		文章的标签、精华，加精，etc
        },
        {
          uid: {
            name: "jerry",
            isVip: 1
          },
          title: "大前端课程",
          content: "",
          created: "2020-06-19 01:00:00",
          catalog: "ask",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
        },
        {
          uid: {
            name: "jerry",
            isVip: 1
          },
          title: "大前端课程",
          content: "",
          created: "2020-06-19 01:00:00",
          catalog: "ask",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
        },
        {
          uid: {
            name: "jerry",
            isVip: 1
          },
          title: "大前端课程",
          content: "",
          created: "2020-06-19 01:00:00",
          catalog: "ask",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red"
            },
            {
              name: "热门",
              class: "layui-bg-blue"
            }
          ]
        }
      ]
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