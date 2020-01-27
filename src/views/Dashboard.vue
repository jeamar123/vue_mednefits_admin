<template>
	<div id="main-content" >
		<!-- <div class="navbar-line"></div> -->
	  <div class="navbar">
	  	<div class="nav-logo">
	  		<img :src="'../assets/img/logo_white.png'">
	  	</div>
	  	<div class="nav-items">
	  		<ul class="nav-ul">

	  			<li><router-link tag="a" :to="{ name : 'Clinic' }">Clinic</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Doctor</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Accounts</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Public</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Individual</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Corporates' }">Corporate</router-link></li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Booking</router-link></li>
	  			<li>
		  			<router-link tag="a" :to="{ name : 'Analytics' }">
		  				Transaction
		  				<div class="drop-wrapper transaction-drop">
		  					<ul class="nav-ul">
		  						<router-link tag="a" to="/dashboard/clinic">Transaction History</router-link>
		  						<router-link tag="a" to="/dashboard/clinic">Download E-Claim List</router-link>
		  					</ul>
		  				</div>
		  			</router-link>
		  		</li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Analytics</router-link></li>
	  			<li>
	  				<a href="#">Settings</span></a>

	  				<div class="drop-wrapper settings-drop">
	  					<ul class="nav-ul">
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Mednefits Agents</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Download E-Claim List</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Clinic Types</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Clinic QR Code</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">SMS</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Care Plan List</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Care Plan Type Packages</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Search Users</a></router-link>
	  						<router-link tag="li" to="/dashboard/clinic"><a href="#">Local Network Clinic</a></router-link>
	  						<li><a href="#">Logout</a></li>
	  					</ul>
	  				</div>
	  			</li>
	  			<li><router-link tag="a" :to="{ name : 'Analytics' }">Admin</router-link></li>
	  		</ul>
	  	</div>
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
