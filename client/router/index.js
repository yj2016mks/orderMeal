import Vue from 'vue'
import Router from 'vue-router'
import UserLogins from '@/views/UserLogins'
import System from '@/views/System'
import Operator from '@/views/Operator'
import Consumer from '@/views/Consumer'
import _ from 'lodash';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLogins',
      component: UserLogins
    },{
      path: '/consumer',
      name: 'Consumer',
      component: Consumer
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
