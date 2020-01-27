<template>
	<div class="employee-menu-container">

		<div class="left-box-wrapper">
			<div class="corporate-details-box">
				<router-link tag="a" :to="{ name: 'CorporateMemberList' }" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
				<img :src="'../assets/img/overview.png'">
				<p class="corporate-name">
					Allan Cheams Alzulas
				</p>
			</div>

			<div class="emp-status-wrapper">
				<div class="label-text">
					<label>Status</label>
				</div>
				<div class="status-div active">
					<p>Active <span class="oi" data-glyph="media-record" aria-hidden="true"></span></p>
				</div>
			</div>
			<div class="plan-info-wrapper">
				<p class="p-label">Plan Information</p>
				<div class="white-space-20"></div>
				<div class="row-div">
					<div class="label-text">
						<label>Plan</label>
					</div>
					<div class="status-div">
						<p>Employee - Insurance Bundle</p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Plan Covers</label>
					</div>
					<div class="status-div">
						<p><span>1</span> People</p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Start Date</label>
					</div>
					<div class="status-div">
						<p>July 04, 2019</p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>End Date</label>
					</div>
					<div class="status-div">
						<p>August 03, 2019</p>
					</div>
				</div>
			</div>
			<div class="spending-wrapper">
				<p class="p-label">Medical Spending Account</p>
				<div class="white-space-20"></div>
				<div class="row-div">
					<div class="label-text">
						<label>Allocation</label>
					</div>
					<div class="status-div">
						<p>S$<span>0.00</span></p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Usage</label>
					</div>
					<div class="status-div">
						<p>S$<span>0.00</span></p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Balance</label>
					</div>
					<div class="status-div">
						<p>S$<span>0.00</span></p>
					</div>
				</div>
				<div class="white-space-10"></div>
				<div class="white-space-20"></div>
				<p class="p-label">Wellness Spending Account</p>
				<div class="white-space-20"></div>
				<div class="row-div">
					<div class="label-text">
						<label>Allocation</label>
					</div>
					<div class="status-div">
						<p>S$<span>0.00</span></p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Usage</label>
					</div>
					<div class="status-div">
						<p>S$<span>0.00</span></p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Balance</label>
					</div>
					<div class="status-div">
						<p>S$<span>0.00</span></p>
					</div>
				</div>

				<button class="btn btn-primary btn-access-account">Access Account</button>
			</div>
		</div>

		<div class="right-box-wrapper">
			<router-view name="child"></router-view>
		</div>
		
  </div>
</template>

<script>
	import corporateEmployeeMenu from '@/components/corporates/employee/corporateEmployeeMenu'
	export default corporateEmployeeMenu
</script>
