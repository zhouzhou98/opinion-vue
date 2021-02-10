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
  },
  getTendency(data){
    return axios({
      url: '/api/blog/getTendency',
      method: 'post',
      data
    })
  },
  getMap(data){
    return axios({
      url: '/api/blog/getMap',
      method: 'post',
      data
    })
  },
  getByPage(page) { // 前台查询
    return axios({
      url: '/api/blog/getByPage',
      method: 'post',
      data:page
    })
  },
  singleTendency(data){
    return axios({
      url: '/api/blog/singleTendency',
      method: 'post',
      data
    })
  }
}