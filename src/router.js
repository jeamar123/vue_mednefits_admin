import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.serverUrl = 'http://mednefits.local';
axios.defaults.user_id = null;


import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'
import Clinic from './views/Clinic.vue'
import ClinicDetails from './views/clinic/ClinicDetails.vue'
import AddClinic from './views/clinic/AddClinic.vue'


Vue.use(Router)
Vue.use(axios)


export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  linkActiveClass: 'router-active',
  routes: [
    { path: '*', redirect: '/auth'},
    { path: '/auth', name: 'Auth', component: Auth },
    {
      path: '/dashboard',
      name: 'Dashboard',
      // redirect: '/auth',
      component: Dashboard,
      meta: { auth: true },
      children: [
        //clinic 
        { name: 'Clinic', path: '/dashboard/clinic', component: Clinic},
        { name: 'ClinicDetails', path: '/dashboard/clinic/details/:clinic_id', component: ClinicDetails},
        { name: 'AddClinic', path: '/dashboard/clinic/add', component: AddClinic},
      ]
    },
    
  ]
})
