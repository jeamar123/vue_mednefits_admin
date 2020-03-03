<template>
	<div class="bulk-credit-alloc-wrapper">
		<div class="credit-alloc-header">
			<h1>Credit Allocation</h1>
		</div>
		<div class="credit-search-container">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div>
				<input type="text" placeholder="Search Employee and Hit Enter ..." v-model="global_searchEmp" 
				@keypress.enter="_searchMemberList_(global_searchEmp)" @input="_searchEmpty_(global_searchEmp)">
			</div>
		</div>
		<div class="credit-alloc-body columns">
			<div class="credit-employee-wrapper is-one-third" v-for="(list,index) in employee_list" :key="list.index">
				<div class="employee-header">
					<h3>{{ list.fullname }}</h3>
				</div>
				<div class="employee-body">
					<div class="emp-info-row">
						<div class="emp-title">Email Address:</div>
						<span>{{ list.email }}</span>
					</div>
					<div class="emp-info-row">
						<div class="emp-title">Job Title:</div>
						<span>{{ list.job_title }}</span>
					</div>
					<div class="credit-toggle-btn">
						<button @click="___selectCreditAllocationSpending('medical',index)" v-bind:class="{ active : list.global_creditSpendingType == 'medical'}">MEDICAL</button>
						<button @click="___selectCreditAllocationSpending('wellness',index)" v-bind:class="{ active : list.global_creditSpendingType == 'wellness'}">WELLNESS</button>
					</div>
					<div class="allocation-usage-container">
						<div class="allocation-usage">
							<div>
								<div class="emp-title">Allocation:</div>
								<span>
									<span class="currency-type">{{ list.currency_type }} </span> 
									<span v-if="list.global_creditSpendingType == 'medical'">{{ list.spending_account.medical.credits_allocation | number('0.00') }}</span>
									<span v-if="list.global_creditSpendingType == 'wellness'">{{ list.spending_account.wellness.credits_allocation_wellness | number('0.00') }}</span>
								</span>
							</div>
							<div>
								<div class="emp-title">Usage:</div>
								<span>
									<span class="currency-type">{{ list.currency_type }} </span> 
									<span v-if="list.global_creditSpendingType == 'medical'">{{ list.spending_account.medical.credits_spent | number('0.00') }}</span>
									<span v-if="list.global_creditSpendingType == 'wellness'">{{ list.spending_account.wellness.credits_spent_wellness | number('0.00') }}</span>
									</span>
							</div>
						</div>
						<div class="credit-toggle-btn add-deduct-btn">
							<button @click="___selectCreditAllocationType('add',index)" v-bind:class="{active : list.global_creditAllocationType == 'add'}">ADD</button>
							<button @click="___selectCreditAllocationType('deduct',index)" v-bind:class="{active : list.global_creditAllocationType == 'deduct'}">DEDUCT</button>
						</div>
					</div>
					<div class="add-deduct-input-wrapper">
						<label>Credit to <span v-if="list.global_creditAllocationType == 'add'">Add*</span><span v-if="list.global_creditAllocationType == 'deduct'">Deduct</span></label>
						<input v-model="list.credit_amount" type="number">	
					</div>
					<div>
						<button v-if="list.active == true" @click="___updateCreditAllocation( list,index )" class="btn-primary">UPDATE</button>
						<button v-if="list.active == false" :disabled="list.active == false" class="btn-account-removed">ACCOUNT REMOVED</button>
					</div>
				</div>
			</div>
		</div>
		<div class="employee-pagination dp-flex">
			<div class="prev-next-container dp-flex">
				<div>
					<button @click="___prevPage()" v-if="global_employeeListPagination.hasPrevPage" class="btn-primary">PREV</button>
				</div>
				<div class="range-pagination"><span>{{ global_employeeListPagination.page }}</span> of <span>{{ global_employeeListPagination.totalPages }}</span></div>
				<div>
					<button @click="___nextPage()" class="btn-primary">NEXT</button>
				</div>
			</div>
			<div class="per-page-container">
				<span>per page : </span>
				<span @click="___selectedCreditPerPage()" class="page-num-container"><span class="per-page-num">5</span> <span><i class="fa fa-caret-down" aria-hidden="true"></i></span></span>
				<div v-click-outside="___hideAllDrop" v-if="global_showCreditDp" class="per-page-dp">
					<div><span @click="___setPageLimit( 5 )">5</span></div>
					<div><span @click="___setPageLimit( 10 )">10</span></div>
					<div><span @click="___setPageLimit( 15 )">15</span></div>
					<div><span @click="___setPageLimit( 20 )">20</span></div>
					<div><span @click="___setPageLimit( 25 )">25</span></div>
					<div><span @click="___setPageLimit( 30 )">30</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bulkCreditAllocation from '@/components/corporates/bulkCreditAllocation'
	export default bulkCreditAllocation
</script>