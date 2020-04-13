<template>
	<div id="main-content" >
		<!-- <div class="navbar-line"></div> -->
	  <div class="navbar">
	  	<div class="nav-logo">
	  		<img :src="'../assets/img/latest logo/Mednefits Logo V2.svg'">
	  	</div>
	  	<div class="nav-items">
	  		<ul class="nav-ul">
	  			<li><router-link tag="a" :to="{ name : 'Clinic' }">Clinic</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Doctor' }">Doctor</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Accounts' }">Accounts</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Public' }">Public</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Individual' }">Individual</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Corporates' }">Corporate</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Booking' }">Booking</router-link></li>
	  			<li>
		  			<a @click="_showAdminDropdown_('transaction')">
		  				Transaction
		  			</a>
						<div v-click-outside="_hideAllDrop_" v-if="global_isTransactionDropdownShow" class="drop-wrapper transaction-drop">
							<ul class="nav-ul">
								<router-link tag="a" :to="{ name : 'TransactionHistory' }">Transaction History</router-link>
								<router-link tag="a" :to="{ name : 'InvoicePayments' }">Invoice Payments</router-link>
							</ul>
						</div>
		  		</li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Analytics</router-link></li>
	  			<li>
	  				<a @click="_showAdminDropdown_('settings')">Settings</span></a>

	  				<div v-click-outside="_hideAllDrop_" v-if="global_isSettingsDropdownShow" class="drop-wrapper settings-drop">
	  					<ul class="nav-ul">
	  						<router-link tag="li" :to="{ name : 'MednefitsAgents' }"><a href="#">Mednefits Agents</a></router-link>
	  						<router-link tag="li" :to="{ name : 'ClinicTypes' }"><a href="#">Download E-Claim List</a></router-link>
	  						<router-link tag="li" :to="{ name : 'ClinicTypes' }"><a href="#">Clinic Types</a></router-link>
	  						<router-link tag="li" :to="{ name : 'ClinicQrCode' }"><a href="#">Clinic QR Code</a></router-link>
	  						<router-link tag="li" :to="{ name : 'SettingSms' }"><a href="#">SMS</a></router-link>
	  						<router-link tag="li" :to="{ name : 'CarePlanList' }"><a href="#">Care Plan List</a></router-link>
	  						<router-link tag="li" :to="{ name : 'CarePlanPackage' }"><a href="#">Care Plan Type Packages</a></router-link>
	  						<router-link tag="li" :to="{ name : 'ClaimTypeService' }"><a href="#">Claim Types Service</a></router-link>
	  						<router-link tag="li" :to="{ name : 'SearchUsers' }"><a href="#">Search Users</a></router-link>
	  						<router-link tag="li" :to="{ name : 'LocalNetworkClinic' }"><a href="#">Local Network Clinic</a></router-link>
	  						<router-link tag="li" :to="{ name : 'CurrencyInformation' }"><a href="#">Currency Information</a></router-link>
	  						<li><a href="#">Logout</a></li>
	  					</ul>
	  				</div>
	  			</li>
	  			<li>
	  				<a @click="_showAdminDropdown_('admin')">
		  				Admin
		  			</a>
		  			<div v-click-outside="_hideAllDrop_" v-if="global_isAdminDropdownShow" class="drop-wrapper transaction-drop">
							<ul class="nav-ul">
								<router-link tag="a" :to="{ name : 'AdminLogs' }">Logs</router-link>
								<router-link tag="a" :to="{ name : 'AdminAccounts' }">Accounts</router-link>
							</ul>
						</div>
	  			</li>
	  		</ul>
	  	</div>
			<div class="xs-nav-btn" v-on:click="toggleMenu()">
				<span class="oi" data-glyph="menu" aria-hidden="true"></span>
			</div>
	  </div>

		<div v-show="isMenuShow" v-click-outside="_hideAllDrop_" class="xs-menu-container">
			<ul class="nav-ul">
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Clinic' }">Clinic</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Doctor' }">Doctor</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Accounts' }">Accounts</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Public' }">Public</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Individual' }">Individual</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Corporates' }">Corporate</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Booking' }">Booking</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'TransactionHistory' }">Transaction History</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'InvoicePayments' }">Invoice Payments</router-link></li>
				<!-- <li><router-link tag="a" to="/dashboard/clinic">Download E-Claim List</router-link></li> -->
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'Analytics' }">Analytics</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'MednefitsAgents' }">Mednefits Agents</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'ClinicTypes' }">Download E-Claim List</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'ClinicTypes' }">Clinic Types</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'ClinicQrCode' }">Clinic QR Code</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'SettingSms' }">SMS</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'CarePlanList' }">Care Plan List</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'CarePlanPackage' }">Care Plan Type Packages</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'SearchUsers' }">Search Users</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'LocalNetworkClinic' }">Local Network Clinic</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'CurrencyInformation' }">Currency Information</router-link></li>
				<li @click="_hideSelector_()"><a href="#">Logout</a></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'AdminLogs' }">Logs</router-link></li>
				<li @click="_hideSelector_()"><router-link tag="a" :to="{ name : 'AdminAccounts' }">Admin Accounts</router-link></li>
			</ul>
		</div>

	  <div class="child-content">
	  	<router-view></router-view>
	  </div>

	  <transition name="fade">		
		  <div v-if="showLoader" class="main-loader">
				<div class="circle-loader">
					<div class="preloader-container">
						<div class="preloader-wrapper big active">
					    <div class="spinner-layer spinner-blue-only">
					      <div class="circle-clipper left">
					        <div class="circle"></div>
					      </div><div class="gap-patch">
					        <div class="circle"></div>
					      </div><div class="circle-clipper right">
					        <div class="circle"></div>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
			</div>
		</transition>
  </div>
  
</template>

<script>
	import dashboard from '@/components/dashboard'
	export default dashboard
</script>
