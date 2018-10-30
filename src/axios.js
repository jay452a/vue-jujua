import axios from 'axios';
import { Toast } from 'mand-mobile';

const fastXmlParser = require('fast-xml-parser');

const baseURL = process.env.NODE_ENV === 'development' ? '' : 'http://60.255.48.150:9018';
// const baseURL = 'http://60.255.48.150:9018';
const io = axios.create({ baseURL, timeout: 10000 });


io.interceptors.request.use(
  config =>
    config
  ,
);
io.interceptors.response.use(
  (res) => {
    Toast.hide();
    const response = JSON.parse(fastXmlParser.parse(res.data).string) || {};
    if (response.statusCode !== 8000) {
      Toast.failed(response.statusStr, 2000, true);
      return Promise.reject(response);
    }
    if (res.config.method !== 'get') {
      Toast.succeed(response.statusStr);
    }
    return response;
  },
  (err) => {
    Toast.hide();
    if (err.message.includes('timeout')) {
      Toast.failed('网络超时！', 2000);
    }
    return Promise.reject(err);
  },
);
export default io;
