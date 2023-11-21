const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //关闭eslint严格模式
  lintOnSave: false,

  //代理跨越
  devServer: {
    proxy: {
      '/api': {
        ///数据来自于哪台服务器
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' }
        //pathRewrite: { '/api': '' } // 把/api 替换为空
      }
    }
  }
})

// 此接口已失效'http://39.98.123.211'   'http://localhost:3000'