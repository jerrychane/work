import axios from '@/utils/request'

const getCode = (sid) => {
  // axios.request({
  //   method: 'get',
  //   url: '/getCaptcha'
  // })
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

const forget = async option => {
  return axios.post('/forget', {
    ...option
  })
}

export { getCode, forget }
