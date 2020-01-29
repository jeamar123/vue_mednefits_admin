<template>
	<div>
		<div class="entitlement-option-wrapper">
			<p class="header-title">Let us know more about the enrollment.</p>

			<div class="item-select">
				<label>Is there any <span>Medical Entitlement Balance?</span> <img v-on:click="showDrop(1, true)" class="medical-info-click" :src="'../assets/img/info-icon.png'">

					<div v-if="medicalInfoDrop" class="medical-info-box">
						<div class="custom-box"></div>
						<div class="main-info-box">
							<p class="header-p">Medical Entitlement Balance</p>
							<div class="custom-line"></div>
							<p>Medical Entitlement Balance is the (Medical) amount that an employee is entitled from the date they joined Mednefits until the end of the current term.</p>

							<p class="header-p example-p"><span>Example:</span></p>
							<p>Employee A has an entitlement period from 01/01/2019 to 31/12/2019.  On 01/06/2019, she started using Mednefits and has been entitled S$300 for Medical untill 31/12/2019. Therefore, her Medical Entitlement Balance is S$300.</p>

							<div class="btn-container">
								<div class="btn-got-it medical-info-close" v-on:click="showDrop(1, false)">Got it</div>
							</div>
						</div>
					</div>
				</label>
				<div class="select-div" v-click-outside="medicalSelectToggle">
					<div class="select-value" v-on:click="medicalSelectToggle( true )">
						<span>Yes</span>
					</div>
					<div v-if="medicalSelectDrop" class="select-drop-box" >
						<div class="select-option" >Yes</div>
						<div class="select-option" >No</div>
					</div>
					<i class="fa fa-angle-down"></i>
				</div>
			</div>
			<div class="item-select">
				<label>Is there any <span>Wellness Entitlement Balance?</span> <img v-on:click="showDrop(2, true)" class="wellness-info-click" :src="'../assets/img/info-icon.png'">

					<div v-if="wellnessInfoDrop" class="wellness-info-box">
						<div class="custom-box"></div>
						<div class="main-info-box">
							<p style="font-family: 'Helvetica Medium'">Medical Entitlement Balance</p>
							<div class="custom-line"></div>
							<p>Wellness Entitlement Balance is the (Wellness) amount that an employee is entitled from the date they joined Mednefits until the end of the current term.</p>

							<p style="margin: 15px 0 0 0;font-family: 'Helvetica Medium'"><span style="text-decoration: underline;">Example:</span></p>
							<p>Employee A has an entitlement period from 01/01/2019 to 31/12/2019.  On 01/06/2019, she started using Mednefits and has been entitled S$100 for Wellness untill 31/12/2019. Therefore, her Wellness Entitlement Balance is S$300.</p>

							<div class="btn-container">
								<div class="btn-got-it wellness-info-close" v-on:click="showDrop(2, false)">Got it</div>
							</div>
						</div>
					</div>
				</label>
				<div class="select-div">
					<div class="select-value">
						<span>Yes</span>
					</div>
					<div class="select-drop-box">
						<div class="select-option" >Yes</div>
						<div class="select-option" >No</div>
					</div>
					<i class="fa fa-angle-down"></i>
				</div>
			</div>
		</div>
		<div class="enrollment-btn-container">
			<button class="enrollment-next-btn" disabled>NEXT</button>
		</div>
	</div>
</template>

<script>
	import addEmployeeEntitlementOption from '@/components/corporates/enrollment/addEmployeeEntitlementOption.vue'
	export default addEmployeeEntitlementOption
</script>