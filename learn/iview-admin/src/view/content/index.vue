<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-row-edit="handleRowEdit"
        @on-row-remove="handleRowRemove"
      />
      <Button type="error" size="small" @click="remove(index)">Delete</Button>
      <Row type="flex" justify="space-between" align="middle">
        <Button style="margin: 10px 0;" type="primary" @click="exportExcel"
          >导出为Excel文件</Button
        >
        <Page
          :total="total"
          :current="page"
          :page-size="limit"
          :page-size-opts="pageArr"
          show-elevator
          show-sizer
          show-total
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
        />
      </Row>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getList } from '@/api/content'
import dayjs from 'dayjs'
export default {
  name: 'content_management',
  components: {
    Tables,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      pageArr: [10, 20, 30, 50, 100],
      columns: [
        {
          title: '标题',
          key: 'title',
          minWidth: 400,
        },
        {
          title: '创建时间',
          key: 'created',
          width: 200,
          align: 'center',
          // 方法二：使用 render 方法结构化数据
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                dayjs(params.row.created).format('YYYY-MM-DD hh:mm:ss')
              ),
            ])
          },
        },
        {
          title: '作者',
          key: 'user',
          width: 120,
          align: 'center',
          // 方法二：使用 render 方法结构化数据
          render: (h, params) => {
            console.log('data -> params', params)
            return h('div', [h('span', params.row.user)])
          },
        },
        {
          title: '分类',
          key: 'catalog',
          width: 100,
          align: 'center',
          render: (h, params) => {
            const catalog = params.row.catalog
            let result = ''
            switch (catalog) {
              case 'ask':
                result = '提问'
                break
              case 'advise':
                result = '建议'
                break
              case 'discuss':
                result = '交流'
                break
              case 'share':
                result = '分享'
                break
              case 'logs':
                result = '动态'
                break
              case 'notice':
                result = '公告'
                break
              default:
                result = '全部'
            }
            return h('div', [h('span', result)])
          },
        },
        {
          title: '积分',
          key: 'fav',
          width: 100,
          align: 'center',
        },
        {
          title: '标签',
          key: 'tags',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.tags.map((o) => o.name).join(',')),
            ])
          },
        },
        {
          title: '是否结束',
          key: 'isEnd',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [h('span', params.row.isEnd === '0' ? '否' : '是')])
          },
        },
        {
          title: '阅读记数',
          key: 'reads',
          width: 100,
          align: 'center',
        },
        {
          title: '回答记数',
          key: 'answer',
          width: 100,
          align: 'center',
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                class: 'test',
                props: {
                  color: params.row.status === '0' ? 'success' : 'error',
                },
                domProps: {
                  innerHTML: params.row.status === '0' ? 'on' : 'off',
                },
              }),
            ])
          },
        },
        {
          title: '是否置顶',
          key: 'isTop',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  color: '#19be6b',
                  type: params.row.isTop === '1' ? 'md-checkmark' : '',
                  size: 20,
                },
              }),
            ])
          },
        },
        {
          title: '设置',
          fixed: 'right',
          slot: 'action',
          width: 160,
          align: 'center',
        },
      ],
      tableData: [
        {
          title: 'aaaa',
          created: '2020-08-20',
          user: 'jerry1',
          catalog: 'ask',
          fav: 100,
          tags: '历史,人文',
          isEnd: '0',
          reads: 100,
          answer: 200,
          status: 0,
          isTop: '1',
          _id: 0,
        },
        {
          title: 'bbb',
          created: '2020-07-20',
          user: 'jerry2',
          catalog: 'advise',
          fav: 100,
          tags: '历史,人文',
          isEnd: '0',
          reads: 100,
          answer: 200,
          status: 0,
          isTop: '1',
          _id: 1,
        },
        {
          title: 'ccc',
          created: '2020-06-20',
          user: 'jerry3',
          catalog: 'share',
          fav: 100,
          tags: '历史,人文',
          isEnd: '0',
          reads: 100,
          answer: 200,
          status: 1,
          isTop: '1',
          _id: 2,
        },
      ],
    }
  },
  methods: {
    handleRowEdit(row, index) {
      console.log('handleRowEdit -> row, index', row, index)
    },
    handleRowRemove(row, index) {
      console.log('handleRowRemove -> row, index', row, index)
      this.$Modal.confirm({
        title: `确定删除文章吗`,
        content: `删除第${index + 1} 条数据, 文章标题:"${row.title}"的文章吗`,
        onOk: () => {
          this.$Message.info('成功删除!')
          this.tableData = this.tableData.filter((item) => {
            item._id !== row._id
          })
        },
        onCancel: () => {
          this.$Message.info('取消操作!')
        },
      })
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      })
    },
    onPageChange(page) {
      this.page = page
      this._getList()
      console.log('onPageChange -> page', page)
    },
    onPageSizeChange(size) {
      this.limit = size
      this._getList()
      console.log('onPageSizeChange -> size', size)
    },
    _getList() {
      getList({ page: this.page - 1, limit: this.limit }).then((res) => {
        console.log('mounted -> res', res)
        // 方法一： -> 修改getList接口
        // const data = res.data
        // data.forEach((item) => {
        //   if (item.status === 0) {
        //     item.status = '打开回复'
        //   } else {
        //     item.status = '禁止回复'
        //   }
        // })
        res = {
          data: [
            {
              title: 'aaaa',
              create: '2020-08-20',
            },
          ],
        }
        this.tableData = res.data
        console.log('_getList -> this.tableData', this.tableData)
        this.total = res.total
      })
    },
  },
  mounted() {
    this._getList()
  },
}
</script>

<style>
</style>
