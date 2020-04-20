<script>
  import Modal from "../../../views/modal/Modal.vue";
  import moment, { locale } from "moment";

  let spendingRenewalDetails = {
    components: {
      Modal
    },
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_showFileUpload: false,
        global_isRollover: 'no', 
        get_spending_data: [
          {
            id: 12,
            name: 'allan alzulas',
            start_date: new Date(),
            medical_entitlement: 100,
            wellness_entitlement: 100,
            medical_entitlement_amount: 400,
            medical_rollover_amount: 100,
            medical_allocated_credits: 600,
            wellness_entitlement_amount: 300,
            wellness_rollover_amount: 100,
            wellness_allocated_credits: 400,
          },
          {
            id: 15,
            name: 'jhon alzulas',
            start_date: new Date(),
            medical_entitlement: 200,
            wellness_entitlement: 500,
            medical_entitlement_amount: 500,
            medical_rollover_amount: 100,
            medical_allocated_credits: 200,
            wellness_entitlement_amount: 300,
            wellness_rollover_amount: 100,
            wellness_allocated_credits: 400,
          },
        ],
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      this._fecthSpendingData_();
    },
    methods: {
      _fileUploadModal_() {
        this.global_showFileUpload = this.global_showFileUpload == false ? true : false;
      },
      _fecthSpendingData_() {
        console.log(this.get_spending_data);

        this.get_spending_data.map((value, key) => {
          console.log(value,key);
          value.index = key;
          value.activeInput = [];
          value.start_date = moment(value.start_date).format('DD/MM/YYYY');
        });
      },
      _rolloverChange_( opt ) {
        console.log(opt);
      },
      _toggleTableInput_( index, inputIndex, col ) {
        console.log(index, inputIndex);
        this.get_spending_data[ index ].activeInput[inputIndex] = true;
        this.$forceUpdate();
      }
    }
  }
  
  export default spendingRenewalDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
