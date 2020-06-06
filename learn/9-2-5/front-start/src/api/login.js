import axios from '@/utils/axios'

const getCode = () => {
  return axios.get('/getCaptcha')
}

const forget = async option => {
  let result = ''
  try {
    result = await axios.post('/forget', {
      ...option
    })
    if (result.status === 200) {
      return result.data
    }
  } catch (e) {
    console.log(e)
  }
  return result
}

export { getCode, forget }
