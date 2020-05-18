### 使用方法

#### 一：基本使用方法：

  1. 下载安装执行命令： npm install --save-dev json-mocker-tool </br>

  2. 在webpack中的devServer中的before配置下，如下： </br>
```
// webpack.config.js
const mocker = require('json-mocker-tool');

module.exports = {
  devServer: {
    //....
    before: app => {
      mocker({
        mockDir: path.resolve('./mock')
      })(app);
    }
    //....
  }
}
```
  3. 在项目的根目录下新建mock文件夹。</br>
  4. 在mock文件夹下新建json文件，该json文件是根据接口来命名的，比如你接口为 /api/xxxx/widget.json 的话，那么在mock文件夹下新建 widget.json 即可，然后把和后端约定好的数据复制进去即可。如果有多个接口，命名方式和上面一样。</br>
  5. 默认请求的是正式环境的地址，如果我们想要使用本地的mock数据的话，需要在地址栏上 加上 mode=dev ，刷新下页面即可请求到本地mock数据了。</br>

  #### 二：特点

  1）默认是正式环境的接口，如想使用mock数据，需要在地址栏中加上 mode = dev; </br>
  2) json文件命名是根据接口名来命名的。比如接口为 'api/xxxx/yyy/widget.json'， 那么在mock文件夹下新建 widget.json文件即可。然后把约定的json数据复制进去。</br>
  3) Mock 文件支持热更新，修改后立即生效。</br>
  4）只支持get请求进行mock数据。</br>

  更多使用，请看 <a href="https://github.com/tugenhua0707/react-collection/blob/master/mock/mock.md">这篇文章</a>
  