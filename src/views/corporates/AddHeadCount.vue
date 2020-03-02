<template>
  <div class="add-head-count-wrapper">
    <h1>Add Head Count and Plan</h1>
    <div class="add-head-count-box num-employees-wrapper">
      <div>
        <label>Number of Employees to add</label>
        <input type="number" min="0" v-model="global_addHeadCountData.employees">
      </div>
      <div class="dp-flex emp-plan-start-container">
        <i class="fa fa-calendar-o" aria-hidden="true"></i>
        <div>
          <label>Employee Plan Start(You can update this later)</label>
          	<div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="global_addHeadCountData.plan_start"
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
            <input value="trial_plan" type="radio" v-model="global_addHeadCountData.account_type" v-on:change="_setAccountType_(global_addHeadCountData.account_type)"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div v-show="global_addHeadCountData.account_type == 'trial_plan'" class="checkbox-child">
            <label class="selector-container">
              <span>Trial - Pro Plan</span>
              <input value="pro_trial_plan_bundle" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <label class="selector-container">
              <span>Trial - Lite Plan</span>
              <input value="trial_plan_lite" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </div>
          <label class="selector-container">
            <span>Insurance Bundle</span>
            <input value="insurance_bundle" type="radio" v-model="global_addHeadCountData.account_type" v-on:change="_setAccountType_(global_addHeadCountData.account_type)"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div v-show="global_addHeadCountData.account_type == 'insurance_bundle'" class="checkbox-child">
            <label class="selector-container">
              <span>Pro Plan Bundle</span>
              <input value="pro_plan_bundle" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <label class="selector-container">
              <span>Insurance Bundle Lite</span>
              <input value="insurance_bundle_lite" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </div>
          <label class="selector-container">
            <span>Pro Plan</span>
            <input value="stand_alone_plan" type="radio" v-model="global_addHeadCountData.account_type" v-on:change="_setAccountType_(global_addHeadCountData.account_type)"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div v-show="global_addHeadCountData.account_type == 'stand_alone_plan'" class="checkbox-child">
            <label class="selector-container">
              <span>Default (SGD 99.00)</span>
              <input value="default_price" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <label class="selector-container">
              <span>Individual Price</span>
              <input value="fixed_price" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <div v-show="global_addHeadCountData.secondary_account_type == 'fixed_price'" class="input-individual-price-container">
              <label>Input Individual Price*</label>
              <input type="number" v-model="global_addHeadCountData.price_per_employee"> 
            </div>
          </div>
          <label class="selector-container">
            <span>Lite Plan</span>
            <input value="lite_plan" type="radio" v-model="global_addHeadCountData.account_type" v-on:change="_setAccountType_(global_addHeadCountData.account_type)"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div v-show="global_addHeadCountData.account_type == 'lite_plan'" class="checkbox-child">
            <label class="selector-container">
              <span>Individual Price</span>
              <input value="fixed_price" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <div class="input-individual-price-container">
              <label>Input Individual Price*</label>
              <input type="number" v-model="global_addHeadCountData.price_per_employee"> 
            </div>
          </div>
          <label class="selector-container">
            <span>Enterprise Plan</span>
            <input value="enterprise_plan" type="radio" v-model="global_addHeadCountData.account_type" v-on:change="_setAccountType_(global_addHeadCountData.account_type)"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <div v-show="global_addHeadCountData.account_type == 'enterprise_plan'" class="checkbox-child">
            <label class="selector-container">
              <span>Individual Price</span>
              <input value="fixed_price" type="radio" v-model="global_addHeadCountData.secondary_account_type" v-on:change="_setSecondaryAccountType_(global_addHeadCountData.secondary_account_type)"/>
              <span class="custom-checkbox-checkmark"></span>
            </label>
            <div class="input-individual-price-container">
              <label>Input Individual Price*</label>
              <input type="number" v-model="global_addHeadCountData.price_per_employee"> 
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
            <input value="false" type="radio" name="payment-status" v-model="global_addHeadCountData.payment_status"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
          <label class="selector-container">
            <span>Paid</span>
            <input value="true" type="radio" name="payment-status" v-model="global_addHeadCountData.payment_status"/>
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
              <input type="number" min="0" v-model="global_addHeadCountData.medical_credits">
            </div>
            <div class="deposit-slider">
              <label>Deposit : <span>{{ global_addHeadCountData.deposit_medical }} </span>% </label>
              <vue-slider v-model="global_addHeadCountData.deposit_medical" :min="0" :max="10" :interval=".5" />
            </div>
          </div>
        </div>
        <div class="spending-account">
          <h4>Wellness Spending Acccount</h4>
          <div class="dp-flex">
            <div>
              <label>Allocate Credits*</label>
              <input type="number" min="0" v-model="global_addHeadCountData.wellness_credits">
            </div>
            <div class="deposit-slider">
              <label>Deposit : <span>{{ global_addHeadCountData.deposit_wellness }} </span>% </label>
              <vue-slider v-model="global_addHeadCountData.deposit_wellness" :min="0" :max="10" :interval=".5"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <button class="btn-cancel">Cancel</button>
      <button class="btn-primary" v-on:click="_createAddHeadCount_(global_addHeadCountData)">Create Employee Head Count</button>
    </div>
  </div>
</template>

<script>
	import addHeadCount from '@/components/corporates/addHeadCount'
	export default addHeadCount
</script>