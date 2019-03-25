import Vue from 'vue'
import Router from 'vue-router'
import store  from './store'

import Auth from './views/Auth.vue'
import Signin from './components/auth/signin.vue'
import Signup from './components/auth/signup.vue'

import Welcome from './views/Welcome.vue'
import Home from './views/Home.vue'
import NotFound from './views/404.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'welcome',
      path: '/',
      component: Welcome
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {
          path: 'signin',
          component: Signin
        },
        {
          path: 'signup',
          component: Signup
        }
      ],
      beforeEnter (to, from, next) {
        if (!store.getters.getAuth) {
          next()
        }
      }
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      beforeEnter (to, from, next) {
        if (store.getters.getAuth) {
          next()
        } else {
          next('/auth/signin')
        }
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
