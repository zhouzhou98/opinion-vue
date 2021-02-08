import axios from 'axios'

export default {
  getLogin(data) { // 查询管理员
    return axios({
      url: '/api/user/login',
      method: 'post',
      data,
    })
  },
  register(data){
    return axios({
      url: '/api/user/register',
      method: 'post',
      data
    })
  }
}