<template>
  <div class="add-head-count-wrapper">
    <h1>Add Head Count and Plan</h1>
    <div class="add-head-count-box num-employees-wrapper">
      <div>
        <label>Number of Employees to add</label>
        <input type="number">
      </div>
      <div class="dp-flex emp-plan-start-container">
        <i class="fa fa-calendar-o" aria-hidden="true"></i>
        <div>
          <label>Employee Plan Start(You can update this later)</label>
          	<div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="global_empPlanStart"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                :formats='formats'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
        </div>
      </div>
    </div>
    <div>
      <h3>Account Type</h3>
      <div class="add-head-count-box account-type-wrapper">
        <div class="custom-checkbox-selector">
          <label class="selector-container">
            <span>Trial Plan</span>
            <input value="0" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div class="checkbox-child">
            <label class="selector-container">
              <span>Trial - Pro Plan</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <label class="selector-container">
              <span>Trial - Lite Plan</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </div>
          <label class="selector-container">
            <span>Insurance Bundle</span>
            <input value="1" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div class="checkbox-child">
            <label class="selector-container">
              <span>Pro Plan Bundle</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <label class="selector-container">
              <span>Insurance Bundle Lite</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </div>
          <label class="selector-container">
            <span>Pro Plan</span>
            <input value="2" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div class="checkbox-child">
            <label class="selector-container">
              <span>Default (SGD 99.00)</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <label class="selector-container">
              <span>Individual Price</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </div>
          <label class="selector-container">
            <span>Lite Plan</span>
            <input value="3" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <label class="selector-container">
            <span>Enterprise Plan</span>
            <input value="4" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div class="checkbox-child">
            <label class="selector-container">
              <span>Individual Price</span>
              <input value="0" type="radio" name="radio" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <div class="input-individual-price-container">
              <label>Input Individual Price*</label>
              <input type="number"> 
            </div>
          </div>
				</div>
      </div>
    </div>
    <div>
      <h3>Payment Status</h3>
      <div class="add-head-count-box payment-status-wrapper">
        <div class="custom-checkbox-selector">
          <label class="selector-container">
            <span>Pending</span>
            <input value="0" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <label class="selector-container">
            <span>Paid</span>
            <input value="1" type="radio" name="radio" />
            <span class="custom-checkbox-checkmark"></span>
          </label>
        </div>  
      </div>
    </div>
    <div>
      <h3>Company Credits</h3>
      <div class="add-head-count-box company-credits-wrapper">
        <div class="spending-account">
          <h4>Medical Spending Account</h4>
          <div class="dp-flex">
            <div>
              <label>Allocate Credits*</label>
              <input type="number">
            </div>
            <div class="deposit-slider">
              <label>Deposit : <span>{{ global_medicalSlider }} </span>% </label>
              <vue-slider v-model="global_medicalSlider" />
            </div>
          </div>
        </div>
        <div class="spending-account">
          <h4>Wellness Spending Acccount</h4>
          <div class="dp-flex">
            <div>
              <label>Allocate Credits*</label>
              <input type="number">
            </div>
            <div class="deposit-slider">
              <label>Deposit : <span>{{ global_wellnessSlider }} </span>% </label>
              <vue-slider v-model="global_wellnessSlider" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import addHeadCount from '@/components/corporates/addHeadCount'
	export default addHeadCount
</script>