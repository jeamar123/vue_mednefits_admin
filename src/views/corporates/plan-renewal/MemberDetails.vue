<template>
	<div class="member-details-wrapper">
		<div class="member-details-header dp-flex-ai">
			<div><img :src="'../assets/img/download_emp.png'"></div>
			<div><img :src="'../assets/img/Import icon.svg'"></div>
			<div><img :src="'../assets/img/plus_add.png'"></div>
			<div>
				<button class="btn-primary">Save</button>
			</div>
		</div>
		<div class="member-details-selector">
			<button class="active">Employee Details</button>
			<button>Dependent Details</button>
		</div>
		<div>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Member ID</th>
						<th>Full Name</th>
						<th>Date of Birth</th>
						<th>Start Date</th>
						<th>Country Code</th>
						<th>Mobile Number</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="option-selector">
								<img :src="'../assets/img/dots.png'">
							</div>
						</td>
						<td>
							<div>297</div>
						</td>
						<td>
							<div>Llay Jk</div>
							<div v-if="false">
								<input type="text">
							</div>
						</td>
						<td>
							<div>01/01/1970</div>
							<div v-if="false">
								<input type="text">
								<i class="fa fa-angle-down"></i>
							</div>
						</td>
						<td>
							<div>01/12/2019</div>
							<div v-if="false">
								<input type="text">
								<i class="fa fa-angle-down"></i>
							</div>
						</td>
						<td>
							<div>+65</div>
							<div v-if="false">
								<input type="text">
								<i class="fa fa-angle-down"></i>
							</div>
						</td>
						<td>
							<div>Llay Jk</div>
							<div v-if="false">
								<input type="text">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="option-selector">
								<!-- <img :src="'../assets/img/dots.png'"> -->
							</div>
						</td>
						<td>
							<!-- <div>297</div> -->
						</td>
						<td>
							<div v-if="false">Llay Jk</div>
							<div>
								<input placeholder="Type in Employee's Name" type="text">
							</div>
						</td>
						<td>
							<div v-if="false">01/01/1970</div>
							<div>
								<input placeholder="DD/MM/YYY" type="text">
								<i class="fa fa-angle-down"></i>
							</div>
						</td>
						<td>
							<div v-if="false">01/12/2019</div>
							<div>
								<input placeholder="DD/MM/YYY" type="text">
								<i class="fa fa-angle-down"></i>
							</div>
						</td>
						<td>
							<div v-if="false">+65</div>
							<div>
								<input type="text">
								<i class="fa fa-angle-down"></i>
							</div>
						</td>
						<td>
							<div v-if="false">Llay Jk</div>
							<div>
								<input placeholder="Type in Phone Number" type="text">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="plan-renewal-footer">
			<div></div>
			<div>
				<div class="total-number-container">
					<span>Total number of Seats</span>
					<div class="total-number-box">96</div>
				</div>
				<div class="total-number-container">
					<span>Total number of Employees</span>
					<div class="total-number-box">2</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import memberDetails from '@/components/corporates/plan-renewal/memberDetails'
	export default memberDetails
</script>