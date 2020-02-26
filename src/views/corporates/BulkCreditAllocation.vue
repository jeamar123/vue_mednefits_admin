<template>
	<div class="bulk-credit-alloc-wrapper">
		<div class="credit-alloc-header">
			<h1>Credit Allocation</h1>
		</div>
		<div class="credit-search-container">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div>
				<input type="text" placeholder="Search Employee and Hit Enter ...">
			</div>
		</div>
		<div class="credit-alloc-body columns">
			<div class="credit-employee-wrapper is-one-third" v-for="list in employee_list" :key="list.index">
				<div class="employee-header">
					<h3>{{ list.fullname }}</h3>
				</div>
				<div class="employee-body">
					<div class="emp-info-row">
						<div class="emp-title">Email Address:</div>
						<span>jeamar@gmai.com</span>
					</div>
					<div class="emp-info-row">
						<div class="emp-title">Job Title:</div>
						<span>Other</span>
					</div>
					<div class="credit-toggle-btn">
						<button @click="___selectCreditAllocationSpending(0)" v-bind:class="{ active : global_creditSpendingType == 0}">MEDICAL</button>
						<button @click="___selectCreditAllocationSpending(1)" v-bind:class="{ active : global_creditSpendingType == 1}">WELLNESS</button>
					</div>
					<div class="allocation-usage-container">
						<div class="allocation-usage">
							<div>
								<div class="emp-title">Allocation:</div>
								<span><span>SGD </span> <span>0.00</span></span>
							</div>
							<div>
								<div class="emp-title">Usage:</div>
								<span><span>SGD </span> <span>0.00</span></span>
							</div>
						</div>
						<div class="credit-toggle-btn add-deduct-btn">
							<button @click="___selectCreditAllocationType(0)" v-bind:class="{active : global_creditAllocationType == 0}">ADD</button>
							<button @click="___selectCreditAllocationType(1)" v-bind:class="{active : global_creditAllocationType == 1}">DEDUCT</button>
						</div>
					</div>
					<div class="add-deduct-input-wrapper">
						<label>Credit to <span v-if="global_creditAllocationType == 0">Add*</span><span v-if="global_creditAllocationType == 1">Deduct</span></label>
						<input type="number">	
					</div>
					<div>
						<button class="btn-primary">UPDATE</button>
					</div>
				</div>
			</div>
		</div>
		<div class="employee-pagination dp-flex">
			<div class="prev-next-container dp-flex">
				<div>
					<button class="btn-primary">PREV</button>
				</div>
				<div class="range-pagination"><span>2</span> of <span>18</span></div>
				<div>
					<button class="btn-primary">NEXT</button>
				</div>
			</div>
			<div class="per-page-container">
				<span>per page : </span>
				<span @click="___selectedCreditPerPage()" class="page-num-container"><span class="per-page-num">5</span> <span><i class="fa fa-caret-down" aria-hidden="true"></i></span></span>
				<div v-click-outside="___hideAllDrop" v-if="global_showCreditDp" class="per-page-dp">
					<div><span>6</span></div>
					<div><span>12</span></div>
					<div><span>24</span></div>
					<div><span>30</span></div>
					<div><span>36</span></div>
					<div><span>60</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bulkCreditAllocation from '@/components/corporates/bulkCreditAllocation'
	export default bulkCreditAllocation
</script>