<template>
	<div class="services-details-wrapper">
		<span v-if="!isAddServicesShow">
			<div class="header-title">
				<p class="box-title">List of Services</p>
				<div class="add-service-btn">
					<button class="btn btn-primary" v-on:click="editServices('add')">Add</button>
				</div>
			</div>
			<div class="tbl-wrapper">
				<table class="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Time</th>
							<th>Cost</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div class="icon">
									<img :src="'../assets/img/ico_Profile.svg'">
								</div>
								<div class="service-details">
									<label>By Appointment Only</label>
									<p>Usual rates: $<span>100.00</span></p>
								</div>		
							</td>
							<td>
								<p>0</p>
								<p>mins</p>
							</td>
							<td>
								$S<span>198.00</span>	
							</td>
							<td>
								<p>Scan & Pay Page</p>
								<div class="toggle-wrapper">
									<div class="toggle hide active">Hide</div>
									<div class="toggle show">Show</div>
								</div>
							</td>
							<td>
								<button class="btn btn-primary" v-on:click="editServices('edit')">Edit</button>
								<button class="btn btn-primary">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</span>
		<span v-if="isAddServicesShow">
			<div class="header-title">
				<p><span v-if="!isEditService">Add</span><span v-if="isEditService">Edit</span> Service</p>
			</div>

			<form>
				<div class="form-row">
					<div class="form-col">
						<div class="form-div">
							<label>Name</label>
							<input type="text" >
						</div>
						<div class="form-div">
							<label>Cost</label>
							<input type="number" min="0">
						</div>
						<div class="form-div">
							<label>Time (mins)</label>
							<input type="number" min="0">
						</div>
						<div class="form-div">
							<label>Description</label>
							<input type="text" >
						</div>
					</div>
					<div class="form-col">
						<p>Who can provide the service?</p>
						<div class="white-space-20"></div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Select all</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Lorem Ipsum</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Lorem Ipsum</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>
				</div>
				<div class="btn-container">
					<button v-if="!isEditService" class="btn btn-primary" v-on:click="editServices()">Submit</button>
					<button v-if="isEditService" class="btn btn-primary" v-on:click="editServices()">Update</button>
				</div>
			</form>
		</span>
	</div>
</template>

<script>
	import clinicServices from '@/components/clinic/clinicServices';
	export default clinicServices;
</script>