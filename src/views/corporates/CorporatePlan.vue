<template>
	<div class="corporate-plan-wrapper">
		<div class="plan-header">
			<ul>
				<li>
					<a @click="showPlanActive(0, 'business-details')" v-bind:class="{'active': planSelectorActive.value === 0}">Business Details</a>
				</li>
				<li>
					<a @click="showPlanActive(1, 'plan')" v-bind:class="{'active': planSelectorActive.value === 1}">Plan</a>
				</li>
				<li>
					<a @click="showPlanActive(2, 'credentials')" v-bind:class="{'active': planSelectorActive.value === 2}">Credentials</a>
				</li>
			</ul>
		</div>
		<div class="plan-body">
			<div v-if="planSelectorActive.value === 0">
				<div class="business-row-1">
					<div>
						<h3>Company Information</h3>
						<form>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Company Name</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Company Address</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Postal Code</label>
									<input type="text">
								</div>
							</div>
						</form>
					</div>
					<div>
						<div class="clinic-peak-status-container">
							<h3>Clinic Peak Status</h3>
							<div class="switch-container">
								<label class="switch">
								  <input type="checkbox">
								  <span class="slider round"></span>
								</label>
								<span>Peak Hour Status</span>
							</div>
						</div>
						<div class="spending-invoice-container">
							<h3>Spending Invoice Notification</h3>
							<div class="switch-container">
								<label class="switch">
								  <input type="checkbox">
								  <span class="slider round"></span>
								</label>
								<span>Notification Status</span>
							</div>
						</div>
					</div>
					<div>
						<h3>HR Account Status</h3>
						<div class="hr-status-container">
							<span>Status: <span>Active</span></span>
						</div>
						<div>
							<button class="btn-primary btn-deactive">DEACTIVE</button>
						</div>
					</div>
				</div>
				<div class="business-row-2">
					<div>
						<h3>Business Contact</h3>
						<form>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>First Name</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Last Name</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Email Address</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Phone Number</label>
									<input type="text">
								</div>
							</div>
							<label class="input-checkbox">
								<input type="checkbox">
								<span class="input-text">Send Email for Communication related</span>
								<span class="input-checkmark"></span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox">
								<span class="input-text">Send Email for Billing related</span>
								<span class="input-checkmark"></span>
							</label>
						</form>
					</div>
					<div>
						<h3>Billing Contact</h3>
						<form>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>First Name</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Last Name</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Email Address</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Phone Number</label>
									<input type="text">
								</div>
							</div>
							<label class="input-checkbox">
								<input type="checkbox">
								<span class="input-text">Send Email for Communication related</span>
								<span class="input-checkmark"></span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox">
								<span class="input-text">Send Email for Billing related</span>
								<span class="input-checkmark"></span>
							</label>
						</form>
					</div>
					<div>
						<h3>Benefits Specialist User</h3>
						<form>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Name</label>
									<input type="text">
								</div>
							</div>
							<div class="edit-dependent-row">
								<div class="employee-details-input-wrapper">
									<label>Code</label>
									<input type="text">
								</div>
							</div>
							<div>
								<button class="btn-primary">ADD</button>
							</div>
						</form>
					</div>
				</div>
				<div class="company-contacts-wrapper">
					<h3>Company Contacts</h3>
					<div class="company-contacts-card-wrapper">
						<div>
							<form>
								<div class="edit-dependent-row">
									<div class="employee-details-input-wrapper">
										<label>First Name</label>
										<input type="text">
									</div>
								</div>
								<div class="edit-dependent-row">
									<div class="employee-details-input-wrapper">
										<label>Last Name</label>
										<input type="text">
									</div>
								</div>
							</form>
						</div>
						<div>
							<form>
								<div class="edit-dependent-row">
									<div class="employee-details-input-wrapper">
										<label>Email Address</label>
										<input type="text">
									</div>
								</div>
								<div class="edit-dependent-row">
									<div class="employee-details-input-wrapper">
										<label>Phone Number</label>
										<input type="text">
									</div>
								</div>
								<label class="input-checkbox">
									<input type="checkbox">
									<span class="input-text">Send Email for Communication related</span>
									<span class="input-checkmark"></span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox">
									<span class="input-text">Send Email for Billing related</span>
									<span class="input-checkmark"></span>
								</label>
							</form>
						</div>
						<div>
							<button class="btn-remove-contacts">REMOVE</button>
						</div>
					</div>	
				</div>
				<div class="plan-btn-footer">
					<button class="btn-primary">Add More Contact</button>
					<button class="btn-primary">UPDATE</button>
				</div>
			</div>
			<div v-if="planSelectorActive.value === 1">
				<div class="current-plan-text">Current Plan: <span>Jan 2, 2019</span></div>
				<div class="current-active-text">
					<h4>Current Active Plans</h4>
				</div>
				<div class="active-cards-wrapper">
					<div class="active-plans-info">
						<div class="plan-header-container">
							<div>
								<span>Active Pan #1</span>
							</div>
							<div>
								<span>Active Pan ID #1</span>
							</div>
						</div>
						<div class="account-container employee-account-container">
							<div class="account-title">Employee Account</div>
							<div>
								<span>Plan Type: </span>
								<span>Pro Plan</span>
							</div>
							<div>
								<span>Start Date: </span>
								<span>2018-01-03</span>
							</div>
							<div>
								<span>Plan Duration: </span>
								<span>12 months</span>
							</div>
							<div>
								<span>Total Seats: </span>
								<span>4</span>
							</div>
							<div>
								<span>Occupied Seats: </span>
								<span>0</span>
							</div>
							<div>
								<span>Vacant Seats: </span>
								<span>0</span>
							</div>
							<div>
								<span>Plan Amount: </span>
								<span><span>SGD </span> <span>360.00</span></span>
							</div>
							<div>
								<span>Payment Status: </span>
								<span>PENDING</span>
							</div>
						</div>
						<div class="account-container dependent-account-container">
							<div class="account-title">Dependent Accounts</div>
							<div>
								<span>Plan Type: </span>
								<span>Pro Plan</span>
							</div>
							<div>
								<span>Start Date: </span>
								<span>2018-01-03</span>
							</div>
							<div>
								<span>Plan Duration: </span>
								<span>12 months</span>
							</div>
							<div>
								<span>Total Seats: </span>
								<span>4</span>
							</div>
							<div>
								<span>Occupied Seats: </span>
								<span>0</span>
							</div>
							<div>
								<span>Vacant Seats: </span>
								<span>0</span>
							</div>
							<div>
								<span>Plan Amount: </span>
								<span><span>SGD </span> <span>360.00</span></span>
							</div>
							<div>
								<span>Payment Status: </span>
								<span>PENDING</span>
							</div>
						</div>
						<div class="account-container plan-extension-container">
							<div class="account-title">Plan Extension</div>
							<div>
								<span>Plan Type: </span>
								<span>Pro Plan</span>
							</div>
							<div>
								<span>Start Date: </span>
								<span>2018-01-03</span>
							</div>
							<div>
								<span>Plan Duration: </span>
								<span>12 months</span>
							</div>
							<div>
								<span>Total Seats: </span>
								<span>4</span>
							</div>
							<div>
								<span>Occupied Seats: </span>
								<span>0</span>
							</div>
							<div>
								<span>Vacant Seats: </span>
								<span>0</span>
							</div>
							<div>
								<span>Plan Amount: </span>
								<span><span>SGD </span> <span>360.00</span></span>
							</div>
							<div>
								<span>Payment Status: </span>
								<span>PENDING</span>
							</div>
						</div>
						<div class="account-container spending-account-container">
							<div>
								<div class="account-title">Medical Spending Account:</div>
								<div>
									<span>Total: </span>
									<span><span>SGD </span>1,074,509.90</span>
								</div>
								<div>
									<span>Unallocated: </span>
									<span><span>SGD </span>1,074,509.90</span>
								</div>
							</div>
							<div>
								<div class="account-title">Wellness Spending Account:</div>
								<div>
									<span>Total: </span>
									<span><span>SGD </span>1,074,509.90</span>
								</div>
								<div>
									<span>Unallocated: </span>
									<span><span>SGD </span>1,074,509.90</span>
								</div>
							</div>
						</div>
						<div>
							<button class="btn-primary">CREATE DEPEDENT ACCOUNT</button>
							<button class="btn-primary">CREDIT ALLOCATION</button>
							<button class="btn-primary">VIEW PLAN</button>
						</div>
					</div>
					
				</div>
			</div>
			<div v-if="planSelectorActive.value === 2">
				Credentials
			</div>
		</div>
	</div>
</template>

<script>
	import corporatePlan from '@/components/corporates/corporatePlan'
	export default corporatePlan
</script>