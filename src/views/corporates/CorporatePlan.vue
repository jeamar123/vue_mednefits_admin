<template>
	<div class="corporate-plan-wrapper">
		
		<div class="plan-body">
			<div>
				<div class="current-plan-text">Current Plan: <span>{{ global_getPlans.current_plan.plan_start }}</span></div>
				<div class="current-active-text">
					<h4>Current Active Plans</h4>
				</div>
				<div class="active-cards-wrapper">
					<div v-for="(list,index) in global_getPlans.current_plan.customer_active_plans" :key="list.index" class="active-plans-info">
						<div class="plan-header-container">
							<div>
								<span>Active Plan #{{ index + 1 }}</span>
							</div>
							<div>
								<span>Active Plan ID #{{ list.customer_active_plan_id }}</span>
							</div>
							<div v-if="list.new_head_count == 0" class="cog-container">
								<i @click="showAccountPlanType()" class="fa fa-cog"></i>
							</div>
						</div>
						<div class="account-container employee-account-container">
							<div class="account-title">Employee Account</div>
							<div>
								<span>Plan Type: </span>
								<span v-if="list.account_type == 'stand_alone_plan'">Pro Plan</span>
								<span v-if="list.account_type == 'insurance_bundle'">Insurance Bundle</span>
								<span v-if="list.account_type == 'trial_plan'">Trial Plan</span>
								<span v-if="list.account_type == 'lite_plan'">Lite Plan</span>
								<span v-if="list.account_type == 'enterprise_plan'">Enterprise Plan</span>
							</div>
							<div>
								<span>Start Date: </span>
								<span>{{ list.plan_start }}</span>
							</div>
							<div>
								<span>Plan Duration: </span>
								<span>{{ list.duration }}</span>
							</div>
							<div>
								<span>Total Seats: </span>
								<span>{{ list.total_seats }}</span>
							</div>
							<div>
								<span>Occupied Seats: </span>
								<span>{{ list.occupied_seats }}</span>
							</div>
							<div>
								<span>Vacant Seats: </span>
								<span>{{ list.vacant_seats }}</span>
							</div>
							<div>
								<span>Plan Amount: </span>
								<span><span class="currency-type">{{ list.currency_type }} </span> <span>{{ list.amount }}</span></span>
							</div>
							<div>
								<span>Payment Status: </span>
								<span v-if="list.paid == true">PAID</span>
								<span v-if="list.paid == false">PENDING</span>
							</div>
						</div>
						<div v-if="list.dependents.length > 0" class="account-container dependent-account-container">
							<div class="account-title">Dependent Accounts</div>
							<div class="dependent-list-info-wrapper">
								<div v-for="list in list.dependents" :key="list.index" class="dependent-list-info">
									<div>
										<span>Plan Type: </span>
										<span v-if="list.account_type == 'stand_alone_plan'">Pro Plan</span>
										<span v-if="list.account_type == 'insurance_bundle'">Insurance Bundle</span>
										<span v-if="list.account_type == 'trial_plan'">Trial Plan</span>
										<span v-if="list.account_type == 'lite_plan'">Lite Plan</span>
										<span v-if="list.account_type == 'enterprise_plan'">Enterprise Plan</span>
									</div>
									<div>
										<span>Start Date: </span>
										<span>{{ list.plan_start }}</span>
									</div>
									<div>
										<span>Plan Duration: </span>
										<span>{{ list.duration }}</span>
									</div>
									<div>
										<span>Total Seats: </span>
										<span>{{ list.total_seats }}</span>
									</div>
									<div>
										<span>Occupied Seats: </span>
										<span>{{ list.occupied_seats }}</span>
									</div>
									<div>
										<span>Vacant Seats: </span>
										<span>{{ list.vacant_seats }}</span>
									</div>
									<div>
										<span>Plan Amount: </span>
										<span><span class="currency-type">{{ list.currency_type }} </span> <span>{{ list.amount }}</span></span>
									</div>
									<div>
										<span>Payment Status: </span>
										<span v-if="list.paid == true">PAID</span>
										<span v-if="list.paid == false">PENDING</span>
									</div>
								</div>
							</div>
						</div>
						<div v-if="list.plan_extension" class="account-container plan-extension-container">
							<div class="account-title">Plan Extension</div>
							<div>
								<span>Plan Type: </span>
								<span v-if="list.plan_extension.account_type == 'stand_alone_plan'">Pro Plan</span>
								<span v-if="list.plan_extension.account_type == 'insurance_bundle'">Insurance Bundle</span>
								<span v-if="list.plan_extension.account_type == 'trial_plan'">Trial Plan</span>
								<span v-if="list.plan_extension.account_type == 'lite_plan'">Lite Plan</span>
								<span v-if="list.plan_extension.account_type == 'enterprise_plan'">Enterprise Plan</span>
							</div>
							<div>
								<span>Start Date: </span>
								<span>{{ list.plan_extension.plan_start }}</span>
							</div>
							<div>
								<span>Plan Duration: </span>
								<span>{{ list.plan_extension.duration }}</span>
							</div>
							<div>
								<span>Employees: </span>
								<span>{{ list.plan_extension.employees }}</span>
							</div>
							<div>
								<span>Plan Amount: </span>
								<span><span class="currency-type">{{ list.plan_extension.currency_type }} </span> <span>{{ list.plan_extension.amount }}</span></span>
							</div>
							<div>
								<span>Payment Status: </span>
								<span v-if="list.plan_extension.paid == true">PAID</span>
								<span v-if="list.plan_extension.paid == false">PENDING</span>
							</div>
						</div>
						<div class="account-container spending-account-container">
							<div>
								<div class="account-title">Medical Spending Account:</div>
								<div>
									<span>Total: </span>
									<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_allocated_medical }}</span>
								</div>
								<div>
									<span>Unallocated: </span>
									<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_unallocated_medical }}</span>
								</div>
							</div>
							<div>
								<div class="account-title">Wellness Spending Account:</div>
								<div>
									<span>Total: </span>
									<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_allocated_wellness }}</span>
								</div>
								<div>
									<span>Unallocated: </span>
									<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_unallocated_wellness }}</span>
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
					<div class="old-plan-active-wrapper">
						<div v-if="global_getPlans.old_plans.length > 0" class="current-plan-text">
							<h4>Old Active Plans</h4>
						</div>
						<div v-for="list in global_getPlans.current_plan.old_plans" :key="list.index" class="old-plan-active">
							<div class="current-plan-text">
								<h4>Plan Date: <span>{{ global_getPlans.old_plans.plan_start }}</span></h4>
							</div>
							<div v-for="list in old.old_active" :key="list.index" class="active-plans-info">
								<div class="plan-header-container">
									<div>
										<span>Active Plan #1</span>
									</div>
									<div>
										<span>Active Plan ID #{{ list.customer_active_plan_id }}</span>
									</div>
									<div class="cog-container">
										<i @click="showAccountPlanType()" class="fa fa-cog"></i>
									</div>
								</div>
								<div class="account-container employee-account-container">
									<div class="account-title">Employee Account</div>
									<div>
										<span>Plan Type: </span>
										<span v-if="list.account_type == 'stand_alone_plan'">Pro Plan</span>
										<span v-if="list.account_type == 'insurance_bundle'">Insurance Bundle</span>
										<span v-if="list.account_type == 'trial_plan'">Trial Plan</span>
										<span v-if="list.account_type == 'lite_plan'">Lite Plan</span>
										<span v-if="list.account_type == 'enterprise_plan'">Enterprise Plan</span>
									</div>
									<div>
										<span>Start Date: </span>
										<span>{{ list.plan_start }}</span>
									</div>
									<div>
										<span>Plan Duration: </span>
										<span>{{ list.duration }}</span>
									</div>
									<div>
										<span>Total Seats: </span>
										<span>{{ list.total_seats }}</span>
									</div>
									<div>
										<span>Occupied Seats: </span>
										<span>{{ list.occupied_seats }}</span>
									</div>
									<div>
										<span>Vacant Seats: </span>
										<span>{{ list.vacant_seats }}</span>
									</div>
									<div>
										<span>Plan Amount: </span>
										<span><span class="currency-type">{{ list.currency_type }} </span> <span>{{ list.amount }}</span></span>
									</div>
									<div>
										<span>Payment Status: </span>
										<span v-if="list.paid == true">PAID</span>
										<span v-if="list.paid == false">PENDING</span>
									</div>
								</div>
								<!-- <div v-if="list.dependents.length > 0" class="account-container dependent-account-container"> -->
								<div class="account-container dependent-account-container">
									<div class="account-title">Dependent Accounts</div>
									<div class="dependent-list-info-wrapper">
										<div v-for="list in list.dependents" :key="list.index" class="dependent-list-info">
											<div>
												<span>Plan Type: </span>
												<span v-if="list.account_type == 'stand_alone_plan'">Pro Plan</span>
												<span v-if="list.account_type == 'insurance_bundle'">Insurance Bundle</span>
												<span v-if="list.account_type == 'trial_plan'">Trial Plan</span>
												<span v-if="list.account_type == 'lite_plan'">Lite Plan</span>
												<span v-if="list.account_type == 'enterprise_plan'">Enterprise Plan</span>
											</div>
											<div>
												<span>Start Date: </span>
												<span>{{ list.plan_start }}</span>
											</div>
											<div>
												<span>Plan Duration: </span>
												<span>{{ list.duration }}</span>
											</div>
											<div>
												<span>Total Seats: </span>
												<span>{{ list.total_seats }}</span>
											</div>
											<div>
												<span>Occupied Seats: </span>
												<span>{{ list.occupied_seats }}</span>
											</div>
											<div>
												<span>Vacant Seats: </span>
												<span>{{ list.vacant_seats }}</span>
											</div>
											<div>
												<span>Plan Amount: </span>
												<span><span class="currency-type">{{ list.currency_type }} </span> <span>{{ list.amount }}</span></span>
											</div>
											<div>
												<span>Payment Status: </span>
												<span v-if="list.paid == true">PAID</span>
												<span v-if="list.paid == false">PENDING</span>
											</div>
										</div>
									</div>
								</div>
								<div v-if="list.plan_extension" class="account-container plan-extension-container">
									<div class="account-title">Plan Extension</div>
									<div>
										<span>Plan Type: </span>
										<span v-if="list.plan_extension.account_type == 'stand_alone_plan'">Pro Plan</span>
										<span v-if="list.plan_extension.account_type == 'insurance_bundle'">Insurance Bundle</span>
										<span v-if="list.plan_extension.account_type == 'trial_plan'">Trial Plan</span>
										<span v-if="list.plan_extension.account_type == 'lite_plan'">Lite Plan</span>
										<span v-if="list.plan_extension.account_type == 'enterprise_plan'">Enterprise Plan</span>
									</div>
									<div>
										<span>Start Date: </span>
										<span>{{ list.plan_extension.plan_start }}</span>
									</div>
									<div>
										<span>Plan Duration: </span>
										<span>{{ list.plan_extension.duration }}</span>
									</div>
									<div>
										<span>Total Seats: </span>
										<span>{{ list.plan_extension.total_seats }}</span>
									</div>
									<div>
										<span>Occupied Seats: </span>
										<span>{{ list.plan_extension.occupied_seats }}</span>
									</div>
									<div>
										<span>Vacant Seats: </span>
										<span>{{ list.plan_extension.vacant_seats }}</span>
									</div>
									<div>
										<span>Plan Amount: </span>
										<span><span class="currency-type">{{ list.plan_extension.currency_type }} </span> <span>{{ list.amount }}</span></span>
									</div>
									<div>
										<span>Payment Status: </span>
										<span v-if="list.plan_extension.paid == true">PAID</span>
										<span v-if="list.plan_extension.paid == false">PENDING</span>
									</div>
								</div>
								<div class="account-container spending-account-container">
									<div>
										<div class="account-title">Medical Spending Account:</div>
										<div>
											<span>Total: </span>
											<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_allocated_medical }}</span>
										</div>
										<div>
											<span>Unallocated: </span>
											<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_unallocated_medical }}</span>
										</div>
									</div>
									<div>
										<div class="account-title">Wellness Spending Account:</div>
										<div>
											<span>Total: </span>
											<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_allocated_wellness }}</span>
										</div>
										<div>
											<span>Unallocated: </span>
											<span><span class="currency-type">{{ list.currency_type }} </span>{{ list.total_unallocated_wellness }}</span>
										</div>
									</div>
								</div>
								<div>
									<!-- <button class="btn-primary">CREATE DEPEDENT ACCOUNT</button>
									<button class="btn-primary">SPENDING ACCOUNT SETTINGS</button>
									<button class="btn-primary">CREDIT ALLOCATION</button> -->
									<button class="btn-primary">VIEW PLAN</button>
								</div>
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
									<button @click="_showViewPlanModal_('pending-enrollment')" class="btn-blue">0 Pending Enrollment</button>
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
									<button class="btn-primary" @click="_showViewPlanModal_('edit-deposit')">Edit Deposit</button>
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
									<button @click="_showViewPlanModal_('record-refund')" class="btn-primary">Record Refund</button>
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
									<button class="btn-blue" @click="_showViewPlanModal_('edit-plan')">Edit Plan</button>
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
									v-model="global_addDependentData.start_date"
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
							<input v-model="global_addDependentData.total_dependents" type="number">
						</div>
						<div class="create-dependent-input-wrapper">
							<label>Plan Type</label>
							<select v-model="global_addDependentData.account_type">
								<option value="trial_plan">Trial Plan</option>
								<option value="insurance_bundle">Insurance Bundle</option>
								<option value="stand_alone_plan">Pro Plan</option>
								<option value="lite_plan">Lite Plan</option>
								<option value="enterprise_plan">Enterprise Plan</option>
							</select>
						</div>
						<div class="create-dependent-input-wrapper">
							<label>Secondary Plan Type</label>
							<select v-model="global_addDependentData.secondary_account_type" :disabled="!global_addDependentData.account_type || global_addDependentData.account_type == 'lite_plan' || global_addDependentData.account_type == 'stand_alone_plan' || global_addDependentData.account_type == 'enterprise_plan'">
								<option></option>
								<option v-if="global_addDependentData.account_type == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
								<option v-if="global_addDependentData.account_type == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

								<option v-if="global_addDependentData.account_type == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
								<option v-if="global_addDependentData.account_type == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
							</select>
						</div>
					</div>
					<div class="dp-flex">
						<div class="plan-price-input-wrapper create-dependent-input-wrapper">
							<label>Plan Price</label>
							<input v-model="global_addDependentData.individual_price" type="number">
						</div>
						<div class="payment-status-selector dp-flex-ai">
							<span>Payment Status?</span>
							<div>
								<button @click="_dependentActiveButton_(1)" v-bind:class="{ 'active' : global_addDependentData.is_paid == 1 }">Paid</button>
								<button @click="_dependentActiveButton_(0)" v-bind:class="{ 'active' : global_addDependentData.is_paid == 0 }">Pending</button>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button @click="_submitDependentAccount_()" class="btn-primary">SUBMIT</button>
					<button @click="toggleClosePlanModal()" class="btn-close">CLOSE</button>		
				</div>
			</Modal>

			<Modal v-if="global_isSpendingAccountModalShow" class="spending-account-settings-modal">
				<div slot="header">
					<h1>Spending Account Settings</h1>					
				</div>
				<div slot="body">
					<div class="dp-flex">
						<div class="spending-account-container">
							<label>Spending Account</label>
							<div class="spending-selector-container">
								<select v-model="global_getSpendingData.spending_account" v-on:change="_spendingAccountWallet_( global_getSpendingData.spending_account )">
									<option value="false">No</option>
									<option value="true">Yes</option>
								</select>
								<i class="fa fa-angle-down"></i>
							</div>
						</div>
						<div class="medical-wellness-on-off-container">
							<div class="dp-flex-ai">
								<span>Medical</span>
								<div class="dp-flex">
									<button @click="___medicalSelector(true)" v-bind:class="{on : global_getSpendingData.medical_enable == true}" :disabled="global_getSpendingData.spending_account === false"><span class="check-mark"></span></button>
									<button @click="___medicalSelector(false)" v-bind:class="{off : global_getSpendingData.medical_enable == false}"><img :src="'../assets/img/close.svg'"></button>
								</div>
							</div>
							<div class="dp-flex">
								<span>Wellness</span>
								<div class="dp-flex">
									<button @click="___wellnessSelector(true)" v-bind:class="{on : global_getSpendingData.wellness_enable == true}" :disabled="global_getSpendingData.spending_account === false"><span class="check-mark"></span></button>
									<button @click="___wellnessSelector(false)" v-bind:class="{off : global_getSpendingData.wellness_enable == false}"><img :src="'../assets/img/close.svg'"></button>
								</div>
							</div>
						</div>
					</div>
					<div v-if="global_getSpendingData.medical_enable == true && global_getSpendingData.medical_enable == true" class="medical-wellness-spending-container">
						<div class="row-item dp-flex">
							<div>
								<div class="spending-account-text-title">
									<span>Medical Spending Account</span>
								</div>
								<div class="item-div">
									<div class="input-div">
										<label>Start Date</label>
										<div class="datepicker-div">
											<img :src="'../assets/img/calendar-gray.png'">
											<v-date-picker 
											popoverDirection="bottom" 
											v-model="global_getSpendingData.medical_spending_start_date"
											:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus" 
											:formats='formats'></v-date-picker>
										</div>
									</div>
									<div class="input-div end-date-container">
										<label>End Date</label>
										<div class="datepicker-div">
											<img :src="'../assets/img/calendar-gray.png'">
											<v-date-picker 
											popoverDirection="bottom" 
											v-model="global_getSpendingData.medical_spending_end_date"
											:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus" 
											:formats='formats'></v-date-picker>
										</div>
									</div>
								</div>
								<div class="item-div">
									<div class="input-div">
										<label>Supplementary Credits</label>
										<div class="supplementary-input-wrapper dp-flex-ai">
											<input v-model="global_getSpendingData.medical_supplementary_credits" type="number">
											<span>%</span>
										</div>
									</div>
									<div class="input-div">
										<label>Deposit</label>
										<div class="deposit-input-wrapper dp-flex-ai">
											<input v-model="global_getSpendingData.medical_deposit" type="number">
											<span>%</span>
										</div>
									</div>
								</div>
								<div class="item-div">
									<div class="input-div">
										<label>Rollover</label>
										<div class="rollover-input-wrapper spending-selector-container">
											<select v-model="global_getSpendingData.medical_roll_over">
												<option value="false">No</option>
												<option value="true">Yes</option>
											</select>
											<i class="fa fa-angle-down"></i>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div class="change-total-cost">
									<div>
										<label>Total Allocated Credits</label>
										<div class="currency-type">{{ global_getSpendingData.currency_type }} <span>{{ global_getSpendingData.total_medical_allocated_credits }}</span></div>
									</div>
									<div>
										<label>Supplementary Credits</label>
										<div class="currency-type">{{ global_getSpendingData.currency_type }} <span>{{ global_getSpendingData.medical_supplementary_credits_value }}</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="global_getSpendingData.wellness_enable == true && global_getSpendingData.wellness_enable == true" class="medical-wellness-spending-container">
						<div class="row-item dp-flex">
							<div>
								<div class="spending-account-text-title">
									<span>Wellness Spending Account</span>
								</div>
								<div class="item-div">
									<div class="input-div">
										<label>Start Date</label>
										<div class="datepicker-div">
											<img :src="'../assets/img/calendar-gray.png'">
											<v-date-picker 
											popoverDirection="bottom" 
											v-model="global_getSpendingData.wellness_spending_start_date"
											:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus" 
											:formats='formats'></v-date-picker>
										</div>
									</div>
									<div class="input-div end-date-container">
										<label>End Date</label>
										<div class="datepicker-div">
											<img :src="'../assets/img/calendar-gray.png'">
											<v-date-picker 
											popoverDirection="bottom" 
											v-model="global_getSpendingData.wellness_spending_end_date"
											:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus" 
											:formats='formats'></v-date-picker>
										</div>
									</div>
								</div>
								<div class="item-div">
									<div class="input-div">
										<label>Supplementary Credits</label>
										<div class="supplementary-input-wrapper dp-flex-ai">
											<input v-model="global_getSpendingData.wellness_supplementary_credits" type="number">
											<span>%</span>
										</div>
									</div>
									<div class="input-div">
										<label>Deposit</label>
										<div class="deposit-input-wrapper dp-flex-ai">
											<input v-model="global_getSpendingData.wellness_deposit" type="number">
											<span>%</span>
										</div>
									</div>
								</div>
								<div class="item-div">
									<div class="input-div">
										<label>Rollover</label>
										<div class="rollover-input-wrapper spending-selector-container">
											<select v-model="global_getSpendingData.wellness_roll_over">
												<option value="false">No</option>
												<option value="true">Yes</option>
											</select>
											<i class="fa fa-angle-down"></i>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div class="change-total-cost">
									<div>
										<label>Total Allocated Credits</label>
										<div class="currency-type">{{ global_getSpendingData.currency_type }} <span>{{ global_getSpendingData.total_wellness_allocated_credits }}</span></div>
									</div>
									<div>
										<label>Supplementary Credits</label>
										<div class="currency-type">{{ global_getSpendingData.currency_type }} <span>{{ global_getSpendingData.wellness_supplementary_credits_value }}</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button @click="toggleClosePlanModal()" class="btn-primary">Cancel</button>
					<button class="btn-primary">Update</button>
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

			<Modal v-if="global_isPendingEnrollmentModalShow" class="pending-enrollment-modal">
				<div slot="header">
					<h1>Active Plan - Enrolled Employees</h1>
				</div>
				<div slot="body">
					<div class="search-emp-container">
						<i class="fa fa-search" aria-hidden="true"></i>
						<input type="text" placeholder="Search Employee">
					</div>
					<div class="enrolled-emp-wrapper">
						<div v-for="x in 8" :key="x.index" class="enrolled-emp-container-box">
							<div class="emp-header-container">
								<h4>Medone Exel Dep</h4>
							</div>
							<div class="emp-body-container">
								<div class="email-add-container emp-row-info">
									<label>Email Address:</label>
									<div>mednefits.test@gmail.com</div>
								</div>
								<div class="family-coverage-container emp-row-info">
									<label>Family Coverage:</label>
									<div class="dp-flex">
										<div>Spouse</div>
										<div> - </div>
									</div>
									<div class="dp-flex">
										<div>Dependent</div>
										<div> 8 </div>
									</div>
								</div>
								<div class="emp-row-info">
									<label>Spending Account:</label>
									<div class="spending-account-container">
										<div class="dp-flex">
											<div></div>
											<div>Medical</div>
											<div>Wellness</div>
										</div>
										<div class="dp-flex">
											<div>Allocation</div>
											<div class="allocation-amount">SGD 500.00</div>
											<div class="allocation-amount">SGD 500.00</div>
										</div>
										<div class="dp-flex">
											<div>Usage</div>
											<div class="usage-amount">SGD 500.00</div>
											<div class="usage-amount">SGD 500.00</div>
										</div>
									</div>
								</div>
								<div class="date-emp-container">
									<label>Start Date: </label> 
									<span>March 18, 2020</span>
								</div>
								<div class="date-emp-container">
									<label>End Date: </label> 
									<span>April 12, 2020</span>
								</div>
							</div>
						</div>
					</div>
					<div class="enrolled-emp-pagination">
						<div class="dp-flex-ai">
							<button>PREV</button>
							<span>1 of 8</span>
							<button>NEXT</button>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button @click="toggleClosePlanModal()" class="btn-close">CLOSE</button>
				</div>
			</Modal>

			<Modal v-if="global_isRecordFundModalShow" class="record-refund-modal corporate-details-modal">
				<div slot="header">
					<h1>Record Refund</h1>
				</div>
				<div slot="body">
					<div>
						<label>Paid Amount</label>
						<input type="number">
					</div>
					<div>
						<label>Date Received</label>
						<div class="date-container vDatepicker dp-flex">
							<i class="fa fa-calendar-o"></i>
							<v-date-picker 
								popoverDirection="bottom" 
								v-model="global_recordPayment.date_received"
								:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
								popover-visibility="focus" 
								:formats='formats'></v-date-picker>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
					<div>
						<label>Payment Remarks</label>
						<input type="text">
					</div>
				</div>
				<div slot="footer">
					<button @click="_showCorporatePlanModal_('view-plan')" class="btn-close">BACK</button>
						<button class="btn-primary">UPDATE</button>
				</div>
			</Modal>

			<Modal v-if="global_isEditDepositModalShow" class="edit-deposit-modal corporate-details-modal">
				<div slot="header">
					<h1>Edit Spending Deposit</h1>
				</div>
				<div slot="body">
					<div class="spending-account-container">
						<h4>Medical Spending Account</h4>
						<div class="dp-flex">
							<div>
								<label>Allocate Credits*</label>
								<input type="number"> 
							</div>
							<div class="deposit-slider">
								<label>Deposit : <span>{{ global_creditAllocationDeposit }} </span>% </label>
								<vue-slider v-model="global_creditAllocationDeposit" :min="0" :max="10" :interval=".5"/>
							</div>
						</div>
					</div>
					<div class="spending-account-container">
						<h4>Wellness Spending Account</h4>
						<div class="dp-flex">
							<div>
								<label>Allocate Credits*</label>
								<input type="number"> 
							</div>
							<div class="deposit-slider">
								<label>Deposit : <span>{{ global_creditAllocationDeposit }} </span>% </label>
								<vue-slider v-model="global_creditAllocationDeposit" :min="0" :max="10" :interval=".5"/>
							</div>
						</div>
					</div>
					<div class="dp-flex invoice-date-container">
						<div>
							<label>Invoice Date</label>
							<div class="date-container vDatepicker dp-flex">
								<i class="fa fa-calendar-o"></i>
								<v-date-picker 
									popoverDirection="bottom" 
									v-model="global_recordPayment.date_received"
									:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
									popover-visibility="focus" 
									:formats='formats'></v-date-picker>
								<i class="fa fa-caret-down"></i>
							</div>
						</div>
						<div>
							<label>Invoice Date</label>
							<div class="date-container vDatepicker dp-flex">
								<i class="fa fa-calendar-o"></i>
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
				<div slot="footer">
					<button @click="_showCorporatePlanModal_('view-plan')" class="btn-close">BACK</button>
					<button class="btn-primary">UPDATE</button>
				</div>
			</Modal>

			<Modal v-if="global_isEditPlanModalShow" class="edit-plan-modal corporate-details-modal">
				<div slot="header">
					<h1>Edit Plan</h1>
				</div>
				<div slot="body">
					<h4>Employee Account</h4>
					<div class="dp-flex employee-account-container">
						<div>
							<div>
								<label>Employee</label>
								<input type="number">
							</div>
							<div>
								<label>Plan Date</label>
								<div class="date-container vDatepicker dp-flex">
									<i class="fa fa-calendar-o"></i>
									<v-date-picker 
										popoverDirection="bottom" 
										v-model="global_recordPayment.date_received"
										:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
										popover-visibility="focus" 
										:formats='formats'></v-date-picker>
									<i class="fa fa-caret-down"></i>
								</div>
							</div>
							<div>
								<label>Invoice Start Date</label>
								<div class="date-container vDatepicker dp-flex">
									<i class="fa fa-calendar-o"></i>
									<v-date-picker 
										popoverDirection="bottom" 
										v-model="global_recordPayment.date_received"
										:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
										popover-visibility="focus" 
										:formats='formats'></v-date-picker>
									<i class="fa fa-caret-down"></i>
								</div>
							</div>
							<div>
								<label>Invoice Due Date</label>
								<div class="date-container vDatepicker dp-flex">
									<i class="fa fa-calendar-o"></i>
									<v-date-picker 
										popoverDirection="bottom" 
										v-model="global_recordPayment.date_received"
										:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
										popover-visibility="focus" 
										:formats='formats'></v-date-picker>
									<i class="fa fa-caret-down"></i>
								</div>
							</div>
							<div>
								<label>Price Per Employee</label>
								<input type="number">
							</div>
							<div>
								<div class="custom-checkbox-container">
									<label class="checkbox-input">
										<span>Override Price Per Employee Amount</span>
										<input value="true" type="checkbox">
										<span class="checkbox-mark"></span>
									</label>
								</div>
								<div>
									<label>Price Per Employee Amount</label>
									<input type="number">
								</div>
							</div>
						</div>
						<div>
							<label>Account Type</label>
							<div class="custom-checkbox-selector">
								<label class="selector-container">
									<span>Trial Plan</span>
									<input v-model="global_editPlan.account_type" v-on:change="_setAccountType_(global_editPlan.account_type)" value="trial_plan" type="radio"/>
									<span class="custom-checkbox-checkmark"></span>
								</label>
								<div v-show="global_editPlan.account_type == 'trial_plan'" class="checkbox-child">
									<label class="selector-container">
										<span>Trial - Pro Plan</span>
										<input value="pro_trial_plan_bundle" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
									<label class="selector-container">
										<span>Trial - Lite Plan</span>
										<input value="trial_plan_lite" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
								</div>
								<label class="selector-container">
									<span>Insurance Bundle</span>
									<input value="insurance_bundle" type="radio" v-model="global_editPlan.account_type" v-on:change="_setAccountType_(global_editPlan.account_type)"/>
									<span class="custom-checkbox-checkmark"></span>
								</label>
								<div v-show="global_editPlan.account_type == 'insurance_bundle'" class="checkbox-child">
									<label class="selector-container">
										<span>Pro Plan Bundle</span>
										<input value="pro_plan_bundle" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
									<label class="selector-container">
										<span>Insurance Bundle Lite</span>
										<input value="insurance_bundle_lite" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
								</div>
								<label class="selector-container">
									<span>Pro Plan</span>
									<input value="stand_alone_plan" type="radio" v-model="global_editPlan.account_type" v-on:change="_setAccountType_(global_editPlan.account_type)"/>
									<span class="custom-checkbox-checkmark"></span>
								</label>
								<div v-show="global_editPlan.account_type == 'stand_alone_plan'" class="checkbox-child">
									<label class="selector-container">
										<span>Default (SGD 99.00)</span>
										<input value="default_price" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
									<label class="selector-container">
										<span>Individual Price</span>
										<input value="fixed_price" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
									<div v-show="global_editPlan.secondary_account_type == 'fixed_price'" class="input-individual-price-container">
										<label>Input Individual Price*</label>
										<input type="number" v-model="global_editPlan.price_per_employee"> 
									</div>
								</div>
								<label class="selector-container">
									<span>Lite Plan</span>
									<input value="lite_plan" type="radio" v-model="global_editPlan.account_type" v-on:change="_setAccountType_(global_editPlan.account_type)"/>
									<span class="custom-checkbox-checkmark"></span>
								</label>
								<div v-show="global_editPlan.account_type == 'lite_plan'" class="checkbox-child">
									<label class="selector-container">
										<span>Individual Price</span>
										<input value="fixed_price" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
									<div class="input-individual-price-container">
										<label>Input Individual Price*</label>
										<input type="number" v-model="global_editPlan.price_per_employee"> 
									</div>
								</div>
								<label class="selector-container">
									<span>Enterprise Plan</span>
									<input value="enterprise_plan" type="radio" v-model="global_editPlan.account_type" v-on:change="_setAccountType_(global_editPlan.account_type)"/>
									<span class="custom-checkbox-checkmark"></span>
								</label>
								<div v-show="global_editPlan.account_type == 'enterprise_plan'" class="checkbox-child">
									<label class="selector-container">
										<span>Individual Price</span>
										<input value="fixed_price" type="radio" v-model="global_editPlan.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_editPlan.secondary_account_type)"/>
										<span class="custom-checkbox-checkmark"></span>
									</label>
									<div class="input-individual-price-container">
										<label>Input Individual Price*</label>
										<input type="number" v-model="global_editPlan.price_per_employee"> 
									</div>
								</div>
							</div>
							<div class="payment-status-container">
								<label>Payment Status</label>
								<div>
									<select>
										<option>PAID</option>
										<option>PENDING</option>
									</select>
									<i class="fa fa-caret-down"></i>
								</div>
							</div>
							<div class="spending-invoice-date-container">
								<h4>Spending Account Invoice Date</h4>
								<div class="dp-flex-ai">
									<div>
										<select>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>
										<i class="fa fa-caret-down"></i>
									</div>
									<span>of every month</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button @click="_showCorporatePlanModal_('view-plan')" class="btn-close">BACK</button>
					<button class="btn-primary">UPDATE</button>
				</div>
			</Modal>
		</div>

	</div>
</template>

<script>
	import corporatePlan from '@/components/corporates/corporatePlan'
	export default corporatePlan
</script>