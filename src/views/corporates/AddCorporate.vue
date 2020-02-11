<template>
	<div class="add-corporate-container">
		

		<div class="header-wrapper">
			<p>Create corporate entity account</p>
			<router-link tag="a" to="/dashboard/corporates" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
		</div>

		<div class="add-corporate-wrapper">
			<div class="white-box">
				<p class="box-title-blue">Business Information</p>

				<div class="form-row">
					<div class="form-col flex-2 mg-rgt-20">
						<div class="form-div">
							<label>Company Name</label>
							<input v-model="create_company.company_name" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div country-input-wrapper">
							<label>Country</label>
							<div class="selector-container">
								<select v-model="create_company.country">
									<option></option>
									<option value="sgd">Singapore</option>
									<option value="myr">Malaysia</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col flex-2 mg-rgt-20">
						<div class="form-div">
							<label>Company Address</label>
							<input v-model="create_company.company_address" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Postal Code</label>
							<input v-model="create_company.company_postal_code" type="number">
						</div>
					</div>
				</div>

				<p class="box-title-black">Business Contact</p>

				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>First Name</label>
							<input v-model="create_company.business_contact_first_name" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last Name</label>
							<input v-model="create_company.business_contact_last_name" type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Job Title</label>
							<div class="selector-container">
								<select v-model="create_company.business_job_title">
									<option></option>
									<option v-for="jobs of job_title">{{ jobs }}</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Email Address</label>
							<input v-model="create_company.business_contact_email" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number</label>
							<input v-model="create_company.business_phone" type="number">
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="add-corporate-checkbox input-checkbox">
						  <input v-model="create_company.business_send_email_comm_related" type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="add-corporate-checkbox input-checkbox">
						  <input v-model="create_company.business_send_email_bill_related" type="checkbox">
						  <span class="input-text">Send Email for Billing related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<p class="box-title-black">Billing Information</p>
				<div class="form-toggle">
					<label>Same as Business Information?</label>
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="toggleBusinessInfoAddCorporate(true)" v-bind:class="{ active : create_company.billing_status == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleBusinessInfoAddCorporate(false)" v-bind:class="{ active : create_company.billing_status == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col">
						<div class="form-div">
							<label>Billing Name</label>
							<input v-model="create_company.billing_name" type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col flex-2 mg-rgt-20">
						<div class="form-div">
							<label>Billing Address</label>
							<input v-model="create_company.billing_address" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Postal Code</label>
							<input v-model="create_company.billing_postal_code" type="number">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>First Name (Billing Contact)</label>
							<input v-model="create_company.billing_first_name" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last name (Billing Contact)</label>
							<input v-model="create_company.billing_last_name" type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Email Address (Billing Contact)</label>
							<input v-model="create_company.billing_email" type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number (Billing Contact)</label>
							<input v-model="create_company.billing_phone" type="number">
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="add-corporate-checkbox input-checkbox">
						  <input v-model="create_company.bill_send_email_comm_related" type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="add-corporate-checkbox input-checkbox">
						  <input v-model="create_company.bill_send_email_bill_related" type="checkbox">
						  <span class="input-text">Send Email for Billing related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<p class="box-title-black">Add Contact/s</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="toggleAddContactStatus(true)" v-bind:class="{ active : create_company.add_contacts == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleAddContactStatus(false)" v-bind:class="{ active : create_company.add_contacts == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>
				<div v-if="create_company.add_contacts" v-for="(list, index) of create_company.company_contacts" class="add-more-contact-container">
					<div class="form-row">
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>First Name</label>
								<input v-model="list.add_contact_business_contact_first_name" type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Last Name</label>
								<input v-model="list.add_contact_business_contact_last_name" type="text">
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Job Title</label>
								<div class="selector-container">
									<select v-model="list.add_contact_business_job_title">
										<option></option>
										<option v-for="jobs of job_title">{{ jobs }}</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Email Address</label>
								<input v-model="list.add_contact_business_contact_email" type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Phone Number</label>
								<input v-model="list.add_contact_business_phone" type="text">
							</div>
						</div>
					</div>
					<div class="white-space-20"></div>
					<div class="form-row">
						<div class="form-div">
							<label class="add-corporate-checkbox input-checkbox">
							  <input v-model="list.add_business_send_email_comm_related" type="checkbox">
							  <span class="input-text">Send Email for Communication related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label class="add-corporate-checkbox input-checkbox">
							  <input v-model="list.add_business_send_email_bill_related" type="checkbox">
							  <span class="input-text">Send Email for Billing related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>

					<div class="btn-option-row">
						<div class="btn-container">
							<button v-on:click="addCompanyContact()" :disabled="create_company.company_contacts[index + 1]" class="btn btn-primary btn-add-contact">ADD MORE CONTACT</button>
						</div>
						<div v-if="create_company.company_contacts[index + 1]" class="rm-container">
							<span v-on:click="removeCompanyContact(index + 1)" class="oi" data-glyph="minus" aria-hidden="true"></span>
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>
			</div>

			<div class="white-box">
				<p class="box-title-blue">Account & Plan</p>

				<div class="form-row">
					<div class="form-col mg-rgt-20 account-date-container">
						<div class="form-div">
							<label>Start Date</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="create_company.emmployee_plan_start"
	                :formats='formats'
	                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
	                popover-visibility="focus"
	              ></v-date-picker>
	              <img :src="'../assets/img/calendar-gray.png'">
              </div>
						</div>
					</div>
					<div class="form-col mg-rgt-20 duration-container">
						<div class="form-div">
							<label>Duration</label>
							<div class="duration-input-wrapper">
								<div>
									<input v-model="create_company.duration_value" min="0" type="number" v-on:input="startDateChanged()">
								</div>
								<div class="selector-container">
									<select v-model="create_company.duration_type" v-on:change="startDateChanged()">
										<option></option>
										<option value="days">days</option>
										<option value="months">months</option>
										<option value="years">years</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Currency</label>
							<div class="selector-container">
								<select v-model="create_company.currency">
									<option></option>
									<option value="sgd">Singapore Dollar</option>
									<option value="myr">Malaysian Ringgit</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>	
					</div>
				</div>
				<div class="form-row">
					<div class="form-col invoice-date-row">
						<div class="form-div invoice-date-container">
							<label>Invoice Date</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="create_company.main_plan_invoice_date"
	                :formats='formats'
	                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
	                popover-visibility="focus"
	              ></v-date-picker>
	              <img :src="'../assets/img/calendar-gray.png'">
              </div>
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-toggle">
					<label>Plan Extension?</label>
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="togglePlanExtensionAddCorporate(true)" v-bind:class="{ active : create_company.employee_plan_extension == true }" class="toggle on">Yes</div>
							<div v-on:click="togglePlanExtensionAddCorporate(false)" v-bind:class="{ active : create_company.employee_plan_extension == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="create_company.employee_plan_extension">
					<div class="form-row">
						<div class="form-col mg-rgt-20 account-date-container">
							<div class="form-div">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.plan_start_extension"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats = 'formats'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col mg-rgt-20 duration-container">
							<div class="form-div">
								<label>Duration</label>
								<div class="duration-input-wrapper">
									<div>
										<input v-model="create_company.duration_value_extension" type="text">
									</div>
									<div class="selector-container">
										<select v-model="create_company.employee_duration_extension_type">
											<option></option>
											<option value="days">days</option>
											<option value="months">months</option>
											<option value="year">years</option>
										</select>
										<img :src="'../assets/img/down-arrow.svg'">
									</div>
								</div>
							</div>
						</div>
						<div class="form-col">	
						</div>
					</div>
				</div>

				<p class="box-title-black">Employee Account</p>
				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Total Number of Eligible Employees</label>
							<input v-model="create_company.employee_employees" type="number">
						</div>
					</div>
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Plan Type</label>
							<div class="selector-container">
								<select v-model="create_company.employee_account_type" v-on:change="accountTypeChanged( create_company.employee_account_type )">
									<option></option>
									<option value="trial_plan">Trial Plan</option>
									<option value="insurance_bundle">Insurance Bundle</option>
									<option value="stand_alone_plan">Pro Plan</option>
									<option value="lite_plan">Lite Plan</option>
									<option value="enterprise_plan">Enterprise Plan</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
					<div class="form-col">
						<div 
						v-if="create_company.employee_account_type && create_company.employee_account_type != 'stand_alone_plan' && create_company.employee_account_type != 'lite_plan' && create_company.employee_account_type != 'enterprise_plan' " 
						class="form-div">
							<label>Secondary Plan Type</label>
							<div class="selector-container">
								<select v-model="create_company.employee_secondary_account_type">
									<option></option>
									<option v-if="create_company.employee_account_type == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
									<option v-if="create_company.employee_account_type == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

	                <option v-if="create_company.employee_account_type == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
	                <option v-if="create_company.employee_account_type == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Plan Price</label>
							<div class="account-plan-input-wrapper">
								<div>
									<span v-if="create_company.currency == 'sgd'">SGD</span>
									<span v-if="create_company.currency == 'myr'">MYR</span>
								</div>
								<input v-model="create_company.employee_plan_price" type="number">
							</div>
						</div>
					</div>
					<div class="form-toggle form-col-toggle">
						<label>Payment Status?</label>
						<div class="toggle-wrapper">
							<div class="toggle-btns">
								<div v-on:click="togglePaymentStatusAddCorporate(true)" v-bind:class="{ active : create_company.employee_payment_status == true }" class="toggle on">Paid</div>
								<div v-on:click="togglePaymentStatusAddCorporate(false)" v-bind:class="{ active : create_company.employee_payment_status == false }" class="toggle off">Pending</div>
							</div>
						</div>
					</div>
					<div class="form-col flex-2">
					</div>
				</div>

				<div v-if="create_company.employee_plan_extension" class="form-toggle change-plan-toggle">
					<label>Plan Extension? Change Plan Type?</label>
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="togglePlanExtensionChangeType(true)" v-bind:class="{ active : create_company.plan_extension_change_plan == true }" class="toggle on">Yes</div>
							<div v-on:click="togglePlanExtensionChangeType(false)" v-bind:class="{ active : create_company.plan_extension_change_plan == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>
				<!-- Plan extension change plan -->
				<div v-if="create_company.plan_extension_change_plan">
					<div class="white-space-20"></div>
					<div class="form-row">
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Plan Type</label>
								<div class="selector-container">
									<select v-model="create_company.employee_account_type_extension" v-on:change="accountTypeExtensionChanged( create_company.employee_account_type_extension )">
										<option></option>
										<option value="trial_plan">Trial Plan</option>
										<option value="insurance_bundle">Insurance Bundle</option>
										<option value="stand_alone_plan">Pro Plan</option>
										<option value="lite_plan">Lite Plan</option>
										<option value="enterprise_plan">Enterprise Plan</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
						<div class="form-col">
							<div v-if="create_company.employee_account_type_extension && create_company.employee_account_type_extension != 'stand_alone_plan' && create_company.employee_account_type_extension != 'lite_plan' && create_company.employee_account_type_extension != 'enterprise_plan'" 
							class="form-div">
								<label>Secondary Plan Type</label>
								<div class="selector-container">
									<select v-model="create_company.employee_secondary_account_type_extension">
										<option></option>
										<option v-if="create_company.employee_account_type_extension == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
										<option v-if="create_company.employee_account_type_extension == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

										<option v-if="create_company.employee_account_type_extension == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
										<option v-if="create_company.employee_account_type_extension == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
						<div class="form-col">
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Plan Price</label>
								<div class="account-plan-input-wrapper">
									<div>
										<span v-if="create_company.currency == 'sgd'">SGD</span>
										<span v-if="create_company.currency == 'myr'">MYR</span>
									</div>
									<input v-model="create_company.employee_plan_price_extension" type="number">
								</div>
							</div>
						</div>
						<div class="form-toggle form-col-toggle">
							<label>Payment Status?</label>
							<div class="toggle-wrapper">
								<div class="toggle-btns">
									<div v-on:click="togglePaymentStatusExtensionAddCorporate(true)" v-bind:class="{ active : create_company.employee_payment_status_extension == true }" class="toggle on">Paid</div>
									<div v-on:click="togglePaymentStatusExtensionAddCorporate(false)" v-bind:class="{ active : create_company.employee_payment_status_extension == false }" class="toggle off">Pending</div>
								</div>
							</div>
						</div>
						<div class="form-col flex-2">
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mg-rgt-20 account-date-container">
							<div class="form-div">
								<label>Invoice Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.employee_plan_start_extension"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats = 'formats'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col">
						</div>
						<div class="form-col">
						</div>
					</div>
				</div>

				<div class="white-space-20"></div>
				<p class="box-title-black">Dependent Account</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="toggleDependentsAddCorporate(true)" v-bind:class="{ active : create_company.dependent_status == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleDependentsAddCorporate(false)" v-bind:class="{ active : create_company.dependent_status == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="create_company.dependent_status">
					<div class="form-row">
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Total Number of Eligible Employees</label>
								<input v-model="create_company.dependents_employees" type="number">
							</div>
						</div>
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Plan Type</label>
								<div class="selector-container">
									<select v-model="create_company.dependent_account_type" v-on:change="accountDependentsTypeChanged( create_company.dependent_account_type )">
										<option></option>
										<option value="trial_plan">Trial Plan</option>
										<option value="insurance_bundle">Insurance Bundle</option>
										<option value="stand_alone_plan">Pro Plan</option>
										<option value="lite_plan">Lite Plan</option>
										<option value="enterprise_plan">Enterprise Plan</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
						<div class="form-col">
							<div 
								v-if="create_company.dependent_account_type && create_company.dependent_account_type != 'stand_alone_plan' && create_company.dependent_account_type != 'lite_plan' && create_company.dependent_account_type != 'enterprise_plan' " 
								class="form-div">
								<label>Secondary Plan Type</label>
								<div class="selector-container">
									<select v-model="create_company.dependent_secondary_account_type">
										<option></option>
										<option v-if="create_company.dependent_account_type == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
										<option v-if="create_company.dependent_account_type == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

		                <option v-if="create_company.dependent_account_type == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
		                <option v-if="create_company.dependent_account_type == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mg-rgt-20">
							<div class="form-div">
								<label>Plan Price</label>
								<div class="account-plan-input-wrapper">
									<div>
										<span v-if="create_company.currency == 'sgd'">SGD</span>
									<span v-if="create_company.currency == 'myr'">MYR</span>
									</div>
									<input v-model="create_company.dependent_plan_price" type="number">
								</div>
							</div>
						</div>
						<div class="form-toggle form-col-toggle">
							<label>Payment Status?</label>
							<div class="toggle-wrapper">
								<div class="toggle-btns">
									<div v-on:click="togglePaymentStatusDependentsAddCorporate(true)" v-bind:class="{ active : create_company.dependent_payment_status == true }" class="toggle on">Paid</div>
									<div v-on:click="togglePaymentStatusDependentsAddCorporate(false)" v-bind:class="{ active : create_company.dependent_payment_status == false }" class="toggle off">Pending</div>
								</div>
							</div>
						</div>
						<div class="form-col">
						</div>
					</div>

					<!-- Plan extension dependent -->
					<div v-if="create_company.employee_plan_extension" class="form-toggle change-plan-toggle">
						<label>Plan Extension? Change Plan Type?</label>
						<div class="toggle-wrapper">
							<div class="toggle-btns">
								<div v-on:click="togglePlanExtensionDependentsAddCorporate(true)" v-bind:class="{ active : create_company.dependent_plan_extension_status == true }" class="toggle on">Yes</div>
								<div v-on:click="togglePlanExtensionDependentsAddCorporate(false)" v-bind:class="{ active : create_company.dependent_plan_extension_status == false }" class="toggle off">No</div>
							</div>
						</div>
					</div>

					<div v-if="create_company.dependent_plan_extension_status">
						<div class="white-space-20"></div>
						<div class="form-row">
							<div class="form-col mg-rgt-20">
								<div class="form-div">
									<label>Plan Type</label>
									<div class="selector-container">
										<select v-model="create_company.secondary_account_type_extension" v-on:change="accountTypeExtensionDependentsChanged( create_company.secondary_account_type_extension )">
											<option></option>
											<option value="trial_plan">Trial Plan</option>
											<option value="insurance_bundle">Insurance Bundle</option>
											<option value="stand_alone_plan">Pro Plan</option>
											<option value="lite_plan">Lite Plan</option>
											<option value="enterprise_plan">Enterprise Plan</option>
										</select>
										<img :src="'../assets/img/down-arrow.svg'">
									</div>
								</div>
							</div>
							<div class="form-col">
								<div 
									v-if="create_company.secondary_account_type_extension && create_company.secondary_account_type_extension != 'stand_alone_plan' && create_company.secondary_account_type_extension != 'lite_plan' && create_company.secondary_account_type_extension != 'enterprise_plan' "
									class="form-div">
									<label>Secondary Plan Type</label>
									<div class="selector-container">
										<select v-model="create_company.secondary_account_type_extension_dependents">
											<option></option>
											<option v-if="create_company.secondary_account_type_extension == 'trial_plan'" value="pro_trial_plan_bundle">Trial - Pro Plan</option>
											<option v-if="create_company.secondary_account_type_extension == 'trial_plan'" value="trial_plan_lite">Trial - Lite Plan</option>

											<option v-if="create_company.secondary_account_type_extension == 'insurance_bundle'" value="pro_plan_bundle">Pro Plan Bundle</option>
											<option v-if="create_company.secondary_account_type_extension == 'insurance_bundle'" value="insurance_bundle_lite">Insurance Bundle Lite</option>
										</select>
										<img :src="'../assets/img/down-arrow.svg'">
									</div>
								</div>
							</div>
							<div class="form-col">
							</div>
						</div>
						<div class="form-row">
							<div class="form-col mg-rgt-20">
								<div class="form-div">
									<label>Plan Price</label>
									<div class="account-plan-input-wrapper">
										<div>
											<span v-if="create_company.currency == 'sgd'">SGD</span>
											<span v-if="create_company.currency == 'myr'">MYR</span>
										</div>
										<input v-model="create_company.dependent_plan_price_extension" type="number">
									</div>
								</div>
							</div>
							<div class="form-toggle form-col-toggle">
								<label>Payment Status?</label>
								<div class="toggle-wrapper">
									<div class="toggle-btns">
										<div v-on:click="togglePaymentStatusExtensionDependentsAddCorporate(true)" v-bind:class="{ active : create_company.dependent_payment_status_extension == true }" class="toggle on">Paid</div>
										<div v-on:click="togglePaymentStatusExtensionDependentsAddCorporate(false)" v-bind:class="{ active : create_company.dependent_payment_status_extension == false }" class="toggle off">Pending</div>
									</div>
								</div>
							</div>
							<div class="form-col flex-2">
							</div>
						</div>
						<div class="form-row">
							<div class="form-col mg-rgt-20 invoice-date-row">
								<div class="form-div">
									<label>Invoice Date</label>
									<div class="date-container">
										<v-date-picker
			                popoverDirection="bottom"
			                v-model="create_company.plan_start_extension_dependents"
			                :formats='formats'
			                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
			                popover-visibility="focus"
			              ></v-date-picker>
			              <img :src="'../assets/img/calendar-gray.png'">
		              </div>
								</div>
							</div>
							<div class="form-col">
							</div>
							<div class="form-col">
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="white-box">
				<p class="box-title-blue">Plan Add-On</p>

				<p class="box-title-black">Health Spending Account</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="toggleHealthSpendingAddCorporate(true)" v-bind:class="{ active : create_company.health_spending_account == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleHealthSpendingAddCorporate(false)" v-bind:class="{ active : create_company.health_spending_account == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="create_company.health_spending_account" class="med-well-spending-wrapper">
					<div class="form-row">
						<div class="form-col">
							<p class="box-title-black">Medical Spending Account</p>
							<div class="form-toggle">
								<div class="toggle-wrapper">
									<div class="toggle-btns">
										<div v-on:click="toggleMedicalSpendingAccount(true)" v-bind:class="{ active : create_company.medical_spending_account == true }" class="toggle on">Yes</div>
										<div v-on:click="toggleMedicalSpendingAccount(false)" v-bind:class="{ active : create_company.medical_spending_account == false }" class="toggle off">No</div>
									</div>
								</div>
							</div>
						</div>
						<div class="form-col mg-rgt-20">
							<div class="form-div med-date-container">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.medical_spending_start_date"
		                :input-props='{class: "spendingDatePicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats='formats'
		                popover-visibility="focus"
		                v-bind:class="{ noSpending : create_company.medical_spending_account == false }"
		              >
		              </v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col">
							<div class="form-div med-date-container spending-end-date-container">
								<label>End Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.medical_spending_end_date"
		                :input-props='{class: "spendingDatePicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats = 'formats'
		                popover-visibility="focus"
		                v-bind:class="{ noSpending : create_company.medical_spending_account == false }"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
					</div>

					<div class="form-row">
						<div class="form-col">
							<p class="box-title-black">Wellness Spending Account</p>
							<div class="form-toggle">
								<div class="toggle-wrapper">
									<div class="toggle-btns">
										<div v-on:click="toggleWellnessSpendingAccount(true)" v-bind:class="{ active : create_company.wellness_spending_account == true }" class="toggle on">Yes</div>
										<div v-on:click="toggleWellnessSpendingAccount(false)" v-bind:class="{ active : create_company.wellness_spending_account == false }" class="toggle off">No</div>
									</div>
								</div>
							</div>
						</div>
						<div class="form-col mg-rgt-20">
							<div class="form-div well-date-container">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.wellness_spending_start_date"
		                :input-props='{class: "spendingDatePicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats='formats'
		                popover-visibility="focus"
		                v-bind:class="{ noSpending : create_company.wellness_spending_account == false }"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col">
							<div class="form-div well-date-container spending-end-date-container">
								<label>End Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.wellness_spending_end_date"
		                :input-props='{class: "spendingDatePicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats='formats'
		                popover-visibility="focus"
		                v-bind:class="{ noSpending : create_company.wellness_spending_account == false }"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="white-box">
				<p class="box-title-blue">Business Portal</p>

				<div class="form-row">
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Login ID</label>
							<input v-model="create_company.business_portal_email" type="text">
						</div>
					</div>
					<div class="form-col mg-rgt-20">
						<div class="form-div password-input-wrapper">
							<label>Password</label>
							<input type="password" v-model="create_company.business_portal_password" :disabled="create_company.disable_password_input">
						</div>
					</div>
					<div class="form-col">
						<div class="white-space-20"></div>
						<div class="form-div">
							<label class="add-corporate-checkbox input-checkbox">
							  <input v-model="create_company.generate_password" v-on:click="watchPasswordInput(create_company.generate_password)" type="checkbox">
							  <span class="input-text">Auto Generate Password</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>
				</div>

				<div class="form-row">
					<div class="form-col">
						<p class="box-title-black">Send Welcome Email</p>
						<div class="form-toggle">
							<div class="send-welcome-email-toggle">
								<div class="toggle-wrapper">
									<div class="toggle-btns">
										<div v-on:click="toggleSendWelcomeEmailAddCorporate(true)" v-bind:class="{ active : create_company.send_email == true }" class="toggle on">Yes</div>
										<div v-on:click="toggleSendWelcomeEmailAddCorporate(false)" v-bind:class="{ active : create_company.send_email == false }" class="toggle off">No</div>
									</div>
								</div>
								<div v-if="create_company.send_email" class="welcome-email-account-selector">
								<label>Schedule Welcome Email Account?</label>
									<div class="form-toggle form-col-toggle">
										<div class="toggle-wrapper">
											<div class="toggle-btns">
												<div v-on:click="toggleScheduleEmailSend(true)" v-bind:class="{ active : create_company.schedule_email == true }" class="toggle on">Yes</div>
												<div v-on:click="toggleScheduleEmailSend(false)" v-bind:class="{ active : create_company.schedule_email == false }" class="toggle off">No</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="create_company.schedule_email">
					<div class="form-row">
						<div class="form-col flex-2">
							<div class="form-div">
								<label>Send Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="create_company.send_account_email_date"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                :formats='formats'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col"></div>
						<div class="form-col"></div>
					</div>
				</div>

				<div v-if="create_company.send_email">
					<div class="form-row">
						<div class="form-col flex-2">
							<div class="form-div">
								<label>Add BCC to email</label>
								<div class="add-bcc-input-wrapper">
									<input type="text" v-model="add_cc_create_data">
									<button v-on:click="addCreateCompanyCCEmail( add_cc_create_data )" class="btn-add-bcc">Add</button>
								</div>
							</div>
						</div>
						<div class="form-col"></div>
						<div class="form-col"></div>
					</div>

					<div class="bcc-emails-container">
						<p v-if="cc_email_err" class="text-error">Invalid Email.</p>
          	<p v-if="cc_email_repeat" class="text-error">Email already added.</p>

						<div v-for="list of create_company.cc_emails" class="bcc-email">
							<span>{{ list }}</span>
							<img v-on:click="removeCreateCompanyCCEmail( add_cc_create_data )" :src="'../assets/img/cancel.png'">
						</div>
					</div>
				</div>

			</div>

			<div class="white-box">
				<p class="box-title-blue">Benefits Specialist User</p>

				<div class="form-row">
					<div class="form-col flex-2 mg-rgt-20">
						<div class="form-div">
							<label>Name</label>
							<input v-model="create_company.benefits_name" type="text">
						</div>
					</div>
					<div class="form-col mg-rgt-20">
						<div class="form-div">
							<label>Code</label>
							<input v-model="create_company.benefits_code" type="password">
						</div>
					</div>
					<div class="form-col">

					</div>
				</div>
			</div>

			<div class="form-row justify-content-end margin-030">
				<button v-on:click="createCorporateDashboard( create_company )" class="btn submit-add-corporate-btn">CREATE ACCOUNT</button>
			</div>
			<div class="white-space-50"></div>

		</div>
  </div>
</template>

<script>
	import addCorporates from '@/components/corporates/addCorporates'
	export default addCorporates
</script>
