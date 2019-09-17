import Vue from 'vue'
import Router from 'vue-router'


import Home from '../components/Home'
import Main from '../components/Main'
import SignUp from '../components/SignUp'
import Query from '../components/Query'
import QueryResult from '../components/QueryResult'

import AdminHome from '../components/adminComponents/AdminHome'
import Login from '../components/adminComponents/Login'
import AdminMain from '../components/adminComponents/AdminMain'
import EmailSystem from '../components/adminComponents/EmailSystem'
import InterViewSystem from '../components/adminComponents/InterViewSystem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: 'Main',
      component: Home,
      children: [
        {
          path: '/Main',
          name: 'Main',
          component: Main
        },

        {
          path: '/SignUp',
          name: 'SignUp',
          component: SignUp
        },

        {
          path: '/Query',
          name: 'Query',
          component: Query
        },
        {
          path: '/QueryResult',
          name: 'QueryResult',
          component: QueryResult
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Admin',
      name: 'AdminHome',
      component: AdminHome,
      redirect: 'Login',
      children: [
    
        {
          path: '/AdminMain',
          name: 'AdminMain',
          component: AdminMain
        },
        {
          path: '/InterViewSystem',
          name: 'InterViewSystem',
          component: InterViewSystem
        },
        {
          path: '/EmailSystem',
          name: 'EmailSystem',
          component: EmailSystem
        }
      ]
    }
  ]
})
