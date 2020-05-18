const fs = require("fs");
const chalk = require("chalk");
const url = require("url");
const isDevelopFunc = require("./util");

module.exports = config => (req, res, next) => {
  // 如果是开发环境的话
  const { isDevelop } = isDevelopFunc(req);
  if (isDevelop) {
    /*
    const url = require('url');
    const path = url.parse("http://localhost:9000/api/widget").path;
    console.log(path); // "/api/widget"
    */
    const { mockDir } = config;
    fs.exists(`${mockDir}`, function(exists) {
      // 如果文件夹不存在的话
      if (!exists) {
        console.log(chalk.red('该文件夹不存在, 请创建该文件夹'));
        return;
      }
    });
    let path = url.parse(req.url).path;
    let suffix; // 后缀
    
    // 只能针对get请求做mock数据
    if (req.method === "GET"  && path.includes("?")) {
      path = path.split("?")[0];
      suffix = path.substring(path.lastIndexOf('/') + 1); // 返回后缀 widget
    }
    // 获取mock文件夹下到所有文件，然后进行遍历找到对应到json文件
    const files = fs.readdirSync(`${mockDir}`); // 返回 ['xx.json', 'yy.json'] 这样到
    let response;
    if (suffix) {
      const rets = files.filter(item => item.includes(suffix));
      if (rets.length) {
        const filePath = `${mockDir}` + '/' + rets[0];
        if (fs.existsSync(filePath)) {
          response = require(`${filePath}`);
        } else {
          // if no mock file found. tell user to create it
          const msg = `\n Mock Server Error: Please crate ${filePath}.json file to enable mock`;
          res.json({ code: 404, msg });
          console.log(chalk.red(msg));
          return next();
        }
      } else {
        // if no mock file found. tell user to create it
        const msg = `\n Mock Server Error: Please crate ${filePath}.json file to enable mock`;
        res.json({ code: 404, msg });
        console.log(chalk.red(msg));
        return next();
      }
    }
    res.json(response);
  }
};