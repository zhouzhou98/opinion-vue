import axios from 'axios'
export default {
  getByPage(page) { // 前台查询
    return axios({
      url: '/api/log/getByPage',
      method: 'post',
      data:page
    })
  }
}