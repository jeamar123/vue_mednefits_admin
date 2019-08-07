<template>
	<div class="clinic-details-container">
		<div class="left-box-wrapper">
			<div class="clinic-details-box">
				<router-link tag="a" to="/dashboard/clinic" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
				<img :src="'../assets/img/home-bg.jpg'">
				<p class="clinic-name">
					Medicloud Clinic
				</p>
			</div>

			<div class="details-menu-wrapper">
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'ClinicDetails' }" v-on:click="selectClinicView( 'ClinicDetails' )">
					<label>Clinic Details</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'ClinicServices' }" v-on:click="selectClinicView( 'ClinicServices' )">
					<label>Services</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'ClinicDoctors' }" v-on:click="selectClinicView( 'ClinicDoctors' )">
					<label>Doctors</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'ClinicHours' }" v-on:click="selectClinicView( 'ClinicHours' )">
					<label>Peak Hours</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'ClinicPayment' }" v-on:click="selectClinicView( 'ClinicPayment' )">
					<label>Payment and Discount</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'ClinicSettings' }" v-on:click="selectClinicView( 'ClinicSettings' )">
					<label>Settings</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
			</div>
		</div>

		<div class="right-box-wrapper">
			<router-view name="child"></router-view>
		</div>
		
  </div>
</template>

<script>
	import clinicMenu from '@/components/clinic/clinicMenu'
	export default clinicMenu
</script>
