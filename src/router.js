import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.serverUrl = 'http://mednefits.local';
axios.defaults.user_id = null;


import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'

import Clinic from './views/Clinic.vue'
import ClinicMenu from './views/clinic/ClinicMenu.vue'
import AddClinic from './views/clinic/AddClinic.vue'
import ClinicDetails from './views/clinic/ClinicDetails.vue'
import ClinicServices from './views/clinic/ClinicServices.vue'
import ClinicDoctors from './views/clinic/ClinicDoctors.vue'
import ClinicHours from './views/clinic/ClinicHours.vue'
import ClinicPayment from './views/clinic/ClinicPayment.vue'
import ClinicSettings from './views/clinic/ClinicSettings.vue'

import Corporates from './views/Corporates.vue'
import AddCorporate from './views/corporates/AddCorporate.vue'
import CorporateMenu from './views/corporates/CorporateMenu.vue'
import CorporateInformation from './views/corporates/CorporateInformation.vue'
import CorporateMemberList from './views/corporates/CorporateMemberList.vue'
import CorporateEmployeeMenu from './views/corporates/employee/CorporateEmployeeMenu.vue'
import CorporatePlan from './views/corporates/CorporatePlan.vue'
import SpendingInvoice from './views/corporates/SpendingInvoice.vue'
import CorporateEnrollment from './views/corporates/CorporateEnrollment.vue'
import BulkCreditAllocation from './views/corporates/BulkCreditAllocation.vue'
import CorporateSettings from './views/corporates/CorporateSettings.vue'
import EmployeeInformation from './views/corporates/employee/EmployeeInformation.vue'
import HealthPartnerAccess from './views/corporates/HealthPartnerAccess.vue'

import Analytics from './views/Analytics.vue'


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
      // meta: { auth: true },
      children: [
        //clinic 
        { name: 'Clinic', path: '/dashboard/clinic', component: Clinic },
        { 
          name: 'ClinicMenu', 
          path: '/dashboard/clinic/menu', 
          component: ClinicMenu,
          redirect: '/dashboard/clinic/menu/details',
          children: [
            { name: 'ClinicDetails', path: '/dashboard/clinic/menu/details', components: { child : ClinicDetails }  },
            { name: 'ClinicServices', path: '/dashboard/clinic/menu/services', components: { child : ClinicServices }  },
            { name: 'ClinicDoctors', path: '/dashboard/clinic/menu/doctors', components: { child : ClinicDoctors }  },
            { name: 'ClinicHours', path: '/dashboard/clinic/menu/peak-hours', components: { child : ClinicHours }  },
            { name: 'ClinicPayment', path: '/dashboard/clinic/menu/payments', components: { child : ClinicPayment }  },
            { name: 'ClinicSettings', path: '/dashboard/clinic/menu/settings', components: { child : ClinicSettings }  },
          ]
        },
        { name: 'AddClinic', path: '/dashboard/clinic/add', component: AddClinic },
        //corporates
        { name: 'Corporates', path: '/dashboard/corporates', component: Corporates },
        { name: 'HealthPartnerAccess', path: '/dashboard/health-partner-access', component: HealthPartnerAccess },
        { 
          name: 'CorporateMenu', 
          path: '/dashboard/corporates/menu', 
          component: CorporateMenu,
          redirect: '/dashboard/corporates/menu/info',
          children: [
            { name: 'CorporateInformation', path: '/dashboard/corporates/menu/info', components: { child : CorporateInformation }  },
            { name: 'CorporateMemberList', path: '/dashboard/corporates/menu/member-list', components: { child : CorporateMemberList }  },
            { name: 'CorporatePlan', path: '/dashboard/corporates/menu/corporate-plan', components: { child : CorporatePlan }  },
            { name: 'SpendingInvoice', path: '/dashboard/corporates/menu/spending-invoice', components: { child : SpendingInvoice }  },
            { name: 'CorporateEnrollment', path: '/dashboard/corporates/menu/enrollment', components: { child : CorporateEnrollment }  },
            { name: 'BulkCreditAllocation', path: '/dashboard/corporates/menu/bulk-credit-allocation', components: { child : BulkCreditAllocation }  },
            { name: 'CorporateSettings', path: '/dashboard/corporates/menu/settings', components: { child : CorporateSettings }  },
          ] 
        },
        { 
          name: 'CorporateEmployeeMenu', 
          path: '/dashboard/corporates/employee', 
          component: CorporateEmployeeMenu,
          redirect: '/dashboard/corporates/employee/info',
          children: [
            { name: 'EmployeeInformation', path: '/dashboard/corporates/employee/info', components: { child : EmployeeInformation }  },
          ]
        },
        { name: 'AddCorporate', path: '/dashboard/corporates/add', component: AddCorporate },


        { name: 'Analytics', path: '/dashboard/analytics', component: Analytics },
      ]
    },
    
  ]
})
