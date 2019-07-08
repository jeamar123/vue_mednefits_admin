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
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'clinic_details' }" v-on:click="selectClinicView( 'clinic_details' )">
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					Clinic Details
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'services' }" v-on:click="selectClinicView( 'services' )">
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					Services
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'doctors' }" v-on:click="selectClinicView( 'doctors' )">
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					Doctors
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'peak_hours' }" v-on:click="selectClinicView( 'peak_hours' )">
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					Peak Hours
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'discount' }" v-on:click="selectClinicView( 'discount' )">
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					Payment and Discount
				</div>
				<div class="menu-item" v-bind:class="{ 'active' : clinicViewStatus == 'clinic_settings' }" v-on:click="selectClinicView( 'clinic_settings' )">
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					Settings
				</div>
			</div>
		</div>

		<div class="right-box-wrapper">
			<div v-if="clinicViewStatus == 'clinic_details'" class="clinic-details-wrapper">
				<form >
					<div class="form-row">
						<div class="form-col">
							<div class="form-div">
								<label>Clinic Name</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Login Email</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div com-email-form">
								<label class="input-checkbox">
								  <input type="checkbox">
								  <span class="input-text">Communication Email same as Login Email</span>
								  <span class="input-checkmark"></span>
								</label>
							</div>
							<div class="form-div">
								<label>Communication Email</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Clinic Type</label>
								<select>
									<option></option>
									<option>A</option>
									<option>A</option>
									<option>A</option>
									<option>A</option>
								</select>
							</div>
							<div class="form-div">
								<label>MRT</label>
								<select>
									<option></option>
									<option>A</option>
									<option>A</option>
									<option>A</option>
									<option>A</option>
								</select>
							</div>
							<div class="form-div">
								<label>Phone</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Opening</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Currency Type</label>
								<select>
									<option></option>
									<option>A</option>
									<option>A</option>
									<option>A</option>
									<option>A</option>
								</select>
							</div>
							<div class="form-div">
								<label>Description</label>
								<input type="text" class="form-input">
							</div>
						</div>

						<div class="form-col">
							<div class="form-div">
								<label>Address</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>State</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>City</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>District</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Postal Code</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Country</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div bill-info-form">
								<p>Billing Information</p>
								<div class="white-space-10"></div>
								<label class="input-checkbox">
								  <input type="checkbox">
								  <span class="input-text">Same as Health Provider Details</span>
								  <span class="input-checkmark"></span>
								</label>
							</div>
							<div class="form-div">
								<label>Billing Name</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Billing Address</label>
								<input type="text" class="form-input">
							</div>
						</div>

						<div class="form-col">
							<div class="form-div">
								<label>Latitude</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Longitude</label>
								<input type="text" class="form-input">
							</div>
							<div class="form-div">
								<label>Select address from google map (optional)</label>
								<div class="form-map">
									map here
								</div>
							</div>
							
						</div>
					</div>

					<div class="form-btn-wrapper">
						<button class="btn btn-primary">Update</button>
					</div>
				</form>
			</div>
			<div v-if="clinicViewStatus == 'services'" class="services-details-wrapper">
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
			<div v-if="clinicViewStatus == 'doctors'" class="doctors-details-wrapper">
				<span v-if="!isAddDoctorsShow">
					<div class="header-title">
						<p class="box-title">List of Doctors</p>
						<div class="add-service-btn">
							<button class="btn btn-primary" v-on:click="editDoctors('add')">Add</button>
						</div>
					</div>
					<div class="tbl-wrapper">
						<table class="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
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
											<label>Sophia Go</label>
										</div>		
									</td>
									<td>
										<p>lorem@ipsum.com</p>
									</td>
									<td>
										<button class="btn btn-primary" v-on:click="editDoctors('edit')">Edit</button>
										<button class="btn btn-primary">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</span>
				<span v-if="isAddDoctorsShow">
					<div class="header-title">
						<p><span v-if="!isEditDoctor">Add</span><span v-if="isEditDoctor">Edit</span> Doctor</p>
					</div>
					<form>
						<div class="form-row">
							<div class="form-col">
								<div class="form-div">
									<label>Name</label>
									<input type="text" >
								</div>
								<div class="form-div">
									<label>Email</label>
									<input type="text">
								</div>
							</div>
							<div class="form-col"></div>
						</div>
						<div class="btn-container">
							<button v-if="!isEditDoctor" class="btn btn-primary" v-on:click="editDoctors()">Submit</button>
							<button v-if="isEditDoctor" class="btn btn-primary" v-on:click="editDoctors()">Update</button>
						</div>
					</form>
				</span>
			</div>
			<div v-if="clinicViewStatus == 'peak_hours'" class="peak-hours-wrapper">
				<div class="tab-wrapper">
					<div class="tab" v-bind:class="{'active' : peakHoursViewStatus == 'weeks'}" v-on:click="setPeakHourView( 'weeks' )">Weeks</div>
					<div class="tab" v-bind:class="{'active' : peakHoursViewStatus == 'holidays'}" v-on:click="setPeakHourView( 'holidays' )">Holidays</div>
				</div>
				<p class="fs-12">*Note: Click button to update peak hours selections.</p>
				<div v-if="peakHoursViewStatus == 'weeks'" class="tbl-wrapper">
					<table class="table">
						<thead>
							<tr>
								<th>Active</th>
								<th>Full Day</th>
								<th>Period</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Peak Hour Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="list in peakHoursData">
								<td>
									<div class="form-div">
										<label class="input-checkbox">
										  <input type="checkbox" v-model="list.active">
										  <span class="input-text">{{ list.day }}</span>
										  <span class="input-checkmark"></span>
										</label>	
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<label class="input-checkbox">
										  <input type="checkbox">
										  <span class="input-text">&nbsp;</span>
										  <span class="input-checkmark"></span>
										</label>	
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<label class="input-checkbox">
										  <input type="checkbox">
										  <span class="input-text">&nbsp;</span>
										  <span class="input-checkmark"></span>
										</label>	
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<input type="text" class="form-input">
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<input type="text" class="form-input">
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<input type="text" class="form-input">
									</div>
								</td>
								<td>
									<button class="btn btn-primary">Update</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div v-if="peakHoursViewStatus == 'holidays'" class="tbl-wrapper">
					<table class="table">
						<thead>
							<tr>
								<th>Active</th>
								<th>Month</th>
								<th>Day</th>
								<th>Full Day</th>
								<th>Period</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Peak Hour Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="list in peakHoursData">
								<td>
									<div class="form-div">
										<label class="input-checkbox">
										  <input type="checkbox" v-model="list.active">
										  <span class="input-text">{{ list.day }}</span>
										  <span class="input-checkmark"></span>
										</label>	
									</div>
								</td>
								<td>Jan</td>
								<td>1</td>
								<td>
									<div v-if="list.active" class="form-div">
										<label class="input-checkbox">
										  <input type="checkbox">
										  <span class="input-text">&nbsp;</span>
										  <span class="input-checkmark"></span>
										</label>	
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<label class="input-checkbox">
										  <input type="checkbox">
										  <span class="input-text">&nbsp;</span>
										  <span class="input-checkmark"></span>
										</label>	
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<input type="text" class="form-input">
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<input type="text" class="form-input">
									</div>
								</td>
								<td>
									<div v-if="list.active" class="form-div">
										<input type="text" class="form-input">
									</div>
								</td>
								<td>
									<button class="btn btn-primary">Update</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div v-if="clinicViewStatus == 'discount'" class="clinic-discount-wrapper">
				<div class="payment-details-wrapper">
					<p class="box-title">Payment Details</p>
					<div class="white-space-20"></div>
					<div class="details-box">
						<label>Company Name:</label>
						<p>Sophia Goh</p>
					</div>
					<div class="details-box">
						<label>Billing Address:</label>
						<p>79 Anson Road #21-01, Singapore 079906</p>
					</div>
					<div class="details-box">
						<label>Bank Account Type:</label>
						<p>DBS (Bank code: 7171)</p>
					</div>
					<div class="details-box">
						<label>Bank Account Number:</label>
						<p>014-3-053781</p>
					</div>
				</div>
				<div class="discount-wrapper">
					<p class="box-title">Update Clinic Discount</p>
					<div class="white-space-20"></div>
					<p>Clinic Type : <span>Wellness</span></p>
					<div class="white-space-20"></div>
					<form>
						<div class="form-div">
							<label>Clinic Discount</label>
							<input type="number">
						</div>
						<div class="form-div">
							<label>Mednefits Fee (Payable to Clinics)</label>
							<input type="number">
						</div>
						<div class="form-div">
							<label>(With GST SGD13.91)</label>
							<label class="input-radio">GST
							  <input type="radio" name="gst">
							  <span class="input-radio-checkmark"></span>
							</label>
							<label class="input-radio">Non-GST
							  <input type="radio" name="gst">
							  <span class="input-radio-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label>Consultation Fee (Charged to Customers)</label>
							<input type="number">
						</div>
						<div class="form-div">
							<label>(With GST SGD13.91)</label>
							<label class="input-radio">GST
							  <input type="radio" name="gst">
							  <span class="input-radio-checkmark"></span>
							</label>
							<label class="input-radio">Non-GST
							  <input type="radio" name="gst">
							  <span class="input-radio-checkmark"></span>
							</label>
						</div>
					</form>
				</div>
			</div>
			<div v-if="clinicViewStatus == 'clinic_settings'" class="clinic-settings-wrapper">
				<div class="reset-wrapper">
					<form>
						<p class="box-title">Update Password</p>
						<div class="white-space-20"></div>
						<div class="form-div">
							<label>New Password</label>
							<input type="password">
						</div>
						<div class="form-div">
							<label>Re-Type Password</label>
							<input type="password">
						</div>
						<div class="form-div txt-right">
							<div class="white-space-20"></div>
							<button class="btn btn-primary">Update</button>
						</div>
					</form>
				</div>
				<div class="status-wrapper">
					<p class="box-title">Clinic Status</p>
					<div class="white-space-20"></div>
					<div class="status-box inactive">
						<div class="status on">Activate</div>
						<div class="status off">Deactivate</div>
					</div>
				</div>
			</div>
		</div>
		
  </div>
</template>

<script>
	import clinicDetails from '@/components/clinic/clinicDetails'
	export default clinicDetails
</script>
