<template>
	<div class="corporate-details-wrapper">
    <div class="tab-container">
      <div class="tab" v-bind:class="{ 'active' : $route.name == 'BusinessDetails' }">Business Details</div>
      <div class="tab" v-bind:class="{ 'active' : $route.name == 'CorporatePlans' }">Plan</div>
      <div class="tab" v-bind:class="{ 'active' : $route.name == 'CorporateCredentials' }">Credentials</div>
      <div class="tab" v-bind:class="{ 'active' : $route.name == 'CorporateSpendingInvoice' }">Spending Invoice</div>
    </div>

    <div class="xs-tab-container">
      <div class="select-tab-box">
        <select class="tab-select">
          <option value="EmployeeInformation">Business Details</option>		
          <option value="DependentInformation">Plan</option>		
          <option value="ClaimSubmission">Credentials</option>		
          <option value="Entitlement">Spending Invoice</option>			
        </select>
        <i class="fa fa-caret-down"></i>
      </div>
    </div>
    <router-view name="childTab"></router-view>
	</div>
</template>

<script>
	import corporateDetails from '@/components/corporates/corporateDetails'
	export default corporateDetails
</script>