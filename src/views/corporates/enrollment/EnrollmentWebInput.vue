<template>
	<div class="enrollment-web-input-container">
    <div v-if="!global_isDependentInputShow">
      <h1 class="top-h1">Employee And Plan Details</h1>
      <div class="columns">
        <div class="column">
          <p class="label-title">Employee Details</p>

          <div class="form-box">
            <label>Full Name*</label>
            <input type="text" v-model="global_addEmployeeData.fullname">
          </div>
          <div class="form-box">
            <label>Date of Birth</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addEmployeeData.dob"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: false, }'
                popover-visibility="focus" 
                :formats='formats'></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
          <div class="form-box">
            <label>Email Address</label>
            <input type="text" v-model="global_addEmployeeData.email">
          </div>
          <div class="form-box ">
            <label>Phone Area Code</label>
            <select v-model="global_addEmployeeData.phone_code">
              <option value=""></option>
              <option value="65">(SG) +65</option>
              <option value="63">(PH) +63</option>
              <option value="60">(MY) +60</option>
            </select>
            <i class="fa fa-caret-down"></i>
          </div>
          <div class="form-box">
            <label>Phone Number</label>
            <input type="number" v-model="global_addEmployeeData.phone_no">
          </div>
          <div class="form-box">
            <label>Postal Code</label>
            <input type="text" v-model="global_addEmployeeData.postal_code">
          </div>
        </div>
        <div v-if="global_spendingStatus.medical_enable || global_spendingStatus.wellness_enable" class="column">
          <p class="label-title">&nbsp;</p>

          <div v-if="global_spendingStatus.medical_enable" class="form-box">
            <label>Medical Entitlement</label>
            <input type="number" v-model="global_addEmployeeData.medical_allocation">
          </div>
          <div v-if="global_spendingStatus.wellness_enable" class="form-box">
            <label>Wellness Entitlement</label>
            <input type="number" v-model="global_addEmployeeData.wellness_allocation">
          </div>
        </div>
        <div class="column is-5">
          <p class="label-title">Plan Details</p>

          <div class="form-box">
            <label>Plan Start Date</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addEmployeeData.plan_start"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: false, }'
                popover-visibility="focus" 
                :formats='formats'></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
          <div class="form-box plan-end-date">
            <label class="label-sub-title">Plan End Date:</label>
            <p>{{ _formatDate_(global_addEmployeeData.plan_end, null, 'DD MMMM, YYYY') }}</p>
          </div>
          <div class="form-box plan-term">
            <label>
              <input type="radio" v-model="global_addEmployeeData.fixed" name="end-date" value="1">
              Long Term
            </label>
            <label>
              <input type="radio" v-model="global_addEmployeeData.fixed" name="end-date" value="0">
              Short Term
            </label>
          </div>
          <div v-if="global_addEmployeeData.fixed == 0" class="form-box z-index-0">
            <label>Employee Plan Duration</label>
            <select global_addEmployeeData.duration>
              <option value=""></option>
              <option value="1 month"> 1 month </option>
              <option value="2 months"> 2 months </option>
              <option value="3 months"> 3 months </option>
              <option value="4 months"> 4 months </option>
              <option value="5 months"> 5 months </option>
              <option value="6 months"> 6 months </option>
              <option value="7 months"> 7 months </option>
              <option value="8 months"> 8 months </option>
              <option value="9 months"> 9 months </option>
              <option value="10 months"> 10 months </option>
              <option value="11 months"> 11 months </option>
              <option value="1 year"> 12 months </option>
            </select>
            <i class="fa fa-caret-down"></i>
          </div>
          <div class="form-box package-form-box">
            <label class="label-sub-title">Package Plan</label>
            <div class="package-box">
              <div class="package-name">{{ global_package.package.name }}</div>
              <div v-for="(list, index) in global_package.lists" class="package-services">
                <div class="service-list">
                  <label><i class="fa fa-bookmark"></i> {{list.package_name}}</label>
                  <p>{{list.package_description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="web-input-footer">
        <div class="columns">
          <div class="column">
            <label>Add a Dependent?</label>
            <button class="btn-add-dependent" v-on:click="_toggleAddDependentForm_()"><img :src="'../assets/img/icons/add-employee.svg'">Add</button>
          </div>
          <div class="column">
            <div class="btn-container">
              <button class="btn-cancel">Cancel</button>
              <button class="btn-primary" v-on:click="_enrollEmployee_()">Add Employee</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="global_isDependentInputShow" class="add-dependent-form">
      <p class="p-count">Dependent {{global_dependentCtr+1}} of {{corporateDetails_data.dependent.vacant_seats - global_addEmployeeData.dependents.length}}</p>
      <p class="title">Dependent details</p>

      <div v-if="global_dependentCtr > 0" class="side-arrows left">
        <i class="fa fa-angle-left" v-on:click="_nextPrevArrow_(false)"></i>
      </div>

      <div v-if="global_dependentArr.length > 0 && global_dependentCtr != global_dependentArr.length" class="side-arrows right">
        <i class="fa fa-angle-right" v-on:click="_nextPrevArrow_(true)"></i>
      </div>

      <div class="columns">
        <div class="column">
          <div class="form-box">
            <label>Full Name*</label>
            <input type="text" v-model="global_addDependentData.fullname">
          </div>
          <div class="form-box z-index-0">
            <label>Relationship</label>
            <select v-model="global_addDependentData.relationship">
              <option value=""></option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
              <option value="family">Family</option>
            </select>
            <i class="fa fa-caret-down"></i>
          </div>
        </div>
        <div class="column">
          <div class="form-box ">
            <label>Date of Birth</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addDependentData.dob"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus" 
                :formats='formats'></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
          <div class="form-box">
            <label>Start Date</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addDependentData.plan_start"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus" 
                :formats='formats'></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-buttons">
        <div class="left">
          <button class="btn-cancel" v-on:click="_toggleAddDependentForm_()">Cancel</button>
        </div>
        <div class="right">
          <button class="btn-save" v-on:click="_saveDependentData_()">Save <span class="xs-btn-hide">& Continue</span></button>
          <button class="btn-add" v-on:click="_addDependentData_(global_addDependentData)">Add</button>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import enrollmentWebInput from '@/components/corporates/enrollment/enrollmentWebInput.vue'
	export default enrollmentWebInput
</script>