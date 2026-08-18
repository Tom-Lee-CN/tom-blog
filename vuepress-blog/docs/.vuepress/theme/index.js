import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

// 自定义极简主题（node 端定义）
// 布局组件在 client.js 中注册，此处只定义主题元数据与客户端配置入口
export default {
  name: 'minimal-theme',
  clientConfigFile: path.resolve(__dirname, './client.js'),
  userStyle: '.vuepress/styles/index.scss'
}
