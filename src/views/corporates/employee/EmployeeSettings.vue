<template>
  <div class="settings-details">
    <div v-if="!showEmpCreditsPlan">
      <div>
        <button
          @click="selectedEmpDetailsSettingsClicked(0,'setup-reset-account')"
          class="btn btn-settings"
        >
          <i class="fa fa-wrench"></i> Setup/Reset Account
        </button>
      </div>
      <div>
        <button @click="openEmpCreditsPlan('credits-plans')" class="btn btn-settings">
          <i class="fa fa-check"></i> Credits & Plans
        </button>
      </div>
      <div>
        <button @click="selectedEmpDetailsSettingsClicked(1,'renew-plan')" class="btn btn-settings">
          <i class="fa fa-refresh"></i> Re-new Plan
        </button>
      </div>
      <div>
        <button
          @click="selectedEmpDetailsSettingsClicked(2,'manage-visit')"
          class="btn btn-settings"
        >
          <i class="fa fa-dollar"></i> Manage Cap Per Visit
        </button>
      </div>
      <div>
        <button @click="selectHealthPartnerView( 'HealthPartnerAccess' )" class="btn btn-settings">
          <i class="fa fa-search"></i> Health Partner Access
        </button>
      </div>
      <div>
        <button
          @click="selectedEmpDetailsSettingsClicked(3,'sms-update-notify')"
          class="btn btn-settings"
        >
          <i class="fa fa-envelope"></i> Send SMS Update Notification
        </button>
      </div>
    </div>

    <div v-if="showEmpCreditsPlan" class="credits-plans-wrapper">
      <div>
        <h1>Credits & Plans</h1>
      </div>
      <div>
        <i @click="openEmpCreditsPlan('cancel')" class="fa fa-times"></i>
        <div class="credit-plan-container">
          <div>
            <h3>Credit Allocation</h3>
            <div class="credit-type-selector">
              <button
                @click="creditAllocationOption('medical')"
                v-bind:class="{active: editCreditAllocationOpt == 'medical'}"
                class="btn-primary"
              >MEDICAL</button>
              <button
                @click="creditAllocationOption('wellness')"
                v-bind:class="{active: editCreditAllocationOpt == 'wellness'}"
                class="btn-primary"
              >WELLNESS</button>
            </div>
            <div class="credit-details-container">
              <div class="credit-item-container">
                <div class="credit-btn-wrapper">
                  <div>
                    <div class="credit-item-detail">
                      <span>
                        <span>S$</span>
                        <span>0.00</span>
                      </span>
                      <span>Allocation</span>
                    </div>
                    <div class="credit-item-detail">
                      <span>
                        <span>S$</span>
                        <span>0.00</span>
                      </span>
                      <span>Usage</span>
                    </div>
                  </div>

                  <div class="add-deduct-btn-container">
                    <button
                      @click="creditAllocationTypeFunction('add')"
                      v-bind:class="{active: editCreditAllocationTypeOpt == 'add'}"
                      class="btn-primary"
                    >ADD</button>
                    <button
                      @click="creditAllocationTypeFunction('deduct')"
                      v-bind:class="{active: editCreditAllocationTypeOpt == 'deduct'}"
                      class="btn-primary"
                    >DEDUCT</button>
                  </div>
                </div>
                <div class="credit-input-wrapper">
                  <input
                    v-if="editCreditAllocationTypeOpt == 'add'"
                    type="number"
                    placeholder="Credits Add*"
                  />
                  <input
                    v-if="editCreditAllocationTypeOpt == 'deduct'"
                    type="number"
                    placeholder="Credits Deduct*"
                  />
                </div>
              </div>
            </div>
            <div class="btn-update-credits">
              <button class="btn-primary">UPDATE CREDITS</button>
            </div>
          </div>
          <div>
            <h3>Plan Duration</h3>
            <div class="plan-type-selector">
              <label class="container">
                <span>Standard 1 year</span>
                <input @click="shortTermRadioBtn('standard-one-year')" type="radio" name="radio" />
                <span class="plan-type-checkmark"></span>
              </label>
              <label class="container">
                <span>Short Term</span>
                <input @click="shortTermRadioBtn('short-term')" type="radio" name="radio" />
                <span class="plan-type-checkmark"></span>
              </label>
              <select v-if="showShortTermSelector">
                <option>1 month</option>
                <option>2 months</option>
              </select>
            </div>
            <div class="plan-date-container">
              <div class="start-date-container">
                <h4>Start Date:</h4>
                <div class="date-container">
                  <img :src="'../assets/img/calendar.png'" />
                  <div class="start-date-input-wrapper">
                    <v-date-picker
                      popoverDirection="bottom"
                      v-model="starDateDetails.starDate"
                      :input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
                      :formats="formats"
                      popover-visibility="focus"
                    ></v-date-picker>
                    <i class="fa fa-caret-down"></i>
                  </div>
                </div>
              </div>
              <div class="end-date-container">
                <h4>
                  End Date:
                  <span>2020-08-02</span>
                </h4>
              </div>
              <div>
                <button class="btn-primary">UPDATE PLAN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="showRenewModal" class="employee-details-options show-renewal-modal">
      <div slot="header">
        <h1>Re-new Plan</h1>
      </div>
      <div slot="body">
        <div>
          <div class="renew-plan-row">
            <label>User:</label>
            <span>niknik san</span>
          </div>
          <div class="renew-plan-row">
            <label>ID:</label>
            <span>29467</span>
          </div>
          <div class="renew-plan-row">
            <label>Old Plan Start:</label>
            <span>September 15, 2019</span>
          </div>

          <div class="new-plan-start-container">
            <h4>New Plan Start:</h4>
            <div class="date-container">
              <img :src="'../assets/img/calendar.png'" />
              <div class="start-date-input-wrapper">
                <v-date-picker
                  popoverDirection="bottom"
                  v-model="starDateDetails.null"
                  :input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus"
                ></v-date-picker>
                <i class="fa fa-caret-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="selectedEmpDetailsSettingsClicked(1, 'cancel')" class="btn-close">CANCEL</button>
        <button class="btn-primary settings-btn-submit">PROCEED</button>
      </div>
    </Modal>

    <Modal v-if="showManageCapPerVisit" class="manage-cap-modal-wrapper">
      <div slot="header">
        <h1>Manage Cap Per Visit</h1>
      </div>
      <div slot="body">
        <div>
          <label>GP cap per visit</label>
          <div class="gp-cap-input-wrapper">
            <input v-model="cap_per_visit" type="number" />
            <div class="icon-right">
              <span>SGD</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="selectedEmpDetailsSettingsClicked(2, 'cancel')" class="btn-close">CANCEL</button>
        <button
          @click="updateCapPerVisit(cap_per_visit)"
          class="btn-primary settings-btn-submit"
        >SUBMIT</button>
      </div>
    </Modal>

<!-- Setup Reset Option -->
    <Modal v-if="false">
			<div slot="header">
        <h1>Employee Details Options</h1>
      </div>
			<div slot="body">
				<template ng-if="list.emp_padd_reset_wrapper">
					<div class="emp_padd_reset_wrapper text-center w-full">
						<a href="javascript:void(0)" ng-click="hideEmpPassReset(list)" class="pull-right">
							<i class="fa fa-times"></i>
						</a>
						<div class="white-space-30"></div>
						<button class="btn-primary re-send-btn w-full" ng-click="showUpdatePass(list)">
							Update
							Password
						</button>
						<div class="white-space-20"></div>
						<button
							class="btn-primary re-send-btn w-full"
							ng-click="resendEmployeeEmailDash($event, list)"
						>Resend/Reset Account</button>
						<div class="white-space-20"></div>
						<button class="btn-primary re-send-btn w-full" ng-click="pinSetupShow(list)">Pin Setup</button>
						<div class="white-space-20"></div>
						<button
							class="btn-primary re-send-btn w-full"
							ng-click="unPinSetup(list, $event)"
						>Unset Pin</button>
					</div>
				</template>

				<span ng-if="list.emp_pass_update">
					<div class="px-6">
						<a href="javascript:void(0)" ng-click="hideUpdatePass(list)" class="pull-right">
							<i class="fa fa-times"></i>
						</a>
						<div class="white-space-50"></div>
						<div class="input-container-padding py-1">
							<label class="block pr-2">Email</label>
							<input
								class="bg-transparent border-solid border-b border-gray-500 text-gray-600 w-full py-2"
								type="text"
								ng-model="list.member.Email"
								disabled
							/>
						</div>
						<div class="input-container-padding py-1">
							<label>
								Password
								<span class="text-red-700">*</span>
							</label>
							<input
								class="bg-transparent border-solid border-b border-gray-500 text-gray-600 w-full py-2"
								type="password"
								ng-model="list.password"
								required
							/>
						</div>
						<div class="input-container-padding py-1">
							<label>
								Re-Type Password
								<span class="text-red-700">*</span>
							</label>
							<input
								class="bg-transparent border-solid border-b border-gray-500 text-gray-600 w-full py-2"
								type="text"
								ng-model="list.password2"
								required
							/>
						</div>

						<button
							class="btn-primary re-send-btn w-full my-5"
							ng-click="updatePasswordEmp($event,list)"
						>Update</button>
					</div>
				</span>

				<span ng-if="list.pin_setup_update">
					<div class="px-6">
						<a href="javascript:void(0)" ng-click="pinSetupHide(list)" class="pull-right">
							<i class="fa fa-times"></i>
						</a>
						<div class="white-space-50"></div>
						<div class="input-container-padding py-1">
							<label>
								Pin
								<span class="text-red-700">*</span>
							</label>
							<input
								type="text"
								ng-model="list.pin"
								class="number-only bg-transparent border-solid border-b border-gray-500 text-gray-600 w-full py-2"
								required
							/>
						</div>
						<div class="input-container-padding py-1">
							<label>
								Re-Type Pin
								<span class="text-red-700">*</span>
							</label>
							<input
								type="text"
								ng-model="list.re_pin"
								class="number-only bg-transparent border-solid border-b border-gray-500 text-gray-600 w-full py-2"
								required
							/>
						</div>

						<button
							class="btn-primary re-send-btn w-full my-5"
							ng-click="updatePinEmp($event,list)"
						>Update</button>
					</div>
				</span>
      </div>
			<div slot="footer">
				<button class="btn-close">CLOSE</button>
			</div>
     
    </Modal>
  </div>
</template>

<script>
import employeeSettings from "@/components/corporates/employee/employeeSettings.vue";
export default employeeSettings;
</script>
