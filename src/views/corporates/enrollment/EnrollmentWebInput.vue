<template>
	<div class="enrollment-web-input-container">
    <div v-if="!global_isDependentInputShow">
      <h1>Employee And Plan Details</h1>
      <div class="columns">
        <div class="column">
          <p class="label-title">Employee Details</p>

          <div class="form-box">
            <label>Full Name*</label>
            <input type="text">
          </div>
          <div class="form-box">
            <label>Date of Birth</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addEmployeeData.dob"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus" 
                :formats='formats'></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
          <div class="form-box">
            <label>Email Address</label>
            <input type="text">
          </div>
          <div class="form-box">
            <label>Phone Area Code</label>
            <select>
              <option value=""></option>
              <option value="+65">(SG) +65</option>
              <option value="+63">(PH) +63</option>
              <option value="+60">(MY) +60</option>
            </select>
            <i class="fa fa-caret-down"></i>
          </div>
          <div class="form-box">
            <label>Phone Number</label>
            <input type="number">
          </div>
          <div class="form-box">
            <label>Postal Code</label>
            <input type="text">
          </div>
        </div>
        <div class="column">
          <p class="label-title">&nbsp;</p>

          <div class="form-box">
            <label>Medical Entitlement</label>
            <input type="number">
          </div>
          <div class="form-box">
            <label>Medical Entitlement Balance</label>
            <input type="number">
          </div>
          <div class="form-box">
            <label>Wellness Entitlement</label>
            <input type="number">
          </div>
          <div class="form-box">
            <label>Wellness Entitlement Balance</label>
            <input type="number">
          </div>
        </div>
        <div class="column is-5">
          <p class="label-title">Plan Details</p>

          <div class="form-box">
            <label>Plan Start Date</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addEmployeeData.dob"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus" 
                :formats='formats'></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
          <div class="form-box plan-end-date">
            <label class="label-sub-title">Plan End Date:</label>
            <p>07 April, 2020</p>
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
          <div v-if="global_addEmployeeData.fixed == 0" class="form-box">
            <label>Employee Plan Duration</label>
            <select>
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
          </div>
          <div class="form-box package-form-box">
            <label class="label-sub-title">Package Plan</label>
            <div class="package-box">
              <div class="package-name">Standalone Mednefits care (health wallet)</div>
              <div v-for="list in [1,2,3]" class="package-services">
                <div class="service-list">
                  <label><i class="fa fa-bookmark"></i> Outpatient GP</label>
                  <p>Consultation: S$0, covered by us. Medicine & Treatment: Pay using Medical Credits.</p>
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
            <button class="btn-add-dependent"><img :src="'../assets/img/icons/add-employee.svg'">Add</button>
          </div>
          <div class="column">
            <div class="btn-container">
              <button class="btn-cancel">Cancel</button>
              <button class="btn-primary">Add Employee</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="global_isDependentInputShow" class="add-dependent-form">
      <p class="p-count">Dependent 1 of 24</p>
      <p class="title">Dependent details</p>

      <div class="columns">
        <div class="column">
          <div class="form-box">
            <div class="form-box">
              <label>Full Name*</label>
              <input type="text">
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
          </div>
        </div>
        <div class="column">
          <div class="form-box">
            <label>Date of Birth</label>
            <div class="date-container vDatepicker">
              <v-date-picker 
                popoverDirection="bottom" 
                v-model="global_addEmployeeData.dob"
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
                v-model="global_addEmployeeData.dob"
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
          <button class="btn-cancel">Cancel</button>
        </div>
        <div class="right">
          <button class="btn-save">Save & Continue</button>
          <button class="btn-add">Add</button>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import enrollmentWebInput from '@/components/corporates/enrollment/enrollmentWebInput.vue'
	export default enrollmentWebInput
</script>