<template>
	<div class="settings-wrapper">
		<h1 class="header-title">Settings</h1>

		<div class="settings-menu-box">
			<router-link tag="div" class="menu-item" :to="{ name : 'GcapPerVisit' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/group.png'">
				</div>
				<div class="item-desc">
					Add Head Count
				</div>
			</router-link>

			<router-link tag="div" class="menu-item" :to="{ name : 'EnrollmentMethodOption' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/user.png'">
				</div>
				<div class="item-desc">
					Add Employee
				</div>
			</router-link>

			<router-link tag="div" class="menu-item" :to="{ name : 'GcapPerVisit' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/user.png'">
				</div>
				<div class="item-desc">
					Add Employee Dependent
				</div>
			</router-link>
			
			<router-link tag="div" class="menu-item" :to="{ name : 'BulkCreditAllocation' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/credit-card.png'">
				</div>
				<div class="item-desc">
					Bulk Credit Allocation
				</div>
			</router-link>
			
			<div class="menu-item">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/download.png'">
				</div>
				<div class="item-desc">
					Download Employee Lists and Credits Left
				</div>
			</div>

			<div class="menu-item">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/send.png'">
				</div>
				<div class="item-desc">
					Resend Employee Welcome Email
				</div>
			</div>

			<div class="menu-item">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/unlocked.png'">
				</div>
				<div class="item-desc">
					Access Account
				</div>
			</div>

			<router-link tag="div" class="menu-item" :to="{ name : 'ResetCompanyCredits' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/refresh.png'">
				</div>
				<div class="item-desc">
					Reset Company Credit Allocation
				</div>
			</router-link>

			<router-link tag="div" class="menu-item" :to="{ name : 'HealthPartnerAccess', params: { id: customer_id, type: 'company' } }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/key.png'">
				</div>
				<div class="item-desc">
					Health Partner Access
				</div>
			</router-link>

			<div class="menu-item">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/download.png'">
				</div>
				<div class="item-desc">
					Download E-Claim Receipts
				</div>
			</div>

			<router-link tag="div" class="menu-item" :to="{ name : 'ClaimTypeServices' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/claim-type.png'">
				</div>
				<div class="item-desc">
					E-Claim - Claim Type Services
				</div>
			</router-link>

			<router-link tag="div" class="menu-item" :to="{ name : 'GcapPerVisit' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/cap-visit.png'">
				</div>
				<div class="item-desc">
					GP - Cap per Visit
				</div>
			</router-link>

		</div>
	</div>
</template>

<script>
	import corporateSettings from '@/components/corporates/corporateSettings'
	export default corporateSettings
</script>