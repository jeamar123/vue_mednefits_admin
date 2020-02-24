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
          <tr>
            <td>
              <input type="checkbox">
            </td>
            <td>A</td>
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
	</div>
</template>

<script>
	import enrollmentSummaryPreview from '@/components/corporates/enrollment/enrollmentSummaryPreview.vue'
	export default enrollmentSummaryPreview
</script>