
const bodyParser = require('body-parser');
const mocker = require('./mocker');
const watcher = require('./watcher');
const isDevelopFunc = require('./util');

module.exports = config => app => {
  app.use((req, res, next) => {
    // 如果是开发环境的话
    const { isDevelop } = isDevelopFunc(req);
    if (isDevelop) {
      bodyParser.json()(req, res, next); // 返回一个只解析json
      /**
       * extended: true, 是采用qs库，允许将富对象和数组编码为url编码格式，允许使用url编码的json体验
       * 比如 extended: true 会将数据解析成如下格式：
       * { 
           movie: { 
             _id: 'undefined',
            title: '电影名称11121',
            poster: ''
          } 
        }
      * extended: false, 是对 URL-encoded的数据的解析采用querystring库
      * extended: false 会将数据解析成如下格式：
      * { 
          'movie[_id]': 'undefined',
          'movie[title]': '电影名称11121',
          'movie[poster]': ''
        }
      */
      app.use(bodyParser.urlencoded({ extended: true })); // 返回对象的任意类型
      mocker(config)(req, res, next);
      watcher(config); // 实时监听mock数据更改
    } else {
      return next();
    }
  });
};