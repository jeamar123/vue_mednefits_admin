<template>
	<div class="gp-cap-per-wrapper">
		<div class="gp-cap-header">
			<div class="gp-cap-header-title">
				<h3>GP - Cap per Visit</h3>
			</div>
			<div class="dp-flex gp-header-btn">
				<img :src="'../assets/img/download_emp.png'">
				<img :src="'../assets/img/Import icon.svg'">
				<button class="save-continue-btn">SAVE & CONTINUE</button>
			</div>
		</div>
		<div class="gp-cap-body">
			<div class="gp-cap-body-container">
				<table class="gp-cap-table-wrapper">
					<thead>
						<tr>
							<th>Member ID</th>
							<th>Name</th>
							<th>Cap per Visit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list, index) of global_getGpData" :key="list.index">
							<td>{{ list.id }}</td>
							<td>{{ list.name }}</td>
							<td>
								<div @click="___editTable( list )">
									<span>SGD </span>	
									<span v-if="global_showText && !global_showInput">{{ list.amount }}</span>
									<span v-if="global_showInput">
										<input type="text">
									</span>
								</div>
								<div v-if="false">
									<span>Not Applicable</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="gp-cap-pagination dp-flex">
				<div class="page-wrapper">
					<div class="page-scroll-container dp-flex">
						<span>
							<i class="fa fa-angle-left"></i>
							<span class="prev-page">Prev</span>
						</span>
						<div>
							<span class="gp-page-num active">1</span>
							<span class="gp-page-num">2</span>
							<span class="gp-page-num">3</span>
						</div>
						<span>
							<span class="prev-page">Next</span>
							<i class="fa fa-angle-right"></i>
						</span>
					</div>
				</div>
				<div class="rows-page-wrapper">
					<span>10 per page <span><i class="fa fa-caret-down"></i></span></span>
					<div v-if="false" class="page-dp-container">
						<div>10</div>
						<div>20</div>
						<div>30</div>
						<div>40</div>
						<div>50</div>
						<div>60</div>
						<div>70</div>
						<div>80</div>
						<div>90</div>
						<div>100</div>
					</div>
				</div>
			</div>	
	</div>
</template>

<script>
	import gcapPerVisit from '@/components/corporates/gcapPerVisit'
	export default gcapPerVisit
</script>