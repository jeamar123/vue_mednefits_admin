<template>
	<div class="enrollment-summary-container">
		<h1>Please check if all employee details are correct before we enroll them</h1>

    <div class="tbl-scroll-wrapper">
      <table class="tbl-enrollment-summary">
        <thead>
          <tr>
            <th>
              <input type="checkbox" v-model="global_isAllCheckBoxChecked" v-on:change="_allCheckBoxEmployee_(global_isAllCheckBoxChecked)">
            </th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Work Email</th>
            <th>Country Code</th>
            <th>Mobile</th>
            <th>Medical Entitlement</th>
            <th>Wellness Entitlement</th>
            <div class="dependents" v-for="(list, index) in global_DepCtr">
              <th>Dependent {{index+1}}<br>Fullname</th>
              <th>Dependent {{index+1}}<br>Date of Birth</th>
              <th>Dependent {{index+1}}<br>Relationship</th>
            </div>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in global_tempEmployeeList" v-bind:class="{'has-error' : list.error_logs.error_status}">
            <td>
              <input type="checkbox" v-model="list.selected" v-on:change="_checkBoxEmployee_(list,list.selected)" >
            </td>
            <td>
              <div class="fullname-box">
                <div class="fullname-text">{{ list.fullname }}</div>
                <div class="edit-icon" v-on:click="_toggleSummaryEditModal_(list)"><i class="fa fa-pencil"></i></div>
              </div>
            </td>
            <td>{{ _formatDate_( list.dob, null, 'DD/MM/YYYY' ) }}</td>
            <td>{{ list.email }}</td>
            <td>+{{ list.mobile_area_code }}</td>
            <td>{{ list.mobile }}</td>
            <td>{{ list.medical_credits }}</td>
            <td>{{ list.wellness_credits }}</td>
            <div class="dependents" v-for="(dep, dep_index) in list.dependent">
              <td>{{dep.fullname}}</td>
              <td>{{ _formatDate_( dep.dob, null, 'DD/MM/YYYY' ) }}</td>
              <td class="txt-transform-capitalize">{{dep.relationship}}</td>
            </div>
            <td v-if="list.dependent.length != global_DepCtr" :colspan="((global_DepCtr - list.dependent.length) * 3)"></td>
            <td>{{ _formatDate_( list.start_date, null, 'DD/MM/YYYY' ) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dp-flex align-items-center footer-options">
      <div class="flex-1 xs-hide">
        <button class="btn-gray-with-shadow" :disabled="global_selectedIds.length == 0" v-on:click="_removeSelectedEmployees_()">DELETE</button>
      </div>
      <div class="flex-4 dp-flex align-items-center checkbox-container">
        <div class="label-checkbox">
          <label>
            <input type="checkbox" v-model="global_enrollOptions.isSendWelcomeEmail">
            Send User Welcome Email/SMS
          </label>
        </div>
        <div class="label-checkbox dp-flex align-items-center password-check-input">
          <label>
            <input type="checkbox" v-model="global_enrollOptions.isProvideDefaultPassword">
            Provide Default Password
          </label>
          <div v-if="global_enrollOptions.isProvideDefaultPassword" class="password-input">
            <label>Password</label>
            <input type="text" v-model="global_enrollOptions.defaultPassword">
          </div>
        </div>
        
      </div>
      <div class="flex-1 txt-right justify-content-end xs-hide">
        <button class="btn-gray-with-shadow" :disabled="global_hasError" v-on:click="_submitEnrollTempEmployees_()">ENROLL</button>
      </div>
    </div>
    <div class="xs-footer-btns">
      <div class="flex-1">
        <button class="btn-gray-with-shadow" :disabled="global_selectedIds.length == 0" v-on:click="_removeSelectedEmployees_()">DELETE</button>
      </div>
      <div class="flex-1 txt-right">
        <button class="btn-gray-with-shadow" :disabled="global_hasError" v-on:click="_submitEnrollTempEmployees_()">ENROLL</button>
      </div>
    </div>

    <div>
			<Modal v-if="global_isSummaryEditModalShow" class="summary-edit-employee-modal">
				<div slot="header">
					<h1>Edit Employee Details</h1>
				</div>
				<div slot="body">
					<div class="summary-edit-emp-form">
            <div class="form-box">
              <label>Full Name*</label>
              <input type="text" v-model="global_selectedEmployee.fullname">
              <span v-if="global_selectedEmployee.error_logs.fullname_error" class="err-message">{{ global_selectedEmployee.error_logs.fullname_message }}</span>
            </div>
            <div class="form-box">
              <label>Date of Birth</label>
              <div class="date-container vDatepicker">
                <v-date-picker 
                  popoverDirection="bottom" 
                  v-model="global_selectedEmployee.dob"
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus" 
                  :formats='formats'></v-date-picker>
                <i class="fa fa-caret-down"></i>
              </div>
              <span v-if="global_selectedEmployee.error_logs.dob_error" class="err-message">{{ global_selectedEmployee.error_logs.dob_message }}</span>
            </div>
            <div class="form-box">
              <label>Work Email</label>
              <input type="text" v-model="global_selectedEmployee.email">
              <span v-if="global_selectedEmployee.error_logs.email_error" class="err-message">{{ global_selectedEmployee.error_logs.email_message }}</span>
            </div>
            <div class="form-box">
              <label>Mobile Area Code</label>
              <select v-model="global_selectedEmployee.mobile_area_code">
                <option value=""></option>
                <option value="65">(SG) +65</option>
                <option value="63">(PH) +63</option>
                <option value="60">(MY) +60</option>
              </select>
              <i class="fa fa-caret-down"></i>
              <span v-if="global_selectedEmployee.error_logs.mobile_area_code_error" class="err-message">{{ global_selectedEmployee.error_logs.mobile_area_code_message }}</span>
            </div>
            <div class="form-box">
              <label>Mobile</label>
              <input type="text" v-model="global_selectedEmployee.mobile">
              <span v-if="global_selectedEmployee.error_logs.mobile_error" class="err-message">{{ global_selectedEmployee.error_logs.mobile_message }}</span>
            </div>
            <div class="form-box">
              <label>Job Title</label>
              <select v-model="global_selectedEmployee.job_title">
                <option value=""></option>
                <option :value="jobs.job_title" v-for="jobs in jobList" :key="jobs.index">
                  {{jobs.job_title}}
                </option>
              </select>
              <i class="fa fa-caret-down"></i>
              <span v-if="global_selectedEmployee.error_logs.job_title_error" class="err-message">{{ global_selectedEmployee.error_logs.job_title_message }}</span>
            </div>
            <div class="form-box">
              <label>Medical Credits</label>
              <input type="text" v-model="global_selectedEmployee.medical_credits">
              <span v-if="global_selectedEmployee.error_logs.credits_medical_error" class="err-message">{{ global_selectedEmployee.error_logs.credits_medical_message }}</span>
            </div>
            <div class="form-box">
              <label>Wellness Credits</label>
              <input type="text" v-model="global_selectedEmployee.wellness_credits">
              <span v-if="global_selectedEmployee.error_logs.credits_wellness_error" class="err-message">{{ global_selectedEmployee.error_logs.credits_wellness_message }}</span>
            </div>
            <div class="form-box">
              <label>Start Date</label>
              <div class="date-container vDatepicker">
                <v-date-picker 
                  popoverDirection="top" 
                  v-model="global_selectedEmployee.start_date"
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus" 
                  :formats='formats'></v-date-picker>
                <i class="fa fa-caret-down"></i>
              </div>
              <span v-if="global_selectedEmployee.error_logs.start_date_error" class="err-message">{{ global_selectedEmployee.error_logs.start_date_message }}</span>
            </div>

            <div v-for="(dep, dep_index) in global_selectedEmployee.dependent" class="dependent-form">
              <p>Dependent {{dep_index+1}}</p>
              <div class="form-box">
                <label>Full Name*</label>
                <input type="text" v-model="dep.fullname">
                <span v-if="dep.error_logs.fullname_error" class="err-message">{{ dep.error_logs.fullname_message }}</span>
              </div>
              <div class="form-box">
                <label>Date of Birth</label>
                <div class="date-container vDatepicker">
                  <v-date-picker 
                    popoverDirection="bottom" 
                    v-model="dep.dob"
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus" 
                    :formats='formats'></v-date-picker>
                  <i class="fa fa-caret-down"></i>
                </div>
                <span v-if="dep.error_logs.dob_error" class="err-message">{{ dep.error_logs.dob_message }}</span>
              </div>
              <div class="form-box">
                <label>Relationship</label>
                <select v-model="dep.relationship">
                  <option value=""></option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="family">Family</option>
                </select>
                <i class="fa fa-caret-down"></i>
                <span v-if="dep.error_logs.relationship_error" class="err-message">{{ dep.error_logs.relationship_message }}</span>
              </div>
              <div class="form-box">
                <label>Start Date</label>
                <div class="date-container vDatepicker">
                  <v-date-picker 
                    popoverDirection="top" 
                    v-model="dep.plan_start"
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus" 
                    :formats='formats'></v-date-picker>
                  <i class="fa fa-caret-down"></i>
                </div>
                <span v-if="dep.error_logs.start_date_error" class="err-message">{{ dep.error_logs.start_date_message }}</span>
              </div>
            </div>
          </div>
				</div>
				<div slot="footer">
					<button v-on:click="_toggleSummaryEditModal_()" class="btn-close">CANCEL</button>
					<button v-on:click="_removeSelectedEmployees_(global_selectedEmployee.temp_enrollment_id)" class="btn-delete">DELETE</button>
	  			<button class="btn-primary" v-on:click="_updateEmployeeDependents_( global_selectedEmployee )">Update</button>
				</div>
			</Modal>

		</div>
	</div>
</template>

<script>
	import enrollmentSummaryPreview from '@/components/corporates/enrollment/enrollmentSummaryPreview.vue'
	export default enrollmentSummaryPreview
</script>