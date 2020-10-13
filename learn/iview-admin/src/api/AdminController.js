import { moment } from 'dayjs'
class AdminController {
  async getMenu (ctx) { }
  async addMenu (ctx) { }
  async updateMenu (ctx) { }
  async deleteMenu (ctx) { }
  async getStatus (ctx) {
    // const result = {}
    // 1.顶部的 card
    const inforCardData = []
    const userNewCount = await User.find({ created: { $gte: moment().format('YYYY-MM-DD 00:00:00') } }).countDocuments()
    inforCardData.push(userNewCount)
    // 2.左侧的饼图数据
    // 3.本周的右侧统计数据
    // 3.1 计算6个月前的时间：1号 00:00:00
    // 3.2 查询数据库中对应时间内的数据 $gte
    // 3.3 group 组合 -> sum -> sort排序
    const startMonth = moment('2019-10-17').subtract(5, 'M').date(1).format()
    const endMonth = moment('2019-10-17').date(31).format('YYYY-MM-DD 23:59:59')
    console.log('AdminController -> getStatus -> startMonth', startMonth)
    console.log('AdminController -> getStatus -> endMonth', endMonth)
    // 4.底部的数据
    ctx.body = {
      code: 200,
      data: ''
    }
  }
}

export default new AdminController()
