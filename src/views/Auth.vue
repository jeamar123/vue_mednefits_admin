<template>
	<div class="auth-container" style="background-image: url('././assets/img/bg-effect.png');">

		<div class="logo-wrapper">
			<img :src="'../assets/img/logo_white.png'">
		</div>

		<div class="login-wrapper">
			<form v-on:submit.prevent="login( formData )">
				<div class="form-div">
					<label>Email</label>
					<input type="text" class="form-input" v-model="formData.username">
				</div>
				<div class="form-div">
					<label>Password</label>
					<input type="password" class="form-input" v-model="formData.password">
				</div>
				
				<button class="btn login-btn" type="submit">LOGIN</button>
			</form>
		</div>
  </div>
</template>

<script>
	import auth from '@/components/auth'
	export default auth
</script>
