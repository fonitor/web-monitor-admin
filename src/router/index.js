import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import jsError from '../views/js/error.vue'
import httpLog from '../views/http/index.vue'
import Project from '../views/project/index.vue'
import Page from '../views/page/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  }, {
    path: '/js/error',
    name: 'jsError',
    component: jsError,
    hidden: true
  }, {
    path: '/http/log',
    name: 'httpLog',
    component: httpLog,
    hidden: true
  }, {
    path: '/project/list',
    name: 'Project',
    component: Project,
    hidden: true
  }, {
    path: '/page/index',
    name: 'Page',
    component: Page,
    hidden: true
  }
]

export const asyncRouterMap = routes

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
