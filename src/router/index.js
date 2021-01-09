import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/index.vue'
import JsError from '../views/Js/error.vue'
import httpLog from '../views/Index/index.vue'
import httpError from '../views/Index/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/js/error',
    name: 'JsError',
    component: JsError
  }, {
    path: '/http/log',
    name: 'httpLog',
    component: httpLog
  }, {
    path: '/http/error',
    name: 'httpError',
    component: httpError
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
