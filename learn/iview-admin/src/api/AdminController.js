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
    // 4.底部的数据
    ctx.body = {
      code: 200,
      data: ''
    }
  }
}

export default new AdminController()
