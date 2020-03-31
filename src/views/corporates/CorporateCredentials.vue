<template>
  <div class="credentials-wrapper dp-flex">
    <div>
      <h3>HR/Benefits Credentials</h3>
      <div class="credentials-input-wrapper">
        <label>Email Address*</label>
        <input v-model="global_credentialsData.hr_email" type="text">
      </div>
      <div class="generate-password-container">
        <button @click="_generatePassword_()" class="btn-gray">GENERATE PASSWORD</button>
        <div class="credentials-input-wrapper">
          <label>Retype Password*</label>
          <div class="dp-flex-ai">
            <input v-model="re_password" :type="type">
            <i @click="_showPassword_()" class="fa fa-eye"></i>
          </div>
        </div>
      </div>
      <div>
        <div class="custom-checkbox-container">
          <label class="checkbox-input">
            <span>Mednefits Company Account Email</span>
            <input value="true" type="checkbox">
            <span class="checkbox-mark"></span>
          </label>
        </div>
        <div class="custom-checkbox-container">
          <label class="checkbox-input">
            <span>Company Welcome Email</span>
            <input v-model="global_credentialsData.resend_welcome_email_send_status" value="true" type="checkbox">
            <span class="checkbox-mark"></span>
          </label>
        </div>
        <div v-if="global_credentialsData.resend_welcome_email_send_status == true" class="custom-checkbox-container">
          <label class="checkbox-input">
            <span>Add BCC to email</span>
            <input v-model="global_credentialsData.add_cc" v-on:change="_addCCEmail_( global_credentialsData.add_cc )" value="true" type="checkbox">
            <span class="checkbox-mark"></span>
          </label>
        </div>
        <div v-if="global_credentialsData.add_cc == true" class="bcc-email-container">
          <div>
            <div class="dp-flex">
              <div class="credentials-input-wrapper">
                <label>BCC email</label>
                <input v-model="global_addBccEmail" type="type">
              </div>
              <div>
                <button @click="_addCreateCompanyCCEmail_( global_addBccEmail )" class="btn-primary">ADD</button>
              </div>
            </div>
            <p v-if="cc_email_err" class="text-error">Invalid Email.</p>
          	<p v-if="cc_email_repeat" class="text-error">Email already added.</p>
          </div>  
          <div class="cc-emails-container">
            <div v-for="list of cc_emails" class="cc-emails">
              <span>{{ list }}</span>
              <i @click="_removeCreateCompanyCCEmail_( global_addBccEmail )" class="fa fa-times"></i>
            </div>
          </div>
        </div>
        <button class="btn-gray">UPDATE</button>
      </div>
      <div v-if="false" class="create-benefits-credentials">
        <h3>Create HR/Benefits Credentials</h3>
        <div class="credentials-input-wrapper">
          <label>Email Address*</label>
          <input type="text">
        </div>
        <div class="credentials-input-wrapper">
          <label>Password*</label>
          <div class="dp-flex-ai">
            <input type="password">
            <i class="fa fa-eye"></i>
          </div>
        </div>
        <div class="credentials-input-wrapper">
          <label>Retype Password*</label>
          <div class="dp-flex-ai">
            <input type="password">
            <i class="fa fa-eye"></i>
          </div>
        </div>
        <div class="custom-checkbox-selector">
          <label class="selector-container">
            <span>
              <div>- Member App (With QR Payment, Wallet)</div>
              <div>- HR benefits dashboard (With E-Claim, Statement)</div>
            </span>
            <input type="radio"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
        </div>
        <div class="custom-checkbox-selector">
          <label class="selector-container">
            <span>
              <div>- Member App (No QR payment, No Wallet)</div>
              <div>- HR benefits dashboard (Only on Home, Employee(adding,editing,replace,delete), Activity)</div>
            </span>
            <input type="radio"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
        </div> 
      </div>
    </div>
    <div>
      <div class="e-claim-submission-wrapper">
        <h3>E-Claim Submission</h3>
        <div class="toggle-form">
          <div class="custom-toggle-container">
            <div class="toggle toggle-on active">
              <i class="fa fa-check"></i>
            </div>
            <div class="toggle toggle-off">
              <i class="fa fa-times"></i>
            </div>
          </div>
          <label>Enable E-Claim Submission for Employees</label>
        </div>
      </div>
      <div class="update-account-wrapper">
        <h3>Update Account</h3>
        <div class="custom-checkbox-selector">
          <label class="selector-container">
            <span>
              <div>- Member App (With QR Payment, Wallet)</div>
              <div>- HR benefits dashboard (With E-Claim, Statement)</div>
            </span>
            <input type="radio"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
        </div>
        <div class="custom-checkbox-selector">
          <label class="selector-container">
            <span>
              <div>- Member App (No QR payment, No Wallet)</div>
              <div>- HR benefits dashboard (Only on Home, Employee(adding,editing,replace,delete), Activity)</div>
            </span>
            <input type="radio"/>
            <span class="custom-checkbox-checkmark"></span>
          </label>
        </div> 
        <div class="update-account-btn-container">
          <button class="btn-gray">UPDATE ACCOUNT ACCESSIBILITY</button>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
	import corporateCredentials from '@/components/corporates/corporateCredentials'
	export default corporateCredentials
</script>