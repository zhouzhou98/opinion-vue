import axios from 'axios'
export default {
  getByPage(page) { // 前台查询
    return axios({
      url: '/api/keyword/getByPage',
      method: 'post',
      data:page
    })
  },
  add(data){
    return axios({
      url: '/api/keyword/add',
      method: 'post',
      data
    })
  },
  get(id){
    return axios({
      url: '/api/keyword/get/'+id,
      method: 'get',
      id
    })
  },
  update(data){
    return axios({
      url: '/api/keyword/update',
      method: 'post',
      data
    })
  },
  delete(id){
    return axios({
      url: '/api/keyword/delete/'+id,
      method: 'post',
      id
    })
  },
  exportMeg(id){
    window.open("api/keyword/exportMeg/"+id, "_parent");
    // return axios({
    //   url: '/api/keyword/exportMeg/'+id,
    //   method: 'post',
    //   id
    // })
  }
}