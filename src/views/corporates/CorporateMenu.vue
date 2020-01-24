<template>
  <div class="corporate-menu-container">
    <div class="left-box-wrapper transition-easeInOutCubic-400ms" :class="[sideBar.trigger ? sideBar.sideStyle : '']">
      <div class="corporate-details-box">
        <a
          href="#"
          class="close-btn summary"
          :class="[sideBar.trigger == false ? 'hide' : '']"
          @click="toggleSideInfoBar()"
        >
          <span class="oi" data-glyph="x" aria-hidden="true"></span>
        </a>
        <img :src="'../assets/img/admin_user.png'" />

        <div class="company-basic-details">
          <div class="info-div">
            <label>Company Name</label>
            <p>MednefitsTech Inc.</p>
          </div>
          <div class="info-div">
            <label>Plan Start Date</label>
            <p>August 4, 2018</p>
          </div>
          <div class="info-div">
            <label>Plan End Date</label>
            <p>August 3, 2019</p>
          </div>
          <div class="info-div">
            <label>Days to Expire Plan</label>
            <p>24</p>
          </div>
        </div>

        <div class="company-basic-details enrollment-status">
          <p class="info-title">Employee Enrollment Status</p>

          <div class="info-div-inline">
            <label>Total seats:</label>
            <p>104</p>
          </div>
          <div class="info-div-inline">
            <label>Occupied Seats:</label>
            <p>42</p>
          </div>
          <div class="info-div-inline">
            <label>Vacant Seats:</label>
            <p>62</p>
          </div>

          <div class="white-space-10"></div>
          <p class="info-title">Dependent Enrollment Status</p>

          <div class="info-div-inline">
            <label>Total seats:</label>
            <p>104</p>
          </div>
          <div class="info-div-inline">
            <label>Occupied Seats:</label>
            <p>42</p>
          </div>
          <div class="info-div-inline">
            <label>Vacant Seats:</label>
            <p>62</p>
          </div>
          <div class="white-space-10"></div>
        </div>

        <div class="company-basic-details company-credits">
          <p class="info-title">Company Credits:</p>
          <p class="info-title">Medical Spending Account:</p>

          <div class="info-div-inline">
            <label>Total:</label>
            <p>
              <span>SGD</span> 74,985.08
            </p>
          </div>
          <div class="info-div-inline">
            <label>Allocated:</label>
            <p>
              <span>SGD</span> 186,637.72
            </p>
          </div>
          <div class="info-div-inline">
            <label>Unallocated:</label>
            <p>
              <span>SGD</span> -111,652.64
            </p>
          </div>
          <div class="info-div-inline">
            <label>Spent:</label>
            <p>
              <span>SGD</span> 87,039.98
            </p>
          </div>
          <div class="info-div-inline">
            <label>Balance:</label>
            <p>
              <span>SGD</span> 100,122.72
            </p>
          </div>

          <div class="white-space-20"></div>
          <p class="info-title">Company Credits:</p>
          <p class="info-title">Wellness Spending Account:</p>

          <div class="info-div-inline">
            <label>Total:</label>
            <p>
              <span>SGD</span> 74,985.08
            </p>
          </div>
          <div class="info-div-inline">
            <label>Allocated:</label>
            <p>
              <span>SGD</span> 186,637.72
            </p>
          </div>
          <div class="info-div-inline">
            <label>Unallocated:</label>
            <p>
              <span>SGD</span> -111,652.64
            </p>
          </div>
          <div class="info-div-inline">
            <label>Spent:</label>
            <p>
              <span>SGD</span> 87,039.98
            </p>
          </div>
          <div class="info-div-inline">
            <label>Balance:</label>
            <p>
              <span>SGD</span> 100,122.72
            </p>
          </div>

          <div class="white-space-20"></div>
          <div class="info-div credit-reset">
            <label>Latest Credit Reset Date</label>
            <p>02 January, 2020</p>
          </div>

          <div class="white-space-50"></div>
          <div class="btn-container">
            <button class="btn btn-primary txt-transform-uppercase">Plan Renewal Details</button>
            <button class="btn btn-primary txt-transform-uppercase">Spending Account Renewal Details</button>
            <button
              class="btn btn-primary txt-transform-uppercase"
            >Send Plan Expiration Notification</button>
            <button class="btn btn-primary txt-transform-uppercase">Corporate Details</button>
            <button class="btn btn-primary txt-transform-uppercase">Settings</button>
          </div>
        </div>
      </div>
    </div>

    <div class="right-box-wrapper transition-easeInOutCubic-400ms" :class="[sideBar.trigger ? sideBar.sideStyle : '']">
      <div class="corporate-main-container">
        <div class="toggleResponsive-closeCorporate">
          <div class="col-1">
            <a href="#"
              :class="[sideBar.trigger ? 'hide' : '']"
              class="btn-menu"
              @click="toggleSideInfoBar()" >
              <span class="oi" data-glyph="menu" title="menu" aria-hidden="true"></span>
            </a>
          </div>
          <div class="col-2">
            <router-link tag="a" :to="{ name: 'Corporates' }" class="close-btn corporate">
              <span class="oi" data-glyph="x" aria-hidden="true"></span>
            </router-link>
          </div>
        </div>

        <router-view name="child"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import corporateMenu from "@/components/corporates/corporateMenu";
export default corporateMenu;
</script>
