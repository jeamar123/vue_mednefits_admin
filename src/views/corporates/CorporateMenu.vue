<template>
	<div class="corporate-menu-container">

		<div class="left-box-wrapper">
			<div class="corporate-details-box">
				<router-link tag="a" :to="{ name: 'Corporates' }" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
				<img :src="'../assets/img/user-group.png'">
				<p class="corporate-name">
					Allan Company
				</p>

				<div class="company-basic-details">
					<div class="info-div">
						<label>Company Name</label>
						<p>MednefitsTech Inc.</p>
					</div>
					<div class="info-div">
						<label>Plan Start Date</label>
						<p>August 4, 2018</p>
					</div>
					<div class="info-div">
						<label>Plan End Date</label>
						<p>August 3, 2019</p>
					</div>
					<div class="info-div">
						<label>Days to Expire Plan</label>
						<p>24</p>
					</div>
				</div>
			</div>

			<div class="details-menu-wrapper">
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'CorporateInformation' }" v-on:click="selectCorporateView( 'CorporateInformation' )">
					<label>Information</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'CorporateMemberList' }" v-on:click="selectCorporateView( 'CorporateMemberList' )">
					<label>Member List</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'CorporatePlan' }" v-on:click="selectCorporateView( 'CorporatePlan' )">
					<label>Corporate Details</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'SpendingInvoice' }" v-on:click="selectCorporateView( 'SpendingInvoice' )">
					<label>Spending Invoice</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'CorporateEnrollment' }" v-on:click="selectCorporateView( 'CorporateEnrollment' )">
					<label>Enrollment</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'BulkCreditAllocation' }" v-on:click="selectCorporateView( 'BulkCreditAllocation' )">
					<label>Bulk Credit Allocation</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'EclaimTypeService' }" v-on:click="selectCorporateView( 'EclaimTypeService' )">
					<label>E-Claim - Claim Type Services</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'HealthPartnerAccess' }" v-on:click="selectCorporateView( 'HealthPartnerAccess' )">
					<label>Health Partnner Access</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'GcapPerVisit' }" v-on:click="selectCorporateView( 'GcapPerVisit' )">
					<label>GP - Cap per Visit</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : corporateViewStatus == 'CorporateSettings' }" v-on:click="selectCorporateView( 'CorporateSettings' )">
					<label>Settings</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
			</div>
		</div>

		<div class="right-box-wrapper">
			<router-view name="child"></router-view>
		</div>

  </div>
</template>

<script>
	import corporateMenu from '@/components/corporates/corporateMenu'
	export default corporateMenu
</script>
