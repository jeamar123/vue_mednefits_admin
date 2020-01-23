<template>
	<div class="corporate-members-container">
		
		<div class="search-member-wrapper">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div class="form-div">
				<input type="text" placeholder="Search employee">
			</div>
		</div>


		<div class="member-list-pagination">
			<div class="global-pagination">
				<div class="prev-pagination">
					<i class="fa fa-angle-left"></i>
				</div>
				<div class="next-pagination">
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="total-item">
					<span>1 - 10 of 100</span>
				</div>
				<div class="per-page-pagination">
					<span>
						<span>5</span> per page
        	</span>
        	<i class="fa fa-angle-down"></i>
        </div>
      </div>
		</div>

  </div>
</template>

<script>
	import corporateMemberList from '@/components/corporates/corporateMemberList'
	export default corporateMemberList
</script>
