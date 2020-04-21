<template>
	<div class="plan-details-wrapper">
		<div class="plan-list-container">
			<div class="item-col">
				<div class="subscription-box">
					<p class="subscription-title">Your Next Subscription Term - For Employee</p>
					<div class="sub-title">
						<div><span>{{ global_planDetails.employee_plan_duration }}</span> subscription term</div>
						<div>
							<span>{{ global_planDetails.employee_plan_start }}</span> - 
							<span>{{ global_planDetails.employee_renewal_details.plan_end }}</span>
						</div>
					</div>
					<div class="plan-price-box dp-flex-ai">
						<div class="price-values flex-2">
							<div>
								<span>Lite Plan</span> - 
								<span>{{ global_planDetails.employee_seats }} Seats</span>
							</div>
							<div>
								<span class="currency-type">{{ global_planDetails.currency_type }} </span>
								<span>{{ global_planDetails.price_per_employee | number('0.00') }}</span> / seat / year
							</div>	
						</div>
						<div class="btn-container">
							<button @click="_changePlan_('employee',global_planDetails.employee_renewal_details)" class="btn-primary btn-change-plan">Change Plan</button>
						</div>
					</div>
					<div class="total-box dp-flex">
						<div class="flex-1">Yearly plan total</div>
						<div class="flex-1">
							<span class="currency-type">{{ global_planDetails.currency_type }} </span>
							<span>{{ global_planDetails.employee_renewal_details.amount | number('0.00') }}</span>
						</div>
					</div>
				</div>
				<div class="subscription-box">
					<p class="subscription-title">Your Next Subscription Term - For Dependent</p>
					<div class="sub-title">
						<div><span>{{ global_planDetails.dependent_plan_duration }}</span> subscription term</div>
						<div>
							<span>{{ global_planDetails.dependent_plan_start }}</span> - 
							<span>{{ global_planDetails.employee_renewal_details.plan_end }}</span>
						</div>
					</div>
					<div class="plan-price-box dp-flex-ai">
						<div class="price-values flex-2">
							<div>
								<span>Lite Plan</span> - 
								<span>{{ global_planDetails.dependent_seats }} Seats</span>
							</div>
							<div>
								<span class="currency-type">{{ global_planDetails.currency_type }} </span>
								<span>{{ global_planDetails.price_per_dependent | number('0.00') }}</span> / seat / year
							</div>	
						</div>
						<div class="btn-container">
							<button @click="_changePlan_('dependent',global_planDetails.dependent_renewal_details)" class="btn-primary btn-change-plan">Change Plan</button>
						</div>
					</div>
					<div class="total-box dp-flex">
						<div class="flex-1">Yearly plan total</div>
						<div class="flex-1">
							<span class="currency-type">{{ global_planDetails.currency_type }} </span>
							<span>{{ global_planDetails.dependent_renewal_details.amount | number('0.00') }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="item-col">
				<div class="subscription-box">
					<p class="subscription-title">Total Due</p>
					<div class="total-due-box dp-flex">
						<div class="flex-1">Next subscription term</div>
						<div class="flex-1">
							<span class="currency-type">{{ global_planDetails.currency_type }} </span>
							<span>{{ global_planDetails.total_due | number('0.00') }}</span>
						</div>
					</div>
					<button @click="_confirmPlan_()" class="btn-primary btn-confirm-renewal">Confirm plan renewal</button>
				</div>
			</div>
		</div>

		<Modal v-if="global_isChangePlanShow" class="change-plan-modal renewal-modal">
			<div slot="header">
				<div class="dp-flex-ai">
					<h2 class="flex-1">Change Plan Details</h2>
					<img @click="_changePlan_('close',global_changePlan)" :src="'../assets/img/cancel.png'">
				</div>
			</div>
			<div slot="body">
				<div class="sub-title">{{ global_changePlan.status_text }} seats</div>
				<div class="row-item dp-flex">
					<div class="col-item-box">
						<div class="item-div">
							<div class="input-div">
								<label>Mednefits Plan</label>
								<div class="select-div">
									<select v-model="global_changePlan.account_type" v-on:change="_setAccountType_(global_changePlan.account_type)">
										<option value=""></option>
										<option value="trial_plan">Trial Plan</option>
										<option value="insurance_bundle">Insurance Bundle</option>
										<option value="stand_alone_plan">Pro Plan</option>
										<option value="lite_plan">Lite Plan</option>
										<option value="enterprise_plan">Enterprise Plan</option>
									</select>
									<i class="fa fa-angle-down"></i>
								</div>
							</div>
							<div v-if="global_changePlan.account_type == 'trial_plan' || global_changePlan.account_type == 'insurance_bundle'" class="item-div">
								<div class="input-div">
									<label>Secondary Plan</label>
									<div class="select-div">
										<select v-model="global_changePlan.secondary_account_type" v-on:change="_setAccountType_(global_changePlan.secondary_account_type)">
											<option value=""></option>
											<option v-if="global_changePlan.account_type == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
											<option v-if="global_changePlan.account_type == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

											<option v-if="global_changePlan.account_type == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
											<option v-if="global_changePlan.account_type == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
										</select>
										<i class="fa fa-angle-down"></i>
									</div>
		          	</div>
							</div>
							<div class="item-div date-duration-container">
								<div class="input-div">
									<label>Start Date</label>
									<div class="datepicker-div">
										<img :src="'../assets/img/calendar-gray.png'">
										<v-date-picker 
										popoverDirection="bottom" 
										v-model="global_changePlan.plan_start"
										:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
										popover-visibility="focus" 
										:formats='formats'></v-date-picker>
									</div>
								</div>
								<div class="input-div">
									<label>Duration</label>
									<div class="select-div">
										<select v-model="global_changePlan.plan_duration">
											<option value="1 months">1 months</option>
											<option value="2 monnths">2 months</option>
											<option value="3 months">3 months</option>
											<option value="4 monnths">4 months</option>
											<option value="5 months">5 months</option>
											<option value="6 monnths">6 months</option>
											<option value="7 months">7 months</option>
											<option value="8 monnths">8 months</option>
											<option value="9 months">9 months</option>
											<option value="10 monnths">10 months</option>
											<option value="11 monnths">11 months</option>
											<option value="12 monnths">12 months</option>
										</select>
										<i class="fa fa-angle-down"></i>
									</div>
								</div>
							</div>
							<div class="item-div seat-container">
								<div class="input-div">
									<label>Seats</label>
									<input v-model="global_changePlan.seats" type="number">
								</div>
								<div class="input-div">
									<label>Price Per Seat</label>
									<div class="per-seat-div dp-flex-ai">
										<div class="currency-type">{{ global_planDetails.currency_type }} </div>
										<input v-if="global_changePlan.price_per_employee" v-model="global_changePlan.price_per_employee" type="number">
										<input v-if="global_changePlan.price_per_dependent" v-model="global_changePlan.price_per_dependent" type="number">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-item-box">
						<div class="change-total-cost-wrapper">
							<div class="change-total-cost">
								<label>Change in Total Cost</label>
								<div class="total-cost-amount">
									<span class="currency-type">{{ global_changePlan.logs.currency_type }} </span> <span>{{ global_changePlan.logs.amount | number('0.00') }}</span> /year
								</div>
							</div>
							<div class="seat-change-container">
								<label>Seat Change</label>
								<div class="total-cost-amount">{{ global_changePlan.logs.seats }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="_changePlan_()" class="btn-primary">Cancel</button>
				<button @click="_updatePlanDetails_( global_updatePlanDetails )" class="btn-primary">Update Plan</button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import planDetails from '@/components/corporates/plan-renewal/planDetails'
	export default planDetails
</script>