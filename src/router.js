import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL;
// axios.defaults.serverUrl = 'http://localhost:3000';
axios.defaults.serverUrl = 'http://api-admin.medicloud.sg';
axios.defaults.user_id = null;


import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'

//Clinic
import Clinic from './views/Clinic.vue'
import ClinicMenu from './views/clinic/ClinicMenu.vue'
import AddClinic from './views/clinic/AddClinic.vue'
import ClinicDetails from './views/clinic/ClinicDetails.vue'
import ClinicServices from './views/clinic/ClinicServices.vue'
import ClinicDoctors from './views/clinic/ClinicDoctors.vue'
import ClinicHours from './views/clinic/ClinicHours.vue'
import ClinicPayment from './views/clinic/ClinicPayment.vue'
import ClinicSettings from './views/clinic/ClinicSettings.vue'
// End Clinic

// Corporates
import Corporates from './views/Corporates.vue'
import AddCorporate from './views/corporates/AddCorporate.vue'
import CorporateMenu from './views/corporates/CorporateMenu.vue'
import CorporateInformation from './views/corporates/CorporateInformation.vue'
import CorporateMemberList from './views/corporates/CorporateMemberList.vue'

import CorporatePlan from './views/corporates/CorporatePlan.vue'
import SpendingInvoice from './views/corporates/SpendingInvoice.vue'
import BulkCreditAllocation from './views/corporates/BulkCreditAllocation.vue'
import CorporateSettings from './views/corporates/CorporateSettings.vue'

  // Corporate Employee Information
  import CorporateEmployeeMenu from './views/corporates/employee/CorporateEmployeeMenu.vue'
  import EmployeeInformation from './views/corporates/employee/EmployeeInformation.vue'
  import DependentInformation from './views/corporates/employee/DependentInformation.vue'
  import ClaimSubmission from './views/corporates/employee/ClaimSubmission.vue'
  import Entitlement from './views/corporates/employee/Entitlement.vue'
  import EmployeeSettings from './views/corporates/employee/EmployeeSettings.vue'
  // Corporate Add Employee
  import AddEmployeeEntitlementOption from './views/corporates/enrollment/AddEmployeeEntitlementOption.vue' 
  import EnrollmentMethodOption from './views/corporates/enrollment/EnrollmentMethodOption.vue' 
  import EnrollmentExcelImport from './views/corporates/enrollment/EnrollmentExcelImport.vue' 

  // Corporate Settings
  import HealthPartnerAccess from './views/corporates/HealthPartnerAccess.vue'
  import EclaimTypeService from './views/corporates/EclaimTypeService.vue'
  import GcapPerVisit from './views/corporates/GcapPerVisit.vue'
  // Plan Renewal Feature
  import PlanRenewal from './views/corporates/PlanRenewal.vue'
  import PlanDetails from './views/corporates/plan-renewal/PlanDetails.vue'
  import MemberDetails from './views/corporates/plan-renewal/MemberDetails.vue'
  import SpendingRenewalDetails from './views/corporates/plan-renewal/SpendingRenewalDetails.vue'
  import SpendingAccountRenewal from './views/corporates/plan-renewal/SpendingAccountRenewal.vue'
// End Corporates

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
        { name: 'Corporates', path: '/dashboard/corporates', component: Corporates},
        { 
          name: 'CorporateMenu', 
          path: '/dashboard/corporates/:company_name-:customer_id', 
          component: CorporateMenu,
          redirect: '/dashboard/corporates/:company_name-:customer_id/member-list',
          props: true,
          children: [
            { name: 'CorporateInformation', path: '/dashboard/corporates/:company_name-:customer_id/info', components: { child : CorporateInformation }  },
            { name: 'CorporateMemberList', path: '/dashboard/corporates/:company_name-:customer_id/member-list', components: { child : CorporateMemberList }, props: { child: true}  },
            { name: 'CorporatePlan', path: '/dashboard/corporates/:company_name-:customer_id/corporate-plan', components: { child : CorporatePlan } , props: { child: true}  },
            { name: 'SpendingInvoice', path: '/dashboard/corporates/:company_name-:customer_id/spending-invoice', components: { child : SpendingInvoice } , props: { child: true} },
            { name: 'BulkCreditAllocation', path: '/dashboard/corporates/:company_name-:customer_id/bulk-credit-allocation', components: { child : BulkCreditAllocation }, props: { child: true}  },
            // { name: 'HealthPartnerAccess', path: '/dashboard/corporates/menu/health-partner-access', components: { child : HealthPartnerAccess} },
            { name: 'EclaimTypeService', path: '/dashboard/corporates/:company_name-:customer_id/eclaim-type-service', components: { child : EclaimTypeService} , props: { child: true} },
            { name: 'GcapPerVisit', path: '/dashboard/corporates/:company_name-:customer_id/gp-cap-per-visit', components: { child : GcapPerVisit}, props: { child: true} },
            { name: 'PlanRenewal', path: '/dashboard/corporates/:company_name-:customer_id/plan-renewal', components: { child : PlanRenewal}, props: { child: true},
              children : [
                { name: 'PlanRenewalDetails', path: '/dashboard/corporates/:company_name-:customer_id/plan-renewal/details', components: { child : PlanDetails} },
                { name: 'PlanRenewalMemberDetails', path: '/dashboard/corporates/:company_name-:customer_id/plan-renewal/member', components: { child : MemberDetails} },
                { name: 'PlanRenewalSpendingAccount', path: '/dashboard/corporates/:company_name-:customer_id/plan-renewal/spending-account', components: { child : SpendingRenewalDetails}, props:true },
              ]
            },
            { name: 'PlanRenewalSpendingRenewal', path: '/dashboard/corporates/:company_name-:customer_id/pending-renewal', components: { child : SpendingAccountRenewal}, props:true },
            { name: 'CorporateSettings', path: '/dashboard/corporates/:company_name-:customer_id/settings', components: { child : CorporateSettings }, props: { child: true }  },
            { name: 'AddEmployeeEntitlementOption', path: '/dashboard/corporates/:company_name-:customer_id/enrollment/entitlement', components: { child : AddEmployeeEntitlementOption }, props: { child: true}  },
            { name: 'EnrollmentMethodOption', path: '/dashboard/corporates/:company_name-:customer_id/enrollment/method', components: { child : EnrollmentMethodOption }, props: { child: true}  },
            { name: 'EnrollmentExcelImport', path: '/dashboard/corporates/:company_name-:customer_id/enrollment/method', components: { child : EnrollmentExcelImport }, props: { child: true}  },
          ] 
        },
        { 
          name: 'CorporateEmployeeMenu', 
          path: '/dashboard/corporates/:company_name-:customer_id/', 
          component: CorporateEmployeeMenu,
          redirect: '/dashboard/corporates/:company_name-:customer_id/:name-:member_id',
          props:true,
          children: [
            { name: 'EmployeeInformation', path: '/dashboard/corporates/:company_name-:customer_id/:name-:member_id', components: { child : EmployeeInformation } , props: { child: true}},
            { name: 'DependentInformation', path: '/dashboard/corporates/:company_name-:customer_id/:name-:member_id/dependent', components: { child : DependentInformation }, props: { child: true}  },
            { name: 'ClaimSubmission', path: '/dashboard/corporates/:company_name-:customer_id/:name-:member_id/claim_submission', components: { child : ClaimSubmission }, props: { child: true}  },
            { name: 'Entitlement', path: '/dashboard/corporates/:company_name-:customer_id/:name-:member_id/entitlement', components: { child : Entitlement }, props: { child: true}  },
            { name: 'EmployeeSettings', path: '/dashboard/corporates/:company_name-:customer_id/:name-:member_id/settings', components: { child : EmployeeSettings }, props: { child: true}  },
          ]
        },
        { name: 'AddCorporate', path: '/dashboard/corporates/add', component: AddCorporate },
        { name: 'HealthPartnerAccess', path: '/dashboard/health-partner-access/:type-:id', component: HealthPartnerAccess , props: true},

        { name: 'Analytics', path: '/dashboard/analytics', component: Analytics },
      ]
    },
    
  ]
})
