<template>
	<div class="settings-wrapper">
		<h1 class="header-title">Settings</h1>

		<div class="settings-menu-box">
			<router-link tag="div" class="menu-item" :to="{ name : 'AddHeadCount' }">
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

			<router-link tag="div" class="menu-item" :to="{ name : 'AddEmployeeDependent' }">
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
			
			<div @click="___downloadEmployeeLists()" class="menu-item">
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

			<div @click="___loginCompanyAccount()" class="menu-item">
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

			<div class="menu-item" v-on:click="_toggleDownloadEclaimModal()">
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

			<router-link tag="div" class="menu-item" :to="{ name : 'GpcapPerVisit' }">
				<div class="img-wrapper">
					<img :src="'../assets/img/settings-icons/cap-visit.png'">
				</div>
				<div class="item-desc">
					GP - Cap per Visit
				</div>
			</router-link>

		</div>

		<div>
			<Modal v-if="global_isEclaimDownloadModalShow" class="download-eclaim-receipts-modal">
				<div slot="header">
					<h1>Download Eclaim Receipts</h1>
				</div>
				<div slot="body">
					<div class="columns">
						<div class="column is-8 date-selection">
							<div class="form-box">
								<label>Choose Dates</label>
								<div class="dp-flex">
									<div class="date-container vDatepicker flex-1">
										<v-date-picker 
											popoverDirection="bottom" 
											v-model="global_downloadEclaimData.selected_date"
											:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus" 
											:formats='formats'></v-date-picker>
										<i class="fa fa-caret-down"></i>
									</div>
									<button class="btn-primary btn-add" :disabled="true">Add</button>
								</div>
							</div>

							<div class="selected-month-list">
								<div v-for="list in [1,2,3,4]" class="month">
									January 2020 <i class="fa fa-times"></i>
								</div>
							</div>
						</div>
						<div class="column is-4">
							<p class="filter-text">Filters:</p>
							<div class="filter-list">
								<label>
									<input type="checkbox" ng-model="global_downloadEclaimData.filters.all">
									All
									<span class="checkmark"></span>
								</label>
								<label>
									<input type="checkbox" ng-model="global_downloadEclaimData.filters.approved">
									Approved
									<span class="checkmark"></span>
								</label>
								<label>
									<input type="checkbox" ng-model="global_downloadEclaimData.filters.rejected">
									Rejected
									<span class="checkmark"></span>
								</label>
								<label>
									<input type="checkbox" ng-model="global_downloadEclaimData.filters.pending">
									Pending
									<span class="checkmark"></span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button v-on:click="_toggleDownloadEclaimModal()" class="btn-close">CANCEL</button>
					<button class="btn-primary" :disabled="true" v-on:click="_downloadEclaimReceipts( )">SUBMIT</button>
				</div>
			</Modal>
		</div>
	</div>
</template>

<script>
	import corporateSettings from '@/components/corporates/corporateSettings'
	export default corporateSettings
</script>