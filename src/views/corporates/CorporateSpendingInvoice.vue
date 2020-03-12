<template>
  <div class="spending-invoice-wrapper">
    <div class="spending-tbl-wrapper">
      <div class="spending-tbl-container">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Invoice Date</th>
              <th>Number</th>
              <th>Total</th>
              <th>Amount Due</th>
              <th>Payment Due</th>
              <th>Payment Amount</th>
              <th>Payment Date</th>
              <th>Payment Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="status-card paid">PAID</div>
              </td>
              <td>1 Mar 2018</td>
              <td>MC00000012</td>
              <td>SGD 89.00</td>
              <td>SGD 89.00</td>
              <td>16 Mar 2018</td>
              <td>SGD 0.00</td>
              <td>Not Paid</td>
              <td></td>
              <td>
                <i @click="___showActionsSelector()" class="fa fa-caret-down"></i>
                <div v-click-outside="___hideAllDrop" v-if="global_isActionsSelectorShow" class="actions-selector">
                  <div @click="___selectActionsSelector('download-invoice')">View as PDF</div>
                  <div>Download Statement</div>
                  <div @click="___selectActionsSelector('payment-method')">Payment Method</div>
                  <div>View Transactions</div>
                  <div>Download Transactions</div>
                  <div @click="___selectActionsSelector('edit-invoice-dates')">Edit Invoice Dates</div>
                </div>
              </td>
            </tr>
            <tr v-if="global_isPaymentDetailsShow" class="company-drop-wrapper">
              <td colspan="10">
                <div class="company-drop-details dp-flex">
                  <div class="list-status-wrapper">
                    <div class="list-status"><div>PENDING</div></div>
                  </div>
                  <div>
                    <div class="dp-flex">
                      <div class="spending-input-wrapper">
                        <label>Payment Date</label>
                        <div class="date-container">
                          <v-date-picker
                            popoverDirection="bottom"
                            v-model="global_spendingInvoiceData.payment_date"
                            :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                            :formats='formats'
                            popover-visibility="focus"
                          ></v-date-picker>
                          <i class="fa fa-caret-down"></i>
                        </div>
                      </div>
                      <div class="spending-input-wrapper">
                        <label>Payment Amount</label>
                        <input type="number">
                      </div>
                      <div class="spending-input-wrapper">
                        <label>Payment Remarks</label>
                        <input type="text">
                      </div>
                    </div>
                    <div class="btn-spending-container">
                      <button @click="___selectActionsSelector('payment-method')" class="btn-cancel">CANCEL</button>
                      <button class="btn-submit">SUBMIT</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal v-if="global_isEditInvoiceModalShow" class="edit-invoice-modal">
      <div slot="header">
        <h1>Edit Statement</h1>
      </div>
      <div slot="body">
        <div class="edit-invoice-input-wrapper dp-flex">
          <div>
           <i class="fa fa-calendar-o" aria-hidden="true"></i>
          </div>
          <div>
            <label>Invoice Date</label>
            <div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="global_spendingInvoiceData.invoice_date"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                :formats='formats'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
        <div class="edit-invoice-input-wrapper dp-flex">
          <div>
           <i class="fa fa-calendar-o" aria-hidden="true"></i>
          </div>
          <div>
            <label>Payment Date</label>
            <div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="global_spendingInvoiceData.due"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                :formats='formats'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="___selectActionsSelector('edit-invoice-dates')" class="btn-close">CANCEL</button>
        <button class="btn-primary">UPDATE</button>
      </div>
    </Modal>
  </div>
</template>

<script>
	import corporateSpendingInvoice from '@/components/corporates/corporateSpendingInvoice'
	export default corporateSpendingInvoice
</script>