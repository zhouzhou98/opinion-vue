import axios from 'axios'
export default {
  getEvent(data) { // 前台查询
    return axios({
      url: '/api/blog/getEvent',
      method: 'post',
      data
    })
  },
  getSensitive(data){
    return axios({
      url: '/api/blog/getSensitive',
      method: 'post',
      data
    })
  },
  getPositive(data){
    return axios({
      url: '/api/blog/getPositive',
      method: 'post',
      data
    })
  },
  getOrigin(data){
    return axios({
      url: '/api/blog/getOrigin',
      method: 'post',
      data
    })
  }
}