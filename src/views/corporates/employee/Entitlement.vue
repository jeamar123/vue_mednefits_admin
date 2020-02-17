<template>
	<div class="entitlement-wrapper">
		<div class="entitlement-btn-edit-wrapper">
			<h3>Entitlement Information</h3>
			<button @click="updateEntitlement()" class="btn-update">Update</button>
		</div>
		<div class="entitlement-information-details">
			<div v-if="employee_info.medical_enable" class="medical-container">
				<h4>Medical Entitlement</h4>
				<div class="medical-entitlement-container">
					<div class="entitlement-input-wrapper">
						<div class="col-md-2">
							<div class="entitlement-input-container original">
	              <h5>Original Entitlement</h5>
	              <div class="entitlement-input-label">
	                <label class="entitlement-label currency-type">{{employee_info.currency_type}} </label>
	                <input v-model="get_calc_medical.medical_entitlement" class="entitlement-input original-input" type="number" readonly="readonly" placeholder="0.00" >
	              </div>
	              <p v-if="get_calc_medical.entitlement_status" class="small">*Updated from 
	              	<span class="currency-type">{{employee_info.currency_type}} </span><span>{{old_credits_medical}}</span> to <span class="currency-type">{{employee_info.currency_type}} </span>
	              	<span>{{new_credits_medical}}</span> on <span>{{ effective_date_medical }}</span>
	              </p>
	            </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container new">
	              <h5>New Entitlement</h5>
	              <div class="entitlement-input-label">
	                <label class="entitlement-label currency-type">{{employee_info.currency_type}} </label>
	                <input v-model="emp_entitlement.medical_new_entitlement" class="entitlement-input" type="number" placeholder="0.00" >
	              </div>
	              <p v-if="get_calc_medical.entitlement_status" class="small">*Updated on <span>{{ effective_date_medical }}</span></p>
	            </div>
						</div>
						<div class="col-md-3">
							<div class="entitlement-input-container usage">
	              <h5>Effective Date of New Entitlement</h5>
	              <div class="entitlement-input-label">
	                <label class="entitlement-label currency-type">{{employee_info.currency_type}} </label>
	                <div class="entitlement-date-picker">
		                <v-date-picker
				              popoverDirection="bottom"
				              v-model="med_effective_date"
				              :formats='formats'
				              :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
				              popover-visibility="focus"
				            ></v-date-picker>
				            <i class="fa fa-calendar-o"></i>
			            </div>
	              </div>
	              <p v-if="get_calc_medical.entitlement_status" class="small">*Updated on <span>{{ effective_date_medical }}</span></p>
	            </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container proration">
	              <h5>Proration</h5>
	              <div class="entitlement-input-label">
	                <select v-model="emp_entitlement.medical_proration">
	                	<option value="months">Months</option>
	                	<option value="days">Days</option>
	                </select>
	              </div>
	            </div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="new-allocation-wrapper">
							<div class="entitlement-input-container allocation">
								<h5>New Allocation</h5>
								<div class="entitlement-calculation">
									<h4>
										<span class="currency-type">{{employee_info.currency_type}} </span>
										<span v-if="!effectiveMedDateError">{{new_allocation_med}}</span>
										<span v-if="effectiveMedDateError">{{ 0 | number('0.00') }}</span>
									</h4>
									<button :disabled="emp_entitlement.medical_new_entitlement == '' || med_effective_date == null " class="btn-update" @click="entitlementCalc('medical', 1)">Calculate</button>
									<!-- <button class="btn-update" @click="entitlementCalc('medical',1)">Calculate</button> -->
									<p v-if="effectiveMedDateError" class="effective-date-error">New Medical Entitlement Usage Date exceeded the Spending End Date.</p>
								</div>
							</div>
							<div v-if="medicalCalculatedInfo && !effectiveMedDateError" class="see-more">
								<div @click="dropdownEntitlement.med_alloc_formula = !dropdownEntitlement.med_alloc_formula">
									<i class="fa fa-chevron-down"></i> See how this is calculated
								</div>
								<p v-if="dropdownEntitlement.med_alloc_formula">New Prorated allocation is: <br>
									<span class="currency-type">{{employee_info.currency_type}} </span> <span>{{get_calc_medical.medical_entitlement}}</span> x <span>{{med_plan_month_duration}}</span>/<span>{{medical_plan_duration}}</span> 
									+ <span class="currency-type">{{employee_info.currency_type}} </span><span>{{emp_entitlement.medical_new_entitlement}}</span> x <span>{{med_entitlement_duration}}</span>/<span>{{medical_plan_duration}}</span> 
									= <span class="currency-type">{{employee_info.currency_type}} </span> <span>{{new_allocation_med}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="employee_info.wellness_enable" class="wellness-container">
				<h4>Wellness Entitlement</h4>
				<div class="wellness-entitlement-container">
					<div class="entitlement-input-wrapper">
						<div class="col-md-2">
							<div class="entitlement-input-container original">
		            <h5>Original Entitlement</h5>
		            <div class="entitlement-input-label">
		              <label class="entitlement-label currency-type">{{get_calc_medical.currency_type}}</label>
		              <input v-model="get_calc_wellness.wellness_entitlement" class="entitlement-input original-input" type="number" readonly="readonly" placeholder="0.00" >
		            </div>
		            <p v-if="get_calc_wellness.entitlement_status" class="small">*Updated from <span class="currency-type">{{get_calc_medical.currency_type}} </span>
		            	<span>{{old_credits_wellness}}</span> to 
		            	<span class="currency-type">{{get_calc_medical.currency_type}} </span><span>{{new_credits_medical}}</span> on 
		            	<span>{{ effective_date_wellness }}</span></p>
		          </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container new">
		            <h5>New Entitlement</h5>
		            <div class="entitlement-input-label">
		              <label class="entitlement-label currency-type">{{employee_info.currency_type}} </label>
		              <input v-model="emp_entitlement.wellness_new_entitlement" class="entitlement-input" type="number" placeholder="0.00" >
		            </div>
		            <p v-if="get_calc_wellness.entitlement_status" class="small">*Updated on <span>{{ effective_date_wellness }}</span></p>
		          </div>
						</div>
						<div class="col-md-3">
							<div class="entitlement-input-container usage">
		            <h5>Effective Date of New Entitlement</h5>
		            <div class="entitlement-input-label">
		              <label class="entitlement-label currency-type">{{employee_info.currency_type}} </label>
		              <div class="entitlement-date-picker">
			              <v-date-picker
				              popoverDirection="bottom"
				              v-model="well_effective_date"
				              :formats='formats'
				              :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true }'
				              popover-visibility="focus"
				            ></v-date-picker>
				            <i class="fa fa-calendar-o"></i>
			            </div>
		            </div>
		            <p v-if="get_calc_wellness.entitlement_status" class="small">*Updated on <span>{{ effective_date_wellness }}</span></p>
		          </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container proration">
		            <h5>Proration</h5>
		            <div class="entitlement-input-label">
		              <select v-model="emp_entitlement.wellness_proration">
		              	<option value="months">Months</option>
		              	<option value="days">Days</option>
		              </select>
		            </div>
		          </div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="new-allocation-wrapper">
							<div class="entitlement-input-container allocation">
								<h5>New Allocation</h5>
								<div class="entitlement-calculation">
									<h4>
										<span class="currency-type">{{employee_info.currency_type}} </span>
										<span v-if="!effectiveWellDateError">{{new_allocation_well}}</span>
										<span v-if="effectiveWellDateError">{{ 0 | number('0.00') }}</span>
									</h4>
									<button :disabled="emp_entitlement.wellness_new_entitlement == '' || well_effective_date == null " class="btn-update" @click="entitlementCalc('wellness', 2)">Calculate</button>
									<!-- <button class="btn-update" @click="entitlementCalc('wellness',2)">Calculate</button> -->
									<p v-if="effectiveWellDateError" class="effective-date-error">New Medical Entitlement Usage Date exceeded the Spending End Date.</p>
								</div>
							</div>
							<div v-if="wellnessCalculatedInfo && !effectiveWellDateError" class="see-more">
								<div @click="dropdownEntitlement.well_alloc_formula = !dropdownEntitlement.well_alloc_formula">
									<i class="fa fa-chevron-down"></i> See how this is calculated
								</div>
								<p v-if="dropdownEntitlement.well_alloc_formula">New Prorated allocation is: <br>
									<span class="currency-type">{{employee_info.currency_type}} </span> <span>{{get_calc_wellness.wellness_entitlement}}</span> x <span>{{well_plan_month_duration}}</span>/<span>{{wellness_plan_duration}}</span> 
									+ <span class="currency-type">{{employee_info.currency_type}} </span><span>{{emp_entitlement.wellness_new_entitlement}}</span> x <span>{{well_entitlement_duration}}</span>/<span>{{wellness_plan_duration}}</span> 
									= <span class="currency-type">{{employee_info.currency_type}} </span> <span>{{ new_allocation_well }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import employeeEntitlement from '@/components/corporates/employee/employeeEntitlement.vue'
	export default employeeEntitlement
</script>