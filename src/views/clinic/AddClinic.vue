<template>
	<div class="add-clinic-container">
		<router-link tag="a" to="/dashboard/clinic" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
		<div class="header-wrapper">
			<div class="steps-wrapper">
				<div class="steps" v-bind:class="{'active' : activeStep == 1, 'done' : activeStep > 1}">
					<label>Details</label>
					<span v-if="activeStep <= 1">1</span>
					<span v-if="activeStep > 1" class="oi" data-glyph="check" aria-hidden="true"></span>
				</div>
				<div class="steps" v-bind:class="{'active' : activeStep == 2, 'done' : activeStep > 2}">
					<label>Hours</label>
					<span v-if="activeStep <= 2">2</span>
					<span v-if="activeStep > 2" class="oi" data-glyph="check" aria-hidden="true"></span>
				</div>
				<div class="steps" v-bind:class="{'active' : activeStep == 3, 'done' : activeStep > 3}">
					<label>Doctors</label>
					<span v-if="activeStep <= 3">3</span>
					<span v-if="activeStep > 3" class="oi" data-glyph="check" aria-hidden="true"></span>
				</div>
				<div class="steps" v-bind:class="{'active' : activeStep == 4, 'done' : activeStep > 4}">
					<label>Service</label>
					<span v-if="activeStep <= 4">4</span>
					<span v-if="activeStep > 4" class="oi" data-glyph="check" aria-hidden="true"></span>
				</div>
				<div class="steps" v-bind:class="{'active' : activeStep == 5, 'done' : activeStep > 5}">
					<label>Summary</label>
					<span v-if="activeStep <= 5">5</span>
					<span v-if="activeStep > 5" class="oi" data-glyph="check" aria-hidden="true"></span>
				</div>
			</div>
		</div>
		<div v-if="activeStep == 1" class="body-wrapper">
			<div class="header-title">
				<div class="title-text">
					<p class="form-title">Clinic Details</p>
					<label>We'll get you setup in no time.</label>
				</div>
				<div class="btn-wrapper">
					<button class="btn btn-primary" v-on:click="nextStep()">Next</button>
				</div>
			</div>
			<form>
				<div class="form-row">
					<div class="form-col">
						<p class="form-title">Health Provider Details</p>
						<div class="white-space-20"></div>
						<div class="form-div">
							<label>Name</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>MRT</label>
							<select>
								<option></option>
								<option>A</option>
								<option>A</option>
							</select>
						</div>
						<div class="form-div">
							<label>Clinic Type</label>
							<select>
								<option></option>
								<option>A</option>
								<option>A</option>
							</select>
						</div>
						<div class="form-div">
							<label>Phone</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Opening</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Address</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Latitude</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Longitude</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="white-space-20"></div>
						<div class="white-space-20"></div>
						<div class="white-space-5"></div>
						<div class="form-div">
							<label>City</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>District</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Postal Code</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Country</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>State</label>
							<input type="text">
						</div>
						<div class="form-div">
							<label>Currency Type</label>
							<select>
								<option></option>
								<option>A</option>
								<option>A</option>
							</select>
						</div>
					</div>
					<div class="form-col">
						<p class="form-title">Billing Information</p>
						<div class="white-space-50"></div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Same as Health Provider Details</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label>Billing Name</label>
							<input type="text" name="">
						</div>
						<div class="form-div">
							<label>Billing Address</label>
							<input type="text" name="">
						</div>
						<div class="white-space-20"></div>
						<p class="form-title">Health Partner Credentials</p>
						<div class="white-space-20"></div>
						<div class="form-div">
							<label>Login Email Address</label>
							<input type="text" name="">
						</div>
						<div class="form-div">
							<label>Password</label>
							<input type="password" name="">
						</div>
						<div class="white-space-20"></div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Communication Email is the same as Login Email</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label>Communication Email Address</label>
							<input type="text" name="">
						</div>
					</div>
				</div>
				<div class="form-div">
					<div class="white-space-20"></div>
					<label>Select address from google map (optional)</label>
					<div class="map-wrapper">
						Map here...
					</div>
				</div>
			</form>
		</div>
		<div v-if="activeStep == 2" class="body-wrapper">
			<div class="header-title">
				<div class="title-text">
					<p class="form-title">Set Your Business Hours</p>
					<label>Let your customers know when you're open.</label>
				</div>
				<div class="btn-wrapper">
					<button class="btn btn-primary" v-on:click="prevStep()">Prev</button>
					<button class="btn btn-primary" v-on:click="nextStep()">Next</button>
				</div>
			</div>
			
			<div class="hours-wrapper">
				<div class="hour-row" v-for="list in [1,2,3]">
					<div class="day">
						<span>Monday</span>
					</div>
					<div class="hour-toggle">
						<div class="toggle-wrapper active">
							<div class="toggle on">
								On
							</div>
							<div class="toggle off">
								Off
							</div>
						</div>
					</div>
					<div class="start">
						<div class="form-div">
							<input type="text" class="form-input">
						</div>
					</div>
					<div class="to">
						<span>to</span>
					</div>
					<div class="end">
						<div class="form-div">
							<input type="text" class="form-input">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="activeStep == 3" class="body-wrapper">
			<div class="header-title">
				<div class="title-text">
					<p class="form-title">Add Doctors</p>
					<label>Dont worry - you can always edit these later.</label>
				</div>
				<div class="btn-wrapper">
					<button class="btn btn-primary" v-on:click="prevStep()">Prev</button>
					<button class="btn btn-primary" v-on:click="nextStep()">Next</button>
				</div>
			</div>
			<div class="added-doctors-wrapper">
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
							<tr v-for="list in [1,2,3,4,5]">
								<td><span>Lorem Ipsum</span></td>
								<td><span>lorem@ipsum.com</span></td>
								<td>
									<button class="btn btn-primary">
										<span class="oi" data-glyph="trash" aria-hidden="true"></span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="add-doctors-wrapper">
				<div class="doctor-row">
					<div class="name">
						<div class="form-div">
							<label>Name</label>
							<input type="text">
						</div>
					</div>
					<div class="email">
						<div class="form-div">
							<label>Email</label>
							<input type="text">
						</div>
					</div>
					<div class="options">
						<button class="btn btn-primary">Add</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="activeStep == 4" class="body-wrapper">
			<div class="header-title">
				<div class="title-text">
					<p class="form-title">Add the Services You Offer</p>
					<label>Dont worry - you'll be able to edit these later.</label>
				</div>
				<div class="btn-wrapper">
					<button class="btn btn-primary" v-on:click="prevStep()">Prev</button>
					<button class="btn btn-primary" v-on:click="nextStep()">Next</button>
				</div>
			</div>
			<div class="added-services-wrapper">
				<div class="tbl-wrapper">
					<table class="table">
						<thead>
							<tr>
								<th>Service Name</th>
								<th>Time</th>
								<th>Price</th>
								<th>No. of Doctors</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="list in [1,2,3]">
								<td><span>Lorem Ipsum</span></td>
								<td><span>1 mins</span></td>
								<td>S$<span>1</span></td>
								<td><span>1</span></td>
								<td>
									<button class="btn btn-primary">
										<span class="oi" data-glyph="trash" aria-hidden="true"></span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="add-services-wrapper">
				<div class="services-row">
					<div class="name">
						<div class="form-div">
							<label>Services Name</label>
							<input type="text">
						</div>
					</div>
					<div class="time">
						<div class="form-div">
							<label>Time</label>
							<input type="number" min="0">
						</div>
					</div>
					<div class="duration">
						<div class="form-div">
							<label>Duration</label>
							<select>
								<option></option>
								<option>mins</option>
								<option>hours</option>
							</select>
						</div>
					</div>
					<div class="amount">
						<div class="form-div">
							<label>Amount</label>
							<input type="number" min="0">
						</div>
					</div>
					<div class="doctors">
						<div class="form-div">
							<label>Doctors</label>
							<select>
								<option></option>
								<option>A</option>
								<option>A</option>
							</select>
						</div>
					</div>
					<div class="options">
						<button class="btn btn-primary">Add</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="activeStep == 5" class="body-wrapper">
			<div class="header-title">
				<div class="title-text">
					<p class="form-title">Summary</p>
					<label>Check your clinic details first.</label>
				</div>
				<div class="btn-wrapper">
					<button class="btn btn-primary" v-on:click="prevStep()">Prev</button>
					<button class="btn btn-primary" v-on:click="submitAddClinic()">Submit</button>
				</div>
			</div>
			<p class="form-title summary-title">Clinic Details</p>
			<div class="white-space-10"></div>
			<div class="details-container">
				<div class="div-row">
					<div class="div-col">
						<p class="form-subtitle">Health Provider Details</p>
						<div class="white-space-10"></div>
						<div class="label-detail">
							<label>Name</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>MRT</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Clinic Type</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Phone</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Opening</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Currency Type</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Description</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Address</label>
							<p>Lorem Ipsum</p>
						</div>
					</div>
					<div class="div-col">
						<div class="white-space-20"></div>
						<div class="white-space-10"></div>
						<div class="white-space-5"></div>
						<div class="label-detail">
							<label>Latitude</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Longitude</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>City</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Dictrict</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Postal Code</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Country</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>State</label>
							<p>Lorem Ipsum</p>
						</div>
					</div>
					<div class="div-col">
						<p class="form-subtitle">Billing Information</p>
						<div class="white-space-10"></div>
						<div class="label-detail">
							<label>Billing Name</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Billing Address</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="white-space-10"></div>
						<p class="form-subtitle">Health Partner Credentials</p>
						<div class="white-space-20"></div>
						<div class="label-detail">
							<label>Login Email Address</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Password</label>
							<p>Lorem Ipsum</p>
						</div>
						<div class="label-detail">
							<label>Communication Email Address</label>
							<p>Lorem Ipsum</p>
						</div>
					</div>
				</div>
			</div>

			<div class="white-space-20"></div>
			<p class="form-title summary-title">Business Hours</p>
			<div class="white-space-10"></div>
			<div class="business-hours-container">
				<div class="tbl-wrapper">
					<table class="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Start Time</th>
								<th>End Time</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Monday</td>
								<td>08:00 AM</td>
								<td>05:30 PM</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="white-space-20"></div>
			<p class="form-title summary-title">Services</p>
			<div class="white-space-10"></div>
			<div class="services-container">
				<div class="tbl-wrapper">
					<table class="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Time</th>
								<th>Price</th>
								<th>No. of Doctors</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Lorem Ipsum</td>
								<td>1 mins</td>
								<td>S$<span>1.00</span></td>
								<td>1</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="white-space-20"></div>
			<p class="form-title summary-title">Doctors</p>
			<div class="white-space-10"></div>
			<div class="doctors-container">
				<div class="tbl-wrapper">
					<table class="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Lorem Ipsum</td>
								<td>lorem@ipsum.com</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import addClinic from '@/components/clinic/addClinic'
	export default addClinic
</script>
