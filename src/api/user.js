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
  },
  updateUsername(data){
    return axios({
      url: '/api/user/updateUsername',
      method: 'post',
      data
    })
  },
  updatePad(data){
    return axios({
      url: '/api/user/updatePassword',
      method: 'post',
      data
    })
  },
  updateEmail(data){
    return axios({
      url: '/api/user/updateEmail',
      method: 'post',
      data
    })
  },
  get(id){
    return axios({
      url: '/api/user/get/'+id,
      method: 'get',
      id
    })
  },
}