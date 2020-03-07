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
            <div class="dependents" v-for="(list, index) in 0">
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
            <div class="dependents" v-for="(dep, dep_index) in 0">
              <td>{{index}}</td>
              <td>{{index}}</td>
              <td>{{index}}</td>
            </div>
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
        <button class="btn-gray-with-shadow" disabled="true">ENROLL</button>
      </div>
    </div>
    <div class="xs-footer-btns">
      <div class="flex-1">
        <button class="btn-gray-with-shadow" :disabled="global_selectedIds.length == 0" v-on:click="_removeSelectedEmployees_()">DELETE</button>
      </div>
      <div class="flex-1 txt-right">
        <button class="btn-gray-with-shadow" disabled="true">ENROLL</button>
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
            </div>
            <div class="form-box">
              <label>Work Email</label>
              <input type="text" v-model="global_selectedEmployee.email">
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
            </div>
            <div class="form-box">
              <label>Mobile</label>
              <input type="text" v-model="global_selectedEmployee.mobile">
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
            </div>
            <div class="form-box">
              <label>Medical Credits</label>
              <input type="text" v-model="global_selectedEmployee.medical_credits">
            </div>
            <div class="form-box">
              <label>Wellness Credits</label>
              <input type="text" v-model="global_selectedEmployee.wellness_credits">
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
            </div>

            <div v-for="(dep, dep_index) in global_selectedEmployee.dependents" class="dependent-form">
              <p>Dependent {{index+1}}</p>
              <div class="form-box">
                <label>Full Name*</label>
                <input type="text" v-model="dep.fullname">
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
              </div>
              <div class="form-box">
                <label>Start Date</label>
                <div class="date-container vDatepicker">
                  <v-date-picker 
                    popoverDirection="top" 
                    v-model="dep.start_date"
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus" 
                    :formats='formats'></v-date-picker>
                  <i class="fa fa-caret-down"></i>
                </div>
              </div>
            </div>
          </div>
				</div>
				<div slot="footer">
					<button v-on:click="_toggleSummaryEditModal_()" class="btn-close">CANCEL</button>
					<button v-on:click="_toggleSummaryEditModal_()" class="btn-delete">DELETE</button>
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