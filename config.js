let env = 'develop'

// 防止我们在上传代码时，没有将env改成production
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion

if (envVersion === 'release' && env !== 'production') {
  env = 'production'
}

export default {
  env,
  baseUrl: {
    develop: 'http://127.0.0.1:3000',
    production: 'http://api.xxx.com'
  }
}