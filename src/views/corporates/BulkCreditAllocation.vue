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
		<div class="credit-alloc-body">
			<div class="credit-employee-wrapper">
				<div class="employee-header">
					<h3>Potter four</h3>
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
						<button class="active">MEDICAL</button>
						<button>WELLNESS</button>
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
							<button class="active">ADD</button>
							<button>DEDUCT</button>
						</div>
					</div>
					<div class="add-deduct-input-wrapper">
						<label>Credit to Add*</label>
						<input type="number">	
					</div>
					<div>
						<button class="btn-primary">UPDATE</button>
					</div>
				</div>
			</div>
		</div>
		<div class="employee-pagination">
			<div>
				<button class="btn-primary">PREV</button>
			</div>
			<div class="range-pagination"><span>2</span> of <span>18</span></div>
			<div>
				<button class="btn-primary">NEXT</button>
			</div>
			<div class="per-page-container">
				<span>per page : </span>
				<span class="page-num-conainer"><span class="per-page-num">5</span> <span><i class="fa fa-caret-down" aria-hidden="true"></i></span></span>
			</div>
		</div>
	</div>
</template>

<script>
	import bulkCreditAllocation from '@/components/corporates/bulkCreditAllocation'
	export default bulkCreditAllocation
</script>