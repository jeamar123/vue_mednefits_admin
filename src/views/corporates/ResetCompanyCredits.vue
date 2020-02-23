<template>
	<div class="reset-company-credits-wrapper">
    <div class="dp-flex-ai">
		  <h2>Reset Company Credits</h2>
      <div class="flex-1">
        <button class="btn-gray-with-shadow download-emp-list-btn"><img :src="'../assets/img/download_emp.png'">DOWNLOAD EMPLOYEE LIST</button>
      </div>
    </div>
    <div class="reset-company-body">
      <div v-if="true" class="reset-first-step">
        <div class="effective-date-container dp-flex">
          <i class="fa fa-calendar-o"></i>
          <div class="reset-effective-date-input-wrapper">
            <label class="reset-label-text">Effective Date*</label>
            <div>
                <div class="reset-date-picker">
                  <v-date-picker
                    popoverDirection="bottom"
                    v-model="global_resetEffectiveDate"
                    :formats='formats'
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus"
                  ></v-date-picker>
                  <i class="fa fa-caret-down"></i>
                </div>
              </div>
          </div>
        </div>
        <div class="new-company-credits-container">
          <h4>New Company Credits Allocation:</h4>
          <div class="new-company-input-container dp-flex">
            <span class="currency-type">SGD</span> 
            <div>
              <label class="reset-label-text">Medical Spending Account</label>
              <div>
                <input type="number" placeholder="0"> 
              </div>
            </div>
          </div>
          <div class="new-company-input-container dp-flex">
            <span class="currency-type">SGD</span> 
            <div>
              <label class="reset-label-text">Wellness Spending Account</label>
              <div>
                <input type="number" placeholder="0"> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="false" class="reset-second-step">
        <div class="drop-box">
          <img :src="'../assets/img/Upload-Receipt.png'">
          <div class="selected-file"></div>
          <div>Drop .xlxs file here or click to upload</div>
        </div>
      </div>
    </div>
    <div class="reset-company-footer dp-flex">
      <div class="flex-1">
        <button class="btn-gray-with-shadow">BACK</button>
      </div>
      <div v-if="false">
        <button class="btn-gray-with-shadow">NEXT</button>
      </div>
      <div v-if="true">
        <button class="btn-gray-with-shadow">UPLOAD</button>
      </div>
    </div>
	</div>
</template>

<script>
	import resetCompanyCredits from '@/components/corporates/resetCompanyCredits'
	export default resetCompanyCredits
</script>