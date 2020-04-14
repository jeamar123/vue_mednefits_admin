<template>
	<div class="plan-details-wrapper">
		<div class="plan-list-container">
			<div class="item-col">
				<div class="subscription-box">
					<p class="subscription-title">Your Next Subscription Term - For Employee</p>
					<div class="sub-title">
						<div><span>3 months</span> subscription term</div>
						<div><span>01/01/2019</span> - <span>30/11/2019</span></div>
					</div>
					<div class="plan-price-box dp-flex-ai">
						<div class="price-values flex-2">
							<div>
								<span>Lite Plan</span> - 
								<span>96 Seats</span>
							</div>
							<div>
								<span>SGD </span><span>50.00</span> / seat / year
							</div>	
						</div>
						<div class="btn-container">
							<button @click="_changePlan_('employee')" class="btn-primary btn-change-plan">Change Plan</button>
						</div>
					</div>
					<div class="total-box dp-flex">
						<div class="flex-1">Yearly plan total</div>
						<div class="flex-1"><span>SGD </span><span>4,800.00</span></div>
					</div>
				</div>
				<div class="subscription-box">
					<p class="subscription-title">Your Next Subscription Term - For Dependent</p>
					<div class="sub-title">
						<div><span>3 months</span> subscription term</div>
						<div><span>01/01/2019</span> - <span>30/11/2019</span></div>
					</div>
					<div class="plan-price-box dp-flex-ai">
						<div class="price-values flex-2">
							<div>
								<span>Lite Plan</span> - 
								<span>96 Seats</span>
							</div>
							<div>
								<span>SGD </span><span>50.00</span> / seat / year
							</div>	
						</div>
						<div class="btn-container">
							<button @click="_changePlan_('dependent')" class="btn-primary btn-change-plan">Change Plan</button>
						</div>
					</div>
					<div class="total-box dp-flex">
						<div class="flex-1">Yearly plan total</div>
						<div class="flex-1"><span>SGD </span><span>4,800.00</span></div>
					</div>
				</div>
			</div>
			<div class="item-col">
				<div class="subscription-box">
					<p class="subscription-title">Total Due</p>
					<div class="total-due-box dp-flex">
						<div class="flex-1">Next subscription term</div>
						<div class="flex-1">
							<span>SGD </span>
							<span>5760.00</span>
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
					<img @click="_changePlan_()" :src="'../assets/img/cancel.png'">
				</div>
			</div>
			<div slot="body">
				<div class="sub-title">Mednefits Tech Test is using 0 seats in a total of 96 seats</div>
				<div class="row-item dp-flex">
					<div class="col-item-box">
						<div class="item-div">
							<div class="input-div">
								<label>Mednefits Plan</label>
								<div class="select-div">
									<select v-model="global_updatePlanDetails.account_type" v-on:change="_setAccountType_(global_updatePlanDetails.account_type)">
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
							<div v-if="global_updatePlanDetails.account_type == 'trial_plan' || global_updatePlanDetails.account_type == 'insurance_bundle'" class="item-div">
								<div class="input-div">
									<label>Secondary Plan</label>
									<div class="select-div">
										<select v-model="global_updatePlanDetails.secondary_account_type" v-on:change="_setAccountType_(global_updatePlanDetails.secondary_account_type)">
											<option value=""></option>
											<option v-if="global_updatePlanDetails.account_type == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
											<option v-if="global_updatePlanDetails.account_type == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

											<option v-if="global_updatePlanDetails.account_type == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
											<option v-if="global_updatePlanDetails.account_type == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
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
										v-model="global_updatePlanDetails.plan_start"
										:input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
										popover-visibility="focus" 
										:formats='formats'></v-date-picker>
									</div>
								</div>
								<div class="input-div">
									<label>Duration</label>
									<div class="select-div">
										<select v-model="global_updatePlanDetails.plan_duration">
											<option value="3 months">3 months</option>
											<option value="4 monnths">4 months</option>
										</select>
										<i class="fa fa-angle-down"></i>
									</div>
								</div>
							</div>
							<div class="item-div seat-container">
								<div class="input-div">
									<label>Seats</label>
									<input v-model="global_updatePlanDetails.seats" type="number">
								</div>
								<div class="input-div">
									<label>Price Per Seat</label>
									<div class="per-seat-div dp-flex-ai">
										<div class="currency-type">sgd</div>
										<input v-model="global_updatePlanDetails.price_per_employee" type="number">
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
									<span>SGD </span> <span>0.00</span> /year
								</div>
							</div>
							<div class="seat-change-container">
								<label>Seat Change</label>
								<div class="total-cost-amount">0</div>
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