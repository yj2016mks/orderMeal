import Vue from 'vue'
import Router from 'vue-router'
import UserLogins from '@/views/UserLogins'
import System from '@/views/System'
import Operator from '@/views/Operator'
import MyItems from '@/components/MyItems'
import _ from 'lodash';

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
    },{
      path: '/system',
      name: 'System',
      component: System
    },{
      path: '/operator',
      name: 'Operator',
      component: Operator
    }
  ]
})
