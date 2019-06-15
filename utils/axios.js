import { fetch } from '../plugins/axios';

/** 查找当前目录下的所有js */
const findJs = require.context('./', true, /\.js/);
let config = [];

findJs.keys().forEach(e => {
  /** 引入非 index.js 的所有 api 配置 */
  if (e !== './index.js') {
    config = [...config, ...findJs(e).default];
  }
});

/** 将 api 配置实例化对象接口 */
class Api {
  constructor(arr) {
    this.config = arr;
    this.apis = {};
    this.generateApi();
  }

  async generateApi() {
    /**
     * @author Cyan
     * @constant {String} method 请求类型 post / get
     * @constant {String} name api Name
     * @constant {String} url 请求地址
     * @constant {Boolean} formData 是否采用 FormData 格式发送参数
     */
    this.config.forEach(e => {
      const { method, name, url, formData, splice } = e;

      this.apis[name] = params => {
        /** formData 传参类型处理 */
        if (formData) {
          const formData = new FormData();
          Object.entries(params).forEach(e => {
            formData.append(e[0], e[1]);
          });
          params = formData;
        }

        /** 字符串拼接传参类型处理 */
        if (splice) {
          const spliceParams =
            typeof params === 'object'
              ? Object.entries(params)
                  .map(e => `${e[0]}=${e[1]}`)
                  .join('&')
              : '';
          return fetch[method](`${url}${spliceParams && '?' + spliceParams}`);
        }
        return fetch[method](url, params);
      };
      window.apis = this.apis;
    });
  }
}

export default new Api(config);
