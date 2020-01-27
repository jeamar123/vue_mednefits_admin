<template>
	<div>
		<div class="emp-information-container-details">
			<div v-if="!editEmployeeProfile && !addDependentInfo && !editRemoveEmpInfo">
				<div class="emp-info-header">
					<h3>Employee Information</h3>
					<div class="right-btn-container sm:relative">
						<button @click="showEditEmp()" class="btn btn-edit"><img :src="'../assets/img/icons/edit.png'">Edit Profile</button>
					</div>	
				</div>
				<div class="emp-information-details">
					<div class="col-1-emp-info-details">
						<div>
							<strong>Full Name</strong>
							<span>Honglay Rose Lim</span>
						</div>
						<div>
							<strong>Date of Birth</strong>
							<span>2019-03-04</span>
						</div>
						<div>
							<strong>Postal Code</strong>
							<span>12345</span>
						</div>
						<div>
							<strong>Job Title</strong>
							<span>Other</span>
						</div>
						<div>
							<strong>Mobile Country Code</strong>
							<span>+65</span>
						</div>
						<div>
							<strong>Mobile Number</strong>
							<span>+639064317892</span>
						</div>
					</div>

					<div class="col-2-emp-info-details">
						<div>
							<strong>Member ID</strong>
							<span>023735</span>
						</div>
						<div>
							<strong>Work Email</strong>
							<span>honglay@mednefits.com</span>
						</div>
						<div>
							<strong>Bank Account Number</strong>
							<span></span>
						</div>
						<div>
							<strong>Bank Code</strong>
							<span></span>
						</div>
						<div>
							<strong>Bank BRH</strong>
							<span></span>
						</div>
						<div>
							<strong>For Cummunication</strong>
							<span class="emp-username-type-container">
								<label><input type="radio" name="emp-username-type"> Email</label>
								<label><input type="radio" name="emp-username-type"> SMS</label>
							</span>
						</div>
					</div>

				</div>


				<div class="emp-info-btn-footer">
					<div class="sm:block">
						<h3 class=" sm:my-3">Add a Dependent?</h3>
						<button @click="showAddDependent()" class="btn btn-add sm:w-1/2 xs:w-full	"><img :src="'../assets/img/icons/add-employee.svg'">Add</button>
					</div>
					<div>
						<button @click="showRemoveEmp()" class="btn btn-remove-employee sm:relative sm:mt-4 sm:w-1/2 xs:w-full">Remove Employee <i class="fa fa-trash"></i></button>
						<!-- status removed -->
						<button v-if="false" class="btn btn-remove-employee btn-restore">Restore Employee</button>
					</div>
				</div>
			</div>

			<div v-if="editEmployeeProfile" class="edit-emp-profile-wrapper">
				<div class="edit-emp-details-header">
					<div>
						<h3>Edit Employee Details <span class="emp-name-text">Kynn Rodriguez</span></h3>
					</div>
					<i @click="showEditEmp()" class="fa fa-times"></i>
				</div>
				<div class="edit-emp-details-body sm:flex sm:flex-wrap">
					<form class="md:w-full sm:pr-0">
						<div class="edit-dependent-row flex md:flex-wrap">
							<div class="employee-details-input-wrapper md:m-0">
								<label>Full Name</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper md:m-0">
								<label>Mobile Number</label>
								<div class="country-code-mobile-container">
									<div class="country-code-container">
										<input type="text">
										<i class="fa fa-caret-down"></i>
									</div>
									<input type="text">
								</div>	
							</div>
						</div>

						<div class="edit-dependent-row flex md:flex-wrap">
							<div class="employee-details-input-wrapper md:m-0">
								<label>Member ID</label>
								<input type="number">
							</div>
							<div class="employee-details-input-wrapper md:m-0">
								<label>Job Title</label>
								<div class="date-container">
									<input type="text">
								</div>	
							</div>
						</div>

						<div class="edit-dependent-row flex md:flex-wrap">
							<div class="employee-details-input-wrapper md:m-0">
								<label>Date of Birth</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="starDateDetails.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <i class="fa fa-caret-down"></i>
	            	</div>
							</div>
							<div class="employee-details-input-wrapper md:m-0">
								<label>Bank Account Number</label>
								<input type="number">
							</div>
						</div>

						<div class="edit-dependent-row flex md:flex-wrap">
							<div class="employee-details-input-wrapper md:m-0">
								<label>Postal Code</label>
								<input type="number">
							</div>
							<div class="employee-details-input-wrapper md:m-0">
								<label>Bank Code</label>
								<input type="number">
							</div>
						</div>

						<div class="edit-dependent-row flex md:flex-wrap">
							<div class="employee-details-input-wrapper md:m-0">
								<label>Work Email</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper md:m-0">
								<label>Bank BRH</label>
								<input type="number">
							</div>
						</div>

					</form>
					<div class="package-plan-container md:w-1/2 sm:w-full">
						<h4>Package Plan</h4>
						<div>
							<button class="btn-primary">Bundle Pro (Health Wallet)</button>
						</div>
						<div class="package-details-wrapper">
							<div class="package-item-container">
	              <div class="package-img-name-wrapper">
	                <div>
	                  <i class="fa fa-bookmark"></i>
	                </div>
	                <div>
	                  <span class="ng-binding">Outpatient GP</span>
	                </div>
	              </div>
	              <div>
	                <h6 ng-bind="list.package_description" class="ng-binding">Consultation: S$0, covered by us. Medicine &amp; Treatment: Pay using Mednefits Credits.</h6>
	              </div>
	            </div>
	            <div class="package-item-container">
	              <div class="package-img-name-wrapper">
	                <div>
	                  <i class="fa fa-bookmark"></i>
	                </div>
	                <div>
	                  <span class="ng-binding">Dental Care</span>
	                </div>
	              </div>
	              <div>
	                <h6 ng-bind="list.package_description" class="ng-binding">Up to 30% off dental services.</h6>
	              </div>
	            </div>
	            <div class="package-item-container">
	              <div class="package-img-name-wrapper">
	                <div>
	                  <i class="fa fa-bookmark"></i>
	                </div>
	                <div>
	                  <span class="ng-binding">TCM</span>
	                </div>
	              </div>
	              <div>
	                <h6 ng-bind="list.package_description" class="ng-binding">100% consultation covered by Mednefits. You only need to pay for medicine.</h6>
	              </div>
	            </div>
	            <div class="package-item-container">
	              <div class="package-img-name-wrapper">
	                <div>
	                  <i class="fa fa-bookmark"></i>
	                </div>
	                <div>
	                  <span class="ng-binding">Health Screening</span>
	                </div>
	              </div>
	              <div>
	                <h6 ng-bind="list.package_description" class="ng-binding">1 complimentary basic health screening per year.</h6>
	              </div>
	            </div>
	            <div class="package-item-container">
	              <div class="package-img-name-wrapper">
	                <div>
	                  <i class="fa fa-bookmark"></i>
	                </div>
	                <div>
	                  <span class="ng-binding">Health Specialist</span>
	                </div>
	              </div>
	              <div>
	                <h6 ng-bind="list.package_description" class="ng-binding">$70 per consultation (Advanced booking as a Mednefits member is required).</h6>
	              </div>
	            </div>
	            <div class="package-item-container">
	              <div class="package-img-name-wrapper">
	                <div>
	                  <i class="fa fa-bookmark"></i>
	                </div>
	                <div>
	                  <span class="ng-binding">Wellness Benefits</span>
	                </div>
	              </div>
	              <div>
	                <h6 ng-bind="list.package_description" class="ng-binding">Save up to 40% on wellness services.</h6>
	              </div>
	            </div>
						</div>
					</div>
				</div>
				<div class="save-btn-footer">
					<button class="btn-primary">SAVE & CONTINUE</button>
				</div>	
			</div>

			<div v-if="addDependentInfo" class="edit-employee-info-container add-dependent-wrapper">
				<i @click="showAddDependent()" class="fa fa-times"></i>
				<div class="emp-header-text">
					<h3>Add a dependent</h3>
				</div>
				<form>
					<div class="edit-dependent-row">
						<div class="employee-details-input-wrapper">
							<label>Full Name</label>
							<input type="text">
						</div>
						<div class="employee-details-input-wrapper">
							<label>Date of Birth</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="starDateDetails.null"
	                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
	                popover-visibility="focus"
	              ></v-date-picker>
	              <i class="fa fa-caret-down"></i>
	            </div>
						</div>
					</div>
					<div class="edit-dependent-row">
						<div class="employee-details-input-wrapper">
							<label>Relationship</label>
							<select>
								<option>Spouse</option>
								<option>Child</option>
								<option>Family</option>
								<option>Parent</option>
							</select>
						</div>
						<div class="employee-details-input-wrapper">
							<label>Start Date</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="starDateDetails.null"
	                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
	                popover-visibility="focus"
	              ></v-date-picker>
	              <i class="fa fa-caret-down"></i>
	            </div>
						</div>
					</div>
					<div class="save-btn-footer">
						<button class="btn">CANCEL</button>
						<button class="btn-primary">SAVE & CONTINUE</button>
					</div>
				</form>
			</div>

			<div v-if="editRemoveEmpInfo" class="edit-employee-info-container remove-employee-wrapper">
				<i @click="showRemoveEmp()" class="fa fa-times"></i>

				<div v-if="remove_step_active == 'remove-emp'">
					<div class="emp-header-text">
						<h3>Remove Employee</h3>
					</div>
					<form>
						<div class="edit-dependent-row">
							<div class="employee-details-input-wrapper">
								<label>Full Name</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper">
								<label>Last day of coverage</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="starDateDetails.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
	              </div>
							</div>
						</div>
					</form>
				</div>

				<div v-if="remove_step_active == 'remove-opt'">
					<div class="emp-header-text">
						<h3>How would you like to proceed?</h3>
					</div>
					<div class="employee-outcome-container">
						<span class="outcome-title">Please select one of the outcome:</span>
						<label class="review-container input-checkbox">
							<input @click="changeRemoveOption(1)" type="checkbox">
							<p>To replace the leaving employee, I would like to pre-enroll the new joiner.</p>
							<span class="input-checkmark"></span>
						</label>
						<label class="review-container input-checkbox">
							<input @click="changeRemoveOption(2)" type="checkbox">
							<p>I'm not ready to pre-enroll the new joiner, please hold the seat for future hire.</p>
							<p class="review-prepare-template-text">*Note: Once this employee is removed, the occupied seat will move to a vacant seat.</p>
							<span class="input-checkmark"></span>
						</label>
						<label class="review-container input-checkbox">
							<input @click="changeRemoveOption(3)" type="checkbox">
							<p>Please remove the seat completely, and proceed for refund.</p>
							<span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<div v-if="remove_step_active == 'replace-emp'" class="edit-employee-info-container">
					<div class="emp-header-text">
						<span class="replacement-text">Replacement</span>
						<h3>Employee details</h3>
					</div>
					<form>
						<div class="edit-dependent-row">
							<div class="employee-details-input-wrapper">
								<label>Full Name</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper">
								<label>Date of Birth</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="starDateDetails.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
	              </div>
							</div>
						</div>
						<div class="edit-dependent-row">
							<div class="employee-details-input-wrapper">
								<label>Work Email</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper">
								<label>Mobile Number</label>
								<div class="country-code-mobile-container">
									<div class="country-code-container">
										<input type="text"><i class="fa fa-caret-down"></i>
									</div>
									<input type="text">
								</div>
							</div>
						</div>
						<div class="edit-dependent-row">
							<div class="employee-details-input-wrapper">
								<label>Postal Code</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper">
								<label>Start Date</label>
								<div class="date-container">
									<v-date-picker
		                popoverDirection="bottom"
		                v-model="starDateDetails.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
	              </div>
							</div>
						</div>
						<div class="edit-dependent-row">
							<div class="employee-details-input-wrapper">
								<label>Medical Credits</label>
								<label class="medical-subtext">*If there are no credits to allocate, please key in 0</label>
								<input type="text">
							</div>
							<div class="employee-details-input-wrapper">
								<label class="medical-subtext">Wellness Credits Credits</label>
								<label>*If there are no credits to allocate, please key in 0</label>
								<input type="text">
							</div>
						</div>
					</form>
				</div>

				<div v-if="remove_step_active == 'health-spending-summary'" class="health-spending-account-summary-container">
					<div class="emp-header-text">
						<span class="replacement-text">Replacement</span>
						<h3>Health Spending Account Summary</h3>

						<div class="account-summary-pro-rated">Pro-rated allocation from 
	            <span>
	            	<span>
	             		<strong class="bold-text">Start</strong> - 
	              </span>
	              <div class="health-spending-dpicker">
	                <i class="fa fa-calendar"></i>
	                <v-date-picker
		                popoverDirection="bottom"
		                v-model="starDateDetails.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <i class="fa fa-caret-down"></i>
	              </div>
	            </span> to <span>
	            	<span>
	              	<strong class="bold-text">End</strong> - 
	              </span>
	              <div class="health-spending-dpicker">
	                <i class="fa fa-calendar"></i>
	                <v-date-picker
		                popoverDirection="bottom"
		                v-model="starDateDetails.null"
		                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
		                popover-visibility="focus"
		              ></v-date-picker>
		              <i class="fa fa-caret-down"></i>
	              </div>
	            </span>
	            <button class="btn-primary btn-calculate">Calculate</button>
	          </div>
	          <div class="account-summary-usage">Usage from
	            <span>
	              <strong class="bold-text"> Start</strong> - <span class="account-summary-date">03/08/2019</span>
	            </span> to 
	            <span> 
	              <strong class="bold-text">Current</strong> - <span class="account-summary-date">09/09/2019</span>
	            </span>
	          </div>
					</div>
					<div class="medical-wellness-container">
	          <div class="medical-container">
	            <h4 class="spending-account-text">Medical Spending Account</h4>
	            <div class="spending-account-details">
	            <div class="inital-allocation-container">
	              <strong class="bold-text">Initial Allocation</strong>
	              <span>S$ <span>1,000.00</span></span>
	            </div>
	            <div class="pro-rated-container">
	              <strong class="bold-text">Pro-rated Allocation</strong>
	              <span class="bold-text">S$ <span>221.31</span></span>
	            </div>
	            <div class="current-usage-container">
	              <strong class="bold-text">Current Usage</strong>
	              <span class="exceed">S$ <span>0.00</span></span>
	            </div>
	            <div class="spent-container">
	              Spent
	              <span>S$ <span>0.00</span></span>
	            </div>
	            <div class="pending-claim-container">
	              Pending claim
	              <span>S$ <span>0.00</span></span>
	            </div>
	            <div class="balance-summary-container">
	              <strong class="bold-text">Balance</strong>
	              <span class="bold-text">S$ <span>221.31</span></span>
	            </div>
	          </div>
	           <span class="spending-account-status on-track">On Track</span>
	          </div>
	          <div class="separator"></div>
	          <div class="wellness-container">
	            <h4 class="spending-account-text">Wellness Spending Account</h4>
	            <div class="spending-account-details">
	              <div class="inital-allocation-container">
	                <strong class="bold-text">Initial Allocation</strong>
	                <span>S$ <span>1,000.00</span></span>
	              </div>
	              <div class="pro-rated-container">
	                <strong class="bold-text">Pro-rated Allocation</strong>
	                <span class="bold-text">S$ <span>221.31</span></span>
	              </div>
	              <div class="current-usage-container">
	                <strong class="bold-text">Current Usage</strong>
	                <span class="on-track">S$ <span>0.00</span></span>
	              </div>
	              <div class="spent-container">
	                Spent
	                <span>S$ <span>0.00</span></span>
	              </div>
	              <div class="pending-claim-container">
	                Pending claim
	                <span>S$ <span>0.00</span></span>
	              </div>
	              <div class="balance-summary-container">
	                <strong class="bold-text">Balance</strong>
	                <span class="bold-text">S$ <span>221.31</span></span>
	              </div>
	            </div>
	            <span class="spending-account-status on-track">On Track</span>
	          </div>
	        </div>
				</div>

				<div v-if="remove_step_active == 'health-spending-account'" class="health-spending-account-container">
					<div class="emp-header-text">
						<span class="replacement-text">Replacement</span>
						<h3>Health Spending Account</h3>
					</div>
					<div class="health-spending-body">
						<p class="members-wallet-text">Do you want us to update the member’s wallet by reflecting the pro-rated credits amount and balance?</p>
						<p class="members-wallet-note">(note: by doing so, this member might not be able to pay with credits if the current usage exceeded the pro-rated allocation)</p>
						<div>
							<button class="btn btn-back active">NO</button>
							<button class="btn btn-back">YES</button>
						</div>
					</div>
				</div>

				<div class="save-btn-footer">
					<button @click="removeEmployeeBtn('back')" v-if="removeBackBtn" class="btn btn-back">Back</button>
					<button @click="removeEmployeeBtn('next')" class="btn-primary btn-next">Next</button>
				</div>

			</div>	
		</div>

		<div>

			<Modal v-if="withdrawEmployeeModal" class="employee-details-options remove-dependent-container">
				<div slot="header">
					<h1>Withdraw Employee</h1>
					<i @click="showRemoveDependent()" class="fa fa-times"></i>
				</div>
				<div slot="body" class="edit-employee-info-container">
					<div class="edit-dependent-row">
						<div class="employee-details-input-wrapper">
							<label>Name</label>
							<div class="name-text-value">Mike Vega</div>
						</div>
						<div class="employee-details-input-wrapper">
							<label>Effective Date</label>
							<div class="date-container">
								<v-date-picker
	                popoverDirection="bottom"
	                v-model="starDateDetails.null"
	                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
	                popover-visibility="focus"
	              ></v-date-picker>
	              <i class="fa fa-caret-down"></i>
	            </div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<button class="btn-primary btn-delete">DELETE</button>
				</div>
			</Modal>

			

	  	<Modal v-if="showSetupAccountModal" class="employee-details-options">
	  		<div slot="header">
	  			<h1>Employee Details Options</h1>
	  		</div>
	  		<div slot="body">
	  			<div v-if="selected_emp_details_opt == 0" class="btn-options-container">
	  				<button @click="selectedEmpDetailsToggleOpt(1)" class="btn-primary">UPDATE PASSWORD</button>
	  				<button class="btn-primary">RESEND/RESET ACCOUNT</button>
	  				<button @click="selectedEmpDetailsToggleOpt(2)" class="btn-primary">PIN SETUP</button>
	  				<button class="btn-primary">UNSET PIN</button>
	  			</div>

	  			<div v-if="selected_emp_details_opt == 1" class="update-password-container">
	  				<div class="update-pass-header">
	  					<i @click="selectedEmpDetailsToggleOpt(0)" class="fa fa-times"></i>
	  				</div>
	  				<div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Email</label>
	  						<input type="text">
	  					</div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Password*</label>
	  						<input type="text">
	  					</div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Re-Type Password*</label>
	  						<input type="text">
	  					</div>
	  					<div>
	  						<button class="btn-primary btn-update">UPDATE</button>
	  					</div>
	  				</div>
	  			</div>

	  			<div v-if="selected_emp_details_opt == 2">
	  				<div class="update-pass-header">
	  					<i @click="selectedEmpDetailsToggleOpt(0)" class="fa fa-times"></i>
	  				</div>
	  				<div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Pin*</label>
	  						<input type="text">
	  					</div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Re-Type Pin*</label>
	  						<input type="text">
	  					</div>
	  					<div>
	  						<button class="btn-primary btn-update">UPDATE</button>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button @click="selectedEmpDetailsSettingsClicked(0, 'cancel')" class="btn-close">CLOSE</button>
	  		</div>
	  	</Modal>

	  	<Modal v-if="showSmsUpdateNotify" class="employee-details-options">
	  		<div slot="header">
	  			<h1>Send SMS Update Notification</h1>
	  		</div>
	  		<div slot="body">
	  			<div class="sms-form">
	  				<div>
	  					<label>Country Code</label>
	  					<div class="country-mobile-input-wrapper">
	  						<input type="text">
	  						<i class="fa fa-caret-down"></i>
	  					</div>
	  				</div>
	  				<div>
	  					<label>Mobile Number</label>
	  					<div class="country-mobile-input-wrapper">
	  						<input type="text">
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button @click="selectedEmpDetailsSettingsClicked(3, 'cancel')" class="btn-close">CANCEL</button>
	  			<button class="btn-primary settings-btn-submit">SUBMIT</button>
	  		</div>
	  	</Modal>

	  	<Modal v-if="false" class="fill-corporate-pass-container">
	  		<div slot="body">
	  			<h4>Please fill in the corporate password to continue.</h4>
	  			<div>
	  				<input type="text" placeholder="User password">
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button>CANCEL</button>
	  			<button>DONE</button>
	  		</div>
	  	</Modal>
	  </div>
  </div>

</template>

<script>
	import corporateEmployeeInformation from '@/components/corporates/employee/corporateEmployeeInformation.vue'
	export default corporateEmployeeInformation
</script>
