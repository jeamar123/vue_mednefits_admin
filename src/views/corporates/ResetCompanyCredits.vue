<template>
	<div class="reset-company-credits-wrapper">
    <div class="dp=flex">
		  <h1>Reset Company Credits</h1>
      <div class="flex-1">
        <img :src="'../assets/img/download_emp.png'">
        <button>DOWNLOAD EMPLOYEE LIST</button>
      </div>
    </div>
    <div class="reset-company-body">
      <div>
        <div>
          <label>Effective Date*</label>
           <div class="entitlement-input-label">
              <div class="entitlement-date-picker">
                <v-date-picker
                  popoverDirection="bottom"
                  v-model="global_resetEffectiveDate"
                  :formats='formats'
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus"
                ></v-date-picker>
                <i class="fa fa-calendar-o"></i>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="reset-company-footer">

    </div>
	</div>
</template>

<script>
	import resetCompanyCredits from '@/components/corporates/resetCompanyCredits'
	export default resetCompanyCredits
</script>