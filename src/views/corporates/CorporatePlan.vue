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
							<button @click="_showCorporatePlanModal_('create-dependent-account')" class="btn-primary">CREATE DEPEDENT ACCOUNT</button>
							<button @click="_showCorporatePlanModal_('spending-account-settings')" class="btn-primary">SPENDING ACCOUNT SETTINGS</button>
							<button @click="_showCorporatePlanModal_('credit-allocation')" class="btn-primary">CREDIT ALLOCATION</button>
							<button @click="_showCorporatePlanModal_('view-plan')" class="btn-primary">VIEW PLAN</button>
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

			<Modal v-if="global_isViewPlanModalShow" class="view-plans-modal">
				<div slot="header">
					<h1 v-if="!global_isRecordPaymentShow">View Plan</h1>
					<h1 v-if="global_isRecordPaymentShow">Record Payment</h1>
				</div>
				<div slot="body">
					<div v-if="!global_isRecordPaymentShow" class="account-list-container">
						<div class="account-list-box employee-accounts-container">
							<div class="header-title">
								Transactions
							</div>
							<div class="columns transaction-box align-items-center">
								<div class="column">
									<p class="col-title"><label>Employee Account</label></p>
									<p><label>Plan Type:</label> <span>Pro Plan</span></p>
									<p><label>Invoice:</label> <span>OMC000012</span></p>
									<p><label>Start Date:</label> <span>2018-01-03</span></p>
									<p><label>Plan Duration:</label> <span>12 months</span></p>
									<p><label>Total Seats:</label> <span>4</span></p>
									<p><label>Occupied Seats:</label> <span>4</span></p>
									<p><label>Vacant Seats:</label> <span>0</span></p>
									<p><label>Plan Amount:</label> <span><span class="txt-uppercase">SGD</span> 360.00</span></p>
									<p><label>Payment Status:</label> <span>PENDING</span></p>
								</div>
								<div class="column">
									<button class="btn-blue">Edit Plan</button>
									<button class="btn-gray" v-on:click="_downloadInvoice_()">Download Invoice</button>
									<button class="btn-blue">0 Pending Enrollment</button>
									<button class="btn-primary" v-on:click="toggleRecordPayment()">Record Payment</button>
								</div>
							</div>
						</div>

						<div class="account-list-box dependent-accounts-container">
							<div class="header-title">
								Dependent Account
							</div>
							<div v-for="list in 3" class="columns transaction-box align-items-center">
								<div class="column">
									<p class="col-title"><label>Plan Account Type:</label> <span>Lite Plan</span></p>
									<p><label>Account Plan Type:</label> <span>Active Plan</span></p>
									<p><label>Start Date:</label> <span>2018-01-03</span></p>
									<p><label>Total Seats:</label> <span>4</span></p>
									<p><label>Occupied Seats:</label> <span>4</span></p>
									<p><label>Vacant Seats:</label> <span>0</span></p>
									<p><label>Plan Amount:</label> <span><span class="txt-uppercase">SGD</span> 360.00</span></p>
									<p><label>Payment Status:</label> <span>PENDING</span></p>
								</div>
								<div class="column">
									<button class="btn-blue">Edit Plan</button>
									<button class="btn-gray" v-on:click="_downloadInvoice_()">Download Invoice</button>
									<button class="btn-blue">0 Pending Enrollment</button>
									<button class="btn-primary" v-on:click="toggleRecordPayment()">Record Payment</button>
								</div>
							</div>
						</div>

						<div class="account-list-box spending-deposit-accounts-container">
							<div class="header-title">
								Spending Deposit Account
							</div>
							<div v-for="list in 2" class="columns transaction-box align-items-center">
								<div class="column">
									<p><label>Invoice:</label> <span>DEP000016</span></p>
									<p><label>Total Credits:</label> <span><span class="txt-uppercase">SGD</span> 10,000.00</span></p>
									<p><label>(Wellness)</label></p>
									<p><label>Deposit:</label> <span><span class="txt-uppercase">SGD</span> 360.00</span></p>
									<p><label>Payment Status:</label> <span>PENDING</span></p>
								</div>
								<div class="column">
									<button class="btn-gray" v-on:click="_downloadInvoice_()">Download Invoice</button>
									<button class="btn-primary" v-on:click="toggleRecordPayment()">Record Payment</button>
									<button class="btn-primary">Edit Deposit</button>
									<button class="btn-primary">Mark as unpaid</button>
								</div>
							</div>
						</div>
						
						<div class="account-list-box employee-refunds-container">
							<div class="header-title">
								Employee Refund
							</div>
							<div v-for="list in 2" class="columns transaction-box align-items-center">
								<div class="column">
									<p><label>Cancellation No.:</label> <span>OMC000010A</span></p>
									<p><label>Employees:</label> <span>1</span></p>
									<p><label>Refund Amount:</label> <span><span class="txt-uppercase">SGD</span> 00.00</span></p>
									<p><label>Payment Status:</label> <span>PENDING</span></p>
									<p><label>Paid Amount:</label> <span>0</span></p>
									<p><label>Date Refunded:</label> <span>2018-01-04</span></p>
									<p><label>Date Paid:</label> <span>2018-01-04</span></p>
									<p><label>Payment Remarks:</label> <span>Notes</span></p>
								</div>
								<div class="column">
									<button class="btn-gray">Download</button>
									<button class="btn-primary">Record Refund</button>
								</div>
							</div>
						</div>

						<div class="account-list-box dependent-refunds-container">
							<div class="header-title">
								Dependent Refund
							</div>
							<div v-for="list in 2" class="columns transaction-box align-items-center">
								<div class="column">
									<p><label>Cancellation No.:</label> <span>OMC000010A</span></p>
									<p><label>Employees:</label> <span>1</span></p>
									<p><label>Refund Amount:</label> <span><span class="txt-uppercase">SGD</span> 00.00</span></p>
									<p><label>Payment Status:</label> <span>PENDING</span></p>
									<p><label>Paid Amount:</label> <span>0</span></p>
									<p><label>Date Refunded:</label> <span>2018-01-04</span></p>
									<p><label>Date Paid:</label> <span>2018-01-04</span></p>
									<p><label>Payment Remarks:</label> <span>Notes</span></p>
								</div>
								<div class="column">
									<button class="btn-gray">Download</button>
									<button class="btn-primary">Record Refund</button>
								</div>
							</div>
						</div>

						<div class="account-list-box plan-extension-container">
							<div class="header-title">
								Plan Extension
							</div>
							<div v-for="list in 1" class="columns transaction-box align-items-center">
								<div class="column">
									<p><label>Account Type:</label> <span>Pro Plan</span></p>
									<p><label>Invoice:</label> <span>OMC000039</span></p>
									<p><label>Plan Duration:</label> <span>12 months</span></p>
									<p><label>Employees:</label> <span>1</span></p>
									<p><label>Plan Amount:</label> <span><span class="txt-uppercase">SGD</span> 00.00</span></p>
									<p><label>Payment Status:</label> <span>PENDING</span></p>

								</div>
								<div class="column">
									<button class="btn-blue">Edit Plan</button>
									<button class="btn-gray" v-on:click="_downloadInvoice_()">Download Invoice</button>
									<button class="btn-primary" v-on:click="toggleRecordPayment()">Record Payment</button>
									<button class="btn-gray" v-on:click="_downloadInvoice_(null,'receipt')">Download Receipt</button>
									
								</div>
							</div>
						</div>
					</div>

					<div v-if="global_isRecordPaymentShow" class="record-payment-container">
						<div class="columns">
							<div class="column is-6">
								<div class="form-box">
									<label>Paid Amount</label>
									<input type="number">
								</div>
							</div>
							<div class="column is-6">
								<div class="form-box">
									<label>Date Received</label>
									<div class="date-container vDatepicker">
										<v-date-picker 
											popoverDirection="bottom" 
											v-model="global_recordPayment.date_received"
											:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus" 
											:formats='formats'></v-date-picker>
										<i class="fa fa-caret-down"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="columns">
							<div class="column is-6">
								<div class="form-box">
									<label>Payment Remarks</label>
									<input type="text">
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div slot="footer">
					<button v-if="global_isRecordPaymentShow" class="btn-close" v-on:click="toggleRecordPayment()">Back</button>
					<button v-if="global_isRecordPaymentShow" class="btn-primary" v-on:click="toggleRecordPayment()">Update</button>
					<button v-if="!global_isRecordPaymentShow" class="btn-close" v-on:click="toggleClosePlanModal()">Close</button>
				</div>
			</Modal>

			<Modal v-if="global_isCreateDependentModalShow" class="create-dependent-account-modal corporate-details-modal">
				<div slot="header">
					<h1>Create Dependent Account</h1>					
				</div>
				<div slot="body">
					<h4>Dependent Account</h4>
					<div class="row-div dp-flex">			
						<div class="start-date-container create-dependent-input-wrapper">
							<label>Start Date</label>
							<div class="date-container vDatepicker">
								<v-date-picker 
									popoverDirection="bottom" 
									v-model="global_recordPayment.date_received"
									:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
									popover-visibility="focus" 
									:formats='formats'></v-date-picker>
								<i class="fa fa-caret-down"></i>
							</div>
						</div>
						<div></div>
						<div></div>
					</div>
					<div class="row-div dp-flex">
						<div class="create-dependent-input-wrapper">
							<label>Total Number of Dependents</label>
							<input type="number">
						</div>
						<div class="create-dependent-input-wrapper">
							<label>Plan Type</label>
							<select>
								<option>Trial Plan</option>
								<option>Insurance Bundle</option>
								<option>Pro Plan</option>
								<option>Lite Plan</option>
								<option>Enterpirse Plan</option>
							</select>
						</div>
						<div class="create-dependent-input-wrapper">
							<label>Secondary Plan Type</label>
							<select>
								<option>Trial - Pro Plan</option>
								<option>Trial - Lite Plan</option>
							</select>
						</div>
					</div>
					<div class="dp-flex">
						<div class="plan-price-input-wrapper create-dependent-input-wrapper">
							<label>Plan Price</label>
							<input type="number">
						</div>
						<div class="payment-status-selector dp-flex-ai">
							<span>Payment Status?</span>
							<div>
								<button class="active">Paid</button>
								<button>Pending</button>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button class="btn-primary">SUBMIT</button>
					<button @click="toggleClosePlanModal()" class="btn-close">CLOSE</button>		
				</div>
			</Modal>

			<Modal v-if="global_isSpendingAccountModalShow" class="create-dependent-account-modal">
				<div slot="header">
					<h1>Spending Account Settings</h1>					
				</div>
				<div slot="body">
									
				</div>
				<div slot="footer">
								
				</div>
			</Modal>

			<Modal v-if="global_isCreditAllocationModalShow" class="credit-allocation-modal corporate-details-modal">
				<div slot="header">
					<h1>Credit Allocation</h1>					
				</div>
				<div slot="body">
					<div>
						<button class="active">MEDICAL</button>
						<button>WELLNESS</button>
					</div>
					<div class="dp-flex total-details-container">
						<div>
							<div>
								<span>Total: </span>
								<span>SGD <span>55,892.64</span></span>
							</div>
							<div>
								<span>Unallocated: </span>
								<span>SGD <span>55,892.64</span></span>
							</div>
						</div>
						<div>
							<button class="active">ADD</button>
							<button>DEDUCT</button>
						</div>
					</div>
					<div class="credit-add-container">
						<label>Credit to Add*</label>
						<input type="number">
					</div>
					<div class="deposit-slider">
						<label>Deposit : <span>{{ global_creditAllocationDeposit }} </span>% </label>
						<vue-slider v-model="global_creditAllocationDeposit" :min="0" :max="10" :interval=".5"/>
					</div>
				</div>
				<div slot="footer">
					<button class="btn-primary">UPDATE</button>
					<button @click="toggleClosePlanModal()" class="btn-close">CLOSE</button>
				</div>
			</Modal>
		</div>

	</div>
</template>

<script>
	import corporatePlan from '@/components/corporates/corporatePlan'
	export default corporatePlan
</script>