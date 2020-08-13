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
        @on-delete="handleDelete"
      />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel"
        >导出为Excel文件</Button
      >
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'content_management',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: '标题',
          key: 'title',
          minWidth: 400
        },
        {
          title: '创建时间',
          key: 'created',
          width: 200,
          align: 'center'
        },
        {
          title: '作者',
          key: 'user',
          width: 120,
          align: 'center'
        },
        {
          title: '分类',
          key: 'catalog',
          width: 100,
          align: 'center'
        },
        {
          title: '积分',
          key: 'fav',
          width: 100,
          align: 'center'
        },
        {
          title: '标签',
          key: 'tags',
          width: 120,
          align: 'center'
        },
        {
          title: '是否结束',
          key: 'isEnd',
          width: 100,
          align: 'center'
        },
        {
          title: '阅读记数',
          key: 'reads',
          width: 100,
          align: 'center'
        },
        {
          title: '回答记数',
          key: 'answer',
          width: 100,
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          align: 'center'
        },
        {
          title: '是否置顶',
          key: 'isTop',
          width: 100,
          align: 'center'
        },
        {
          title: '设置',
          fixed: 'right',
          width: 160,
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData().then((res) => {
      this.tableData = res.data
    })
  }
}
</script>

<style>
</style>
