import qs from 'qs'
import { axios } from '@/libs/api.request.js'

const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

export {
  getList
}
