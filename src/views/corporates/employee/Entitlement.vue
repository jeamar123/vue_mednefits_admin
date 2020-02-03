<template>
	<div class="entitlement-wrapper">
		<div class="entitlement-btn-edit-wrapper">
			<h3>Entitlement Information</h3>
			<button @click="updateEntitlement()" class="btn-update">Update</button>
		</div>
		<div class="entitlement-information-details">
			<div class="medical-container">
				<h4>Medical Entitlement</h4>
				<div class="medical-entitlement-container">
					<div class="entitlement-input-wrapper">
						<div class="col-md-2">
							<div class="entitlement-input-container original">
	              <h5>Original Entitlement</h5>
	              <div class="entitlement-input-label">
	                <label class="entitlement-label currency-type">SGD</label>
	                <input v-model="emp_entitlement.original_medical_entitlement" class="entitlement-input original-input" type="number" readonly="readonly" placeholder="0.00" >
	              </div>
	              <p class="small">*Updated from 
	              	<span>SGD </span><span>{{emp_entitlement.old_medical_entitlement}}</span> to <span>SGD </span><span>12</span> on <span>26/01/2020</span>
	              </p>
	            </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container new">
	              <h5>New Entitlement</h5>
	              <div class="entitlement-input-label">
	                <label class="entitlement-label currency-type">SGD</label>
	                <input v-model="emp_entitlement.medical_new_entitlement" class="entitlement-input" type="number" placeholder="0.00" >
	              </div>
	              <p class="small">*Updated on <span>26/01/2020</span></p>
	            </div>
						</div>
						<div class="col-md-3">
							<div class="entitlement-input-container usage">
	              <h5>Effective Date of New Entitlement</h5>
	              <div class="entitlement-input-label">
	                <label class="entitlement-label currency-type">SGD</label>
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
	              <p class="small">*Updated on <span>26/01/2020</span></p>
	            </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container proration">
	              <h5>Proration</h5>
	              <div class="entitlement-input-label">
	                <select v-model="emp_entitlement.medical_proration">
	                	<option>Months</option>
	                	<option>Days</option>
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
										<span>SGD</span>
										<span>12.50</span>
									</h4>
									<!-- <button :disabled="emp_entitlement.medical_new_entitlement == '' || med_effective_date == null " class="btn-update" @click="entitlementCalc('medical', calcOne)">Calculate</button> -->
									<button class="btn-update" @click="entitlementCalc('medical',1)">Calculate</button>
								</div>
							</div>
							<div v-if="medicalCalculatedInfo" class="see-more">
								<div @click="dropdownEntitlement.med_alloc_formula = !dropdownEntitlement.med_alloc_formula">
									<i class="fa fa-chevron-down"></i> See how this is calculated
								</div>
								<p v-if="dropdownEntitlement.med_alloc_formula">New Prorated allocation is <br>
									<span>SGD</span> <span>12</span> x <span>1</span>/<span>3</span> + <span>SGD</span> x <span>2</span>/<span>3</span> = <span>SGD</span> <span>12.50</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="wellness-container">
				<h4>Wellness Entitlement</h4>
				<div class="wellness-entitlement-container">
					<div class="entitlement-input-wrapper">
						<div class="col-md-2">
							<div class="entitlement-input-container original">
		            <h5>Original Entitlement</h5>
		            <div class="entitlement-input-label">
		              <label class="entitlement-label currency-type">SGD</label>
		              <input class="entitlement-input original-input" type="number" readonly="readonly" placeholder="0.00" >
		            </div>
		            <p class="small">*Updated from <span>SGD </span><span>200</span> to <span>SGD </span><span>12</span> on <span>26/01/2020</span></p>
		          </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container new">
		            <h5>New Entitlement</h5>
		            <div class="entitlement-input-label">
		              <label class="entitlement-label currency-type">SGD</label>
		              <input v-model="emp_entitlement.wellness_new_entitlement" class="entitlement-input" type="number" placeholder="0.00" >
		            </div>
		            <p class="small">*Updated on <span>26/01/2020</span></p>
		          </div>
						</div>
						<div class="col-md-3">
							<div class="entitlement-input-container usage">
		            <h5>Effective Date of New Entitlement</h5>
		            <div class="entitlement-input-label">
		              <label class="entitlement-label currency-type">SGD</label>
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
		            <p class="small">*Updated on <span>26/01/2020</span></p>
		          </div>
						</div>
						<div class="col-md-2">
							<div class="entitlement-input-container proration">
		            <h5>Proration</h5>
		            <div class="entitlement-input-label">
		              <select v-model="emp_entitlement.medical_proration">
		              	<option>Months</option>
		              	<option>Days</option>
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
										<span>SGD</span>
										<span>12.50</span>
									</h4>
									<!-- <button :disabled="emp_entitlement.wellness_new_entitlement == '' || well_effective_date == null " class="btn-update" @click="entitlementCalc('wellness', calcTwo)">Calculate</button> -->
									<button class="btn-update" @click="entitlementCalc('wellness',2)">Calculate</button>
								</div>
							</div>
							<div v-if="wellnessCalculatedInfo" class="see-more">
								<div @click="dropdownEntitlement.well_alloc_formula = !dropdownEntitlement.well_alloc_formula">
									<i class="fa fa-chevron-down"></i> See how this is calculated
								</div>
								<p v-if="dropdownEntitlement.well_alloc_formula">New Prorated allocation is <br>
									<span>SGD</span> <span>12</span> x <span>1</span>/<span>3</span> + <span>SGD</span> x <span>2</span>/<span>3</span> = <span>SGD</span> <span>12.50</span>
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