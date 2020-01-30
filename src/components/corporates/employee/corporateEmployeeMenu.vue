<script>
let corporateEmployeeMenu = {
	props: {
		customer_id: [String, Number],
	},
	data() {
		return {
			data: null,
			sideBar: {
				trigger: false,
			}
		};
	},
	created() {
		console.log(this.customer_id);
		console.log(this.$route);
	},
	methods: {
		toggleSideInfoBar(opt) {
			//sidebar information in mobile view
			this.sideBar.trigger = !this.sideBar.trigger;
		},
		showEmpSelectorInfo(page) {
			this.$router.push({ name: page });
		},
	}
}

export default corporateEmployeeMenu
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateEmployee.scss";
</style>
