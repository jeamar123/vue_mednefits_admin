<template>
	<div class="corporate-plan-wrapper">
		
		<div class="plan-body">
			<div>
				<div class="current-plan-text">Current Plan: <span>Jan 2, 2019</span></div>
				<div class="current-active-text">
					<h4>Current Active Plans</h4>
				</div>
				<div class="active-cards-wrapper">
					<div v-for="x in 4" :key="x.index" class="active-plans-info">
						<div class="plan-header-container">
							<div>
								<span>Active Plan #1</span>
							</div>
							<div>
								<span>Active Plan ID #1</span>
							</div>
							<div class="cog-container">
								<i @click="showAccountPlanType()" class="fa fa-cog"></i>
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
							<div class="dependent-list-info-wrapper">
								<div class="dependent-list-info">
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
								<div class="dependent-list-info">
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
							<button class="btn-primary">SPENDING ACCOUNT SETTINGS</button>
							<button class="btn-primary">CREDIT ALLOCATION</button>
							<button class="btn-primary">VIEW PLAN</button>
						</div>
					</div>
					<div class="old-plan-active">
						<div class="current-plan-text">
							<h4>Old Active Plans</h4>
						</div>
						<div class="current-plan-text">
							<h4>Plan Date: <span>Feb 18, 2020</span></h4>
						</div>
						<div v-for="x in 4" :key="x.index" class="active-plans-info">
							<div class="plan-header-container">
								<div>
									<span>Active Plan #1</span>
								</div>
								<div>
									<span>Active Plan ID #1</span>
								</div>
								<div class="cog-container">
									<i @click="showAccountPlanType()" class="fa fa-cog"></i>
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
								<div class="dependent-list-info-wrapper">
									<div class="dependent-list-info">
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
									<div class="dependent-list-info">
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
								<button class="btn-primary">SPENDING ACCOUNT SETTINGS</button>
								<button class="btn-primary">CREDIT ALLOCATION</button>
								<button class="btn-primary">VIEW PLAN</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="planSelectorActive.value === 2">
				Credentials
			</div>
		</div>

		<!-- Modal -->
		<div>
			<Modal v-if="accountPlanTypeModal" class="employee-details-options select-account-plan-type">
				<div slot="header">
					<h1>Select Account/Plan Type</h1>
					<i @click="showAccountPlanType()" class="fa fa-times"></i>
				</div>
				<div slot="body">
					<div class="custom-checkbox-selector">
						<label class="selector-container">
							<span>Trial Plan</span>
							<input value="trial_plan" type="radio"/>
							<span class="custom-checkbox-checkmark"></span>
						</label>
						<label class="selector-container">
							<span>Insurance Bundle</span>
							<input value="trial_plan" type="radio"/>
							<span class="custom-checkbox-checkmark"></span>
						</label>
						<label class="selector-container">
							<span>Pro Plan</span>
							<input value="trial_plan" type="radio"/>
							<span class="custom-checkbox-checkmark"></span>
						</label>
						<label class="selector-container">
							<span>Lite Plan</span>
							<input value="trial_plan" type="radio"/>
							<span class="custom-checkbox-checkmark"></span>
						</label>
						<label class="selector-container">
							<span>Enterprise Plan</span>
							<input value="trial_plan" type="radio"/>
							<span class="custom-checkbox-checkmark"></span>
						</label>
					</div>
				</div>
				<div slot="footer">
					<button class="btn-primary">UPDATE ACCOUNT/PLAN TYPE</button>
				</div>
			</Modal>
		</div>

	</div>
</template>

<script>
	import corporatePlan from '@/components/corporates/corporatePlan'
	export default corporatePlan
</script>