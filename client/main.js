// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import layer from 'vue-layer'


import upperFirst from 'lodash/upperFirst'          
import camelCase from 'lodash/camelCase'

import './assets/css/default.css'
import './assets/css/public.css'
import './assets/iconfont/iconfont.css'

Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false
Vue.prototype.$http = axios

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(       //获取组件的 PascalCase 命名
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')           // 剥去文件名开头的 `'./` 和结尾的扩展名
    )
  )


  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.filter('intercept', function(value) {
  return value.split('')[0];
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
