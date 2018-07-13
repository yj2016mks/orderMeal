import Vue from 'vue'
import Router from 'vue-router'
import UserLogins from '@/views/UserLogins'
import MyItems from '@/components/MyItems'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLogins',
      component: UserLogins
    },{
      path: '/myitems',
      name: 'MyItems',
      component: MyItems
    }
  ]
})
