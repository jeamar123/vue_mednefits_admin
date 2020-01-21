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
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Company Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div country-input-wrapper">
							<label>Country</label>
							<div class="selector-container">
								<select>
									<option>Singapore</option>
									<option>Malaysia</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Company Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Postal Code</label>
							<input type="text">
						</div>
					</div>
				</div>

				<p class="box-title-black">Business Contact</p>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>First Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last Name</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Job Title</label>
							<div class="selector-container">
								<select>
									<option></option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Email Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
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
							<div v-on:click="toggleBusinessInfoAddCorporate(true)" v-bind:class="{ active : billing_status == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleBusinessInfoAddCorporate(false)" v-bind:class="{ active : billing_status == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col">
						<div class="form-div">
							<label>Billing Name</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Billing Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Postal Code</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>First Name (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last name (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Email Address (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Billing related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<p class="box-title-black">Add Contact/s</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="toggleAddContactStatus(true)" v-bind:class="{ active : add_contacts == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleAddContactStatus(false)" v-bind:class="{ active : add_contacts == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>
				<div v-if="add_contacts">
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>First Name</label>
								<input type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Last Name</label>
								<input type="text">
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Job Title</label>
								<div class="selector-container">
									<select>
										<option></option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Email Address</label>
								<input type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Phone Number</label>
								<input type="text">
							</div>
						</div>
					</div>
					<div class="white-space-20"></div>
					<div class="form-row">
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Send Email for Communication related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Send Email for Billing related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>

					<div class="btn-option-row">
						<div class="btn-container">
							<button class="btn btn-primary btn-add-contact">ADD MORE CONTACT</button>
						</div>
						<div class="rm-container">
							<span class="oi" data-glyph="minus" aria-hidden="true"></span>
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>

				<div v-if="false">
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>First Name</label>
								<input type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Last Name</label>
								<input type="text">
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Job Title</label>
								<select>
									<option></option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</select>
							</div>
						</div>
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Email Address</label>
								<input type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Phone Number</label>
								<input type="text">
							</div>
						</div>
					</div>
					<div class="white-space-20"></div>
					<div class="form-row">
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Send Email for Communication related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Send Email for Billing related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>

					<div class="btn-option-row">
						<div class="btn-container">
							<button class="btn btn-primary btn-add-contact">ADD MORE CONTACT</button>
						</div>
						<div class="rm-container">
							<span class="oi" data-glyph="minus" aria-hidden="true"></span>
						</div>
					</div>
					<div class="white-space-20"></div>
				</div>
			</div>

			<div class="white-box">
				<p class="box-title-blue">Account & Plan</p>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Start Date</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="accountStartDate.null"
	                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
	                popover-visibility="focus"
	              ></v-date-picker>
	              <img :src="'../assets/img/calendar-gray.png'">
              </div>
						</div>
					</div>
					<div class="form-col mr-20 duration-container">
						<div class="form-div">
							<label>Duration</label>
							<div class="duration-input-wrapper">
								<div>
									<input type="text">
								</div>
								<div class="selector-container">
									<select>
										<option>days</option>
										<option>months</option>
										<option>year</option>
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
								<select>
									<option>Singapore Dollar</option>
									<option>Malaysian Ringgit</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>	
					</div>
				</div>
				<div class="form-row">
					<div class="form-col">
						<div class="form-div invoice-date-container">
							<label>Invoice Date</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="invoiceStartDate.null"
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
							<div v-on:click="togglePlanExtensionAddCorporate(true)" v-bind:class="{ active : plan_extension == true }" class="toggle on">Yes</div>
							<div v-on:click="togglePlanExtensionAddCorporate(false)" v-bind:class="{ active : plan_extension == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="plan_extension">
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="planExtensionStartDate.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col mr-20 duration-container">
							<div class="form-div">
								<label>Duration</label>
								<div class="duration-input-wrapper">
									<div>
										<input type="text">
									</div>
									<div class="selector-container">
										<select>
											<option>days</option>
											<option>months</option>
											<option>year</option>
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
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Total Number of Eligible Employees</label>
							<input type="number">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Plan Type</label>
							<div class="selector-container">
								<select>
									<option>Trial Plan</option>
									<option>Insurance Bundle</option>
									<option>Pro Plan</option>
									<option>Lite Plan</option>
									<option>Enterprise Plan</option>
								</select>
								<img :src="'../assets/img/down-arrow.svg'">
							</div>
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Plan Price</label>
							<input type="number">
						</div>
					</div>
					<div class="form-toggle form-col-toggle">
						<label>Payment Status?</label>
						<div class="toggle-wrapper">
							<div class="toggle-btns">
								<div class="toggle on active">Paid</div>
								<div class="toggle off">Pending</div>
							</div>
						</div>
					</div>
					<div class="form-col flex-2">
					</div>
				</div>

				<div v-if="plan_extension" class="form-toggle change-plan-toggle">
					<label>Plan Extension? Change Plan Type?</label>
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="togglePlanExtensionChangeType(true)" v-bind:class="{ active : plan_extension_change_plan == true }" class="toggle on">Yes</div>
							<div v-on:click="togglePlanExtensionChangeType(false)" v-bind:class="{ active : plan_extension_change_plan == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="plan_extension_change_plan">
					<div class="white-space-20"></div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Plan Type</label>
								<select>
									<option>Trial Plan</option>
									<option>Insurance Bundle</option>
									<option>Pro Plan</option>
									<option>Lite Plan</option>
									<option>Enterprise Plan</option>
								</select>
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Secondary Plan Type</label>
								<select>
									<option>Trial Plan</option>
									<option>Insurance Bundle</option>
									<option>Pro Plan</option>
									<option>Lite Plan</option>
									<option>Enterprise Plan</option>
								</select>
							</div>
						</div>
						<div class="form-col">
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Plan Price</label>
								<input type="number">
							</div>
						</div>
						<div class="form-toggle form-col-toggle">
							<label>Payment Status?</label>
							<div class="toggle-wrapper">
								<div class="toggle-btns">
									<div class="toggle on active">Paid</div>
									<div class="toggle off">Pending</div>
								</div>
							</div>
						</div>
						<div class="form-col flex-2">
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Invoice Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="changePlanInvoiceStartDate.null"
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

				<div class="white-space-20"></div>
				<p class="box-title-black">Dependent Account</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div v-on:click="toggleDependentsAddCorporate(true)" v-bind:class="{ active : dependents == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleDependentsAddCorporate(false)" v-bind:class="{ active : dependents == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="dependents">
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Total Number of Eligible Employees</label>
								<input type="number">
							</div>
						</div>
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Plan Type</label>
								<div class="selector-container">
									<select>
										<option>Trial Plan</option>
										<option>Insurance Bundle</option>
										<option>Pro Plan</option>
										<option>Lite Plan</option>
										<option>Enterprise Plan</option>
									</select>
									<img :src="'../assets/img/down-arrow.svg'">
								</div>
							</div>
						</div>
						<div class="form-col">
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Plan Price</label>
								<input type="number">
							</div>
						</div>
						<div class="form-toggle form-col-toggle">
							<label>Payment Status?</label>
							<div class="toggle-wrapper">
								<div class="toggle-btns">
									<div class="toggle on active">Paid</div>
									<div class="toggle off">Pending</div>
								</div>
							</div>
						</div>
						<div class="form-col">
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
							<div v-on:click="toggleHealthSpendingAddCorporate(true)" v-bind:class="{ active : health_spending_account == true }" class="toggle on">Yes</div>
							<div v-on:click="toggleHealthSpendingAddCorporate(false)" v-bind:class="{ active : health_spending_account == false }" class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div v-if="health_spending_account" class="med-well-spending-wrapper">
					<div class="form-row">
						<div class="form-col">
							<p class="box-title-black">Medical Spending Account</p>
							<div class="form-toggle">
								<div class="toggle-wrapper">
									<div class="toggle-btns">
										<div v-on:click="toggleMedicalSpendingAccount(true)" v-bind:class="{ active : medical_spending_account == true }" class="toggle on">Yes</div>
										<div v-on:click="toggleMedicalSpendingAccount(false)" v-bind:class="{ active : medical_spending_account == false }" class="toggle off">No</div>
									</div>
								</div>
							</div>
						</div>
						<div class="form-col mr-20">
							<div class="form-div med-date-container">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="changePlanInvoiceStartDate.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col">
							<div class="form-div med-date-container">
								<label>End Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="changePlanInvoiceStartDate.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
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
										<div v-on:click="toggleWellnessSpendingAccount(true)" v-bind:class="{ active : wellness_spending_account == true }" class="toggle on">Yes</div>
										<div v-on:click="toggleWellnessSpendingAccount(false)" v-bind:class="{ active : wellness_spending_account == false }" class="toggle off">No</div>
									</div>
								</div>
							</div>
						</div>
						<div class="form-col mr-20">
							<div class="form-div well-date-container">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="changePlanInvoiceStartDate.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <img :src="'../assets/img/calendar-gray.png'">
	              </div>
							</div>
						</div>
						<div class="form-col">
							<div class="form-div well-date-container">
								<label>End Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="changePlanInvoiceStartDate.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
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
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Login ID</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Password</label>
							<input type="password">
						</div>
					</div>
					<div class="form-col">
						<div class="white-space-20"></div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
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
										<div v-on:click="toggleSendWelcomeEmailAddCorporate(true)" v-bind:class="{ active : add_cc == true }" class="toggle on">Yes</div>
										<div v-on:click="toggleSendWelcomeEmailAddCorporate(false)" v-bind:class="{ active : add_cc == false }" class="toggle off">No</div>
									</div>
								</div>
								<div v-if="add_cc" class="welcome-email-account-selector">
								<label>Schedule Welcome Email Account?</label>
									<div class="form-toggle form-col-toggle">
										<div class="toggle-wrapper">
											<div class="toggle-btns">
												<div v-on:click="toggleScheduleEmailSend(true)" v-bind:class="{ active : schedule_email == true }" class="toggle on">Yes</div>
												<div v-on:click="toggleScheduleEmailSend(false)" v-bind:class="{ active : schedule_email == false }" class="toggle off">No</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="schedule_email">
					<div class="form-row">
						<div class="form-col flex-2">
							<div class="form-div">
								<label>Add BCC to email</label>
								<div class="add-bcc-input-wrapper">
									<input type="number">
									<button class="btn-primary">Add</button>
								</div>
							</div>
						</div>
						<div class="form-col"></div>
						<div class="form-col"></div>
					</div>

					<div class="bcc-emails-container">
						<div class="bcc-email">
							<span>noelounagac@gmial.com</span>
							<img :src="'../assets/img/cancel.png'">
						</div>
					</div>
				</div>

			</div>

			<div class="white-box">
				<p class="box-title-blue">Benefits Specialist User</p>

				<div class="form-row">
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Code</label>
							<input type="password">
						</div>
					</div>
					<div class="form-col">

					</div>
				</div>
			</div>

			<div class="form-row justify-content-end margin-030">
				<button class="btn btn-primary">CREATE ACCOUNT</button>
			</div>
			<div class="white-space-50"></div>

		</div>
  </div>
</template>

<script>
	import addCorporates from '@/components/corporates/addCorporates'
	export default addCorporates
</script>
