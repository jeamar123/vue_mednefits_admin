<template>
	<div class="peak-hours-wrapper">
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
</template>

<script>
	import clinicHours from '@/components/clinic/clinicHours';
	export default clinicHours;
</script>