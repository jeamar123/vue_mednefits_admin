<template>
	<div class="enrollment-summary-container">
		<h1>Please check if all employee details are correct before we enroll them</h1>

    <div class="tbl-scroll-wrapper">
      <table class="tbl-enrollment-summary">
        <thead>
          <tr>
            <th>
              <input type="checkbox">
            </th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Work Email</th>
            <th>Country Code</th>
            <th>Mobile</th>
            <th>Medical Entitlement</th>
            <th>Medical Entitlement Balance</th>
            <th>Wellness Entitlement</th>
            <th>Wellness Entitlement Balance</th>
            <div class="dependents" v-for="(list, index) in [1,2,3]">
              <th>Dependent {{index+1}}<br>Fullname</th>
              <th>Dependent {{index+1}}<br>Date of Birth</th>
              <th>Dependent {{index+1}}<br>Relationship</th>
            </div>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr class="has-error">
            <td>
              <input type="checkbox">
            </td>
            <td>
              <div class="fullname-box">
                <div class="fullname-text">Wei Xian Jun Xi Kuan Yen Li</div>
                <div class="edit-icon" v-on:click="_toggleSummaryEditModal_()"><i class="fa fa-pencil"></i></div>
              </div>
            </td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <div class="dependents" v-for="(list, index) in [1,2,3]">
              <td>{{index}}</td>
              <td>{{index}}</td>
              <td>{{index}}</td>
            </div>
            <td>A</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dp-flex align-items-center footer-options">
      <div class="flex-1 xs-hide">
        <button class="btn-gray-with-shadow">DELETE</button>
      </div>
      <div class="flex-4 dp-flex align-items-center checkbox-container">
        <div class="label-checkbox">
          <label>
            <input type="checkbox">
            Send User Welcome Email/SMS
          </label>
        </div>
        <div class="label-checkbox dp-flex align-items-center password-check-input">
          <label>
            <input type="checkbox">
            Provide Default Password
          </label>
          <div class="password-input">
            <label>Password</label>
            <input type="text">
          </div>
        </div>
        
      </div>
      <div class="flex-1 txt-right xs-hide">
        <button class="btn-gray-with-shadow" disabled="true">ENROLL</button>
      </div>
    </div>
    <div class="xs-footer-btns">
      <div class="flex-1">
        <button class="btn-gray-with-shadow">DELETE</button>
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
              <input type="text">
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
              <input type="text">
            </div>
            <div class="form-box">
              <label>Mobile Area Code</label>
              <select>
                <option value=""></option>
                <option value="+65">(SG) +65</option>
                <option value="+63">(PH) +63</option>
                <option value="+60">(MY) +60</option>
              </select>
              <i class="fa fa-caret-down"></i>
            </div>
            <div class="form-box">
              <label>Mobile</label>
              <input type="text">
            </div>
            <div class="form-box">
              <label>Job Title</label>
              <select>
                <option value=""></option>
                <option :value="jobs.job_title" v-for="jobs in jobList" :key="jobs.index">
                  {{jobs.job_title}}
                </option>
              </select>
              <i class="fa fa-caret-down"></i>
            </div>
            <div class="form-box">
              <label>Medical Credits</label>
              <input type="text">
            </div>
            <div class="form-box">
              <label>Wellness Credits</label>
              <input type="text">
            </div>
            <div class="form-box">
              <label>Start Date</label>
              <div class="date-container vDatepicker">
                <v-date-picker 
                  popoverDirection="bottom" 
                  v-model="global_selectedEmployee.start_date"
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus" 
                  :formats='formats'></v-date-picker>
                <i class="fa fa-caret-down"></i>
              </div>
            </div>

            <div v-for="(list,index) in global_selectedEmployee.dependents" class="dependent-form">
              <p>Dependent {{index+1}}</p>
              <div class="form-box">
                <label>Full Name*</label>
                <input type="text">
              </div>
              <div class="form-box">
                <label>Date of Birth</label>
                <div class="date-container vDatepicker">
                  <v-date-picker 
                    popoverDirection="bottom" 
                    v-model="global_selectedEmployee.dependents[index].dob"
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus" 
                    :formats='formats'></v-date-picker>
                  <i class="fa fa-caret-down"></i>
                </div>
              </div>
              <div class="form-box">
                <label>Relationship</label>
                <select>
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
                    v-model="global_selectedEmployee.start_date"
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
	  			<button class="btn-primary" v-on:click="submitInNetwork( inNetwork_data )">Update</button>
				</div>
			</Modal>

		</div>
	</div>
</template>

<script>
	import enrollmentSummaryPreview from '@/components/corporates/enrollment/enrollmentSummaryPreview.vue'
	export default enrollmentSummaryPreview
</script>