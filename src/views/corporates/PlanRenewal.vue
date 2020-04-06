<template>
	<div class="plan-renewal-wrapper">
		<div class="renewal-header">
			<h1 class="plan-renewal-title">Plan Renewal</h1>

			<ul class="renewal-selector dp-flex">
				<li @click="_goToTab_( 'PlanRenewalDetails' )" v-bind:class="{ 'active' : $route.name == 'PlanRenewalDetails' }">Plan Details</li>
				<li @click="_goToTab_( 'PlanRenewalMemberDetails' )" v-bind:class="{ 'active' : $route.name == 'PlanRenewalMemberDetails' }">Member Details</li>
				<li @click="_goToTab_( 'PlanRenewalSpendingAccount' )" v-bind:class="{ 'active' : $route.name == 'PlanRenewalSpendingAccount' }">Spending Account Renewal Details</li>
			</ul>

			<div class="emp-tab-box">
				<div class="dp-flex-ai">
					<select class="emp-tab-select" v-model="activeTab" v-on:change="_goToTab_( activeTab )">
						<option value="PlanRenewalDetails">Plan Details</option>		
						<option value="PlanRenewalMemberDetails">Member Details</option>		
						<option value="PlanRenewalSpendingAccount">Spending Account details</option>		
					</select>
					<i class="fa fa-caret-down"></i>
				</div>
			</div>
		</div>
		
		<router-view name="child"></router-view>
	</div>
</template>

<script>
	import planRenewal from '@/components/corporates/planRenewal'
	export default planRenewal
</script>