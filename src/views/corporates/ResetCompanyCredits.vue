<template>
	<div class="reset-company-credits-wrapper">
    <div v-if="false" class="dp-flex-ai">
		  <h2>Reset Company Credits</h2>
      <div class="flex-1">
        <button class="btn-gray-with-shadow download-emp-list-btn"><img :src="'../assets/img/download_emp.png'">DOWNLOAD EMPLOYEE LIST</button>
      </div>
    </div>
    <div>
      <h2>Review</h2>
    </div>
    <div class="reset-company-body">
      <div v-if="false" class="reset-first-step">
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
      <div v-if="true" class="reset-second-step">
        <div class="drop-box">
          <input type="file">
          <img :src="'../assets/img/Upload-Receipt.png'">
          <div class="selected-file"></div>
          <div>Drop .xlxs file here or click to upload</div>
        </div>
      </div>
      <div v-if="true" class="reset-third-step">
        <div>
          <h4>Please check if the details below are correct <br> before we update them.</h4>
        </div>
        <table class="review-excel-tbl">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>New Medical Credits</th>
              <th>New Wellness Credits</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="fa fa-trash"></i></td>
              <td>
                <img @click="___editEmpDetails()" :src="'../assets/img/pencil.png'">
                <!-- <span class="oi pencil" data-glyph="pencil" title="pencil" aria-hidden="true"></span> -->
              </td>
              <td><span>Noelou Jan</span></td>
              <td><span>Nagac</span></td>
              <td><span>0.00</span></td>
              <td><span>0.00</span></td>
              <td><span>24/02/2020</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="reset-company-footer dp-flex">
      <div class="flex-1">
        <button v-if="false" class="btn-gray-with-shadow">BACK</button>
      </div>
      <div v-if="false">
        <button class="btn-gray-with-shadow">NEXT</button>
      </div>
      <div v-if="false">
        <button class="btn-gray-with-shadow">UPLOAD</button>
      </div>
      <div v-if="true">
        <button class="btn-gray-with-shadow">SUBMIT</button>
      </div>
    </div>

    <Modal v-if="global_showEditEmp" class="edit-emp-details employee-details-options">
      <div slot="header">
        <h1>Edit Employee Details</h1>
      </div>
      <div slot="body">
        <div>
          <label>Full Name</label>
          <input type="text">
        </div>
        <div>
          <label>Medical Credits *</label>
          <input type="text">
        </div>
        <div>
          <label>Wellness Credits *</label>
          <input type="text">
        </div>
        <div>
          <img :src="'../assets/img/calendar.png'">
          <div>
            <label>Start Date</label>
            <input type="text">
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="___editEmpDetails()" class="btn-close">CANCEL</button>
        <button class="btn-primary">UPDATE</button>
      </div>
    </Modal>
	</div>
</template>

<script>
	import resetCompanyCredits from '@/components/corporates/resetCompanyCredits'
	export default resetCompanyCredits
</script>