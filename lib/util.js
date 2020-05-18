// 是否是开发环境
function isDevelopFunc(req) {
  let isDev;
  if (req.headers.referer) {
    const params = new URLSearchParams(req.headers.referer.split('?')[1]);
    isDev = params.get("mode") && params.get("mode").includes("dev");
  }
  var isDevelop = isDev ? true : false;
  return {
    isDevelop
  }
}
module.exports = isDevelopFunc;