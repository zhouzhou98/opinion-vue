import axios from 'axios';
import router from '../router';
import store from '@/store'
axios.defaults.timeout = 30 * 1000; // 默认超时30s

//定义全局默认配置
axios.defaults.headers.common['Authentication'] = store.state.token;

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(store.state.token){
    config.headers.common['Authentication']=store.state.token
  }
    
    return config;
  }, error => {
  // 对请求错误做些什么
    return Promise.reject(error);
  });


const handleResponse = function (res) {
  
  res.status !== 200 && console.log('%c status ', 'background: red; color: #fff', res.status);
  switch (res.status) {
    case 200:
      return Promise.resolve(res.data);
    case 203:
      router.push('/login');
      return Promise.reject(new Error('登录失效，请重新登录'));
    default:
      return Promise.reject(new Error('登录失效，请重新登录'));
  }
};

const axiosThen = function (response) {
  return handleResponse(response).then(resData => {
    if (resData.isSuccess || (resData.isSuccess === undefined && !resData.errors)) {
      return Promise.resolve(resData.data);
    } else {
      if (resData.errors) {
        console.error('%c CATCH ERROR ', 'background: red; color: #fff', resData.errors);
        return Promise.reject(new Error(resData.errors.map(item => item.message).join(', ')));
      } else {
        console.error('%c CATCH ERROR ', 'background: red; color: #fff', resData.msg);
        return Promise.reject(new Error(resData.msg));
      }
    }
  });
};

axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, (error) => {
  // 对响应错误做点什么
  console.error('%c CATCH ERROR ', 'background: red; color: #fff', error);
  return Promise.reject(error);
});

export { default as UserApi } from './user.js';
export { default as LogApi } from './log.js';
export { default as KeywordApi } from './keyword.js';