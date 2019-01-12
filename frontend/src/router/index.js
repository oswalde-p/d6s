import Vue from 'vue'
import Router from 'vue-router'
import Overview from '@/components/overview'
import Submit from '@/components/submit'
import Home from '@/components/home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/newEntry',
    name: 'New Entry',
    component: Submit
  }
]

export default new Router({ routes })
