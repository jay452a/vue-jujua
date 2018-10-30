/**
 * Created by jimmy on 2018/6/5.
 */
import axios from 'axios';

const io = axios.create({ withCredentials: false });

//  请求
io.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//  响应
io.interceptors.response.use(
  response => {
    if (response.data.statusCode === '8000' || response.data.statusCode === '8010' || response.data.statusCode === '4000') {
      return response.data.data;
    }
    return Promise.reject(
      response.data ||
      response.data.resultMsg ||
      (response.data.head && response.data.head.message)
    );
  },
  error => {
    // 400 参数错误
    // 401 未登录
    try {
      switch (error.response.status) {
        case 401: {
          return Promise.reject(
            error.response.data.resMsg || error.response.data.message
          );
        }
        default:
          return Promise.reject('服务器无响应')
          ;
      }
    } catch (e) {
      return Promise.reject(new Error('服务器无响应').message);
    }
  }
);

export default io;
