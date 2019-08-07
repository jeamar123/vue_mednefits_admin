<template>
	<div class="clinic-settings-wrapper">
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
</template>

<script>
	import clinicSettings from '@/components/clinic/clinicSettings';
	export default clinicSettings;
</script>