<script>
  import Modal from "../../views/modal/Modal.vue";
  import { 
    _showPageLoading_,
	  _hidePageLoading_,
    _fetchEclaimList_,
    _createEclaimType_,
    _updateEclaimType_,
    _deleteEclaimType_
  } from '../../common/functions/common_functions';

  let claimTypeServices = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_showClaimTypeModal:  false,
        global_updateClaimType: false,
        global_addClaimType:  false,
        global_deleteClaimType:  false,
        global_claimTypes: [],
        global_claimTypeData: {},
      };
    },
    created(){
      this._getClaimTypes_();
    },
    methods: {
      ___openClaimTypesModal( type, data ) {
        this.global_showClaimTypeModal  = this.global_showClaimTypeModal  ==  false ? true : false;
        if ( type == 'update' ) {
          this.global_updateClaimType = true;
          this.global_addClaimType = false;
          let claim_data  = {
            name: data.name,
            type: data.type,
            cap_amount: data.cap_amount,
            health_type_id: data.health_type_id,
          }
          this.global_claimTypeData = claim_data;
        }
        if ( type == 'add' ) {
          this.global_updateClaimType = false;
          this.global_addClaimType = true;
          this.global_claimTypeData = {};
        }
        if(this.global_showClaimTypeModal == false){
          this.global_deleteClaimType = false;
          this.global_updateClaimType = true;
          this.global_addClaimType = false;
        }
      },
      _getClaimTypes_(){
        let params  = {
          customer_id: this.customer_id
        }
        _showPageLoading_();
        _fetchEclaimList_(params)
          .then((res)  =>  {
            _hidePageLoading_();
            console.log(res);
            this.global_claimTypes = res.data.data;
          });
      },
      _addUpdateDeleteClaimType_(){
        let params  = {
          customer_id: Number(this.customer_id),
          name: this.global_claimTypeData.name,
          type: this.global_claimTypeData.type,
          cap_amount: Number(this.global_claimTypeData.cap_amount),
        }
        if(this.global_updateClaimType == true || this.global_deleteClaimType == true){
          params.health_type_id = this.global_claimTypeData.health_type_id;
        }
        let promise = null;
        if(this.global_addClaimType){
          promise = _createEclaimType_(params);
        }else if(this.global_updateClaimType){
          promise = _updateEclaimType_(params);
        }else{
          promise = _deleteEclaimType_(params);
        }
        _showPageLoading_();
        promise.then((res)  =>  {
          if(res.status == 201 || res.status == 200){
            this._getClaimTypes_();
            this.global_claimTypeData = {};
            this.global_showClaimTypeModal = false;
            this.$swal('Success!', res.data.message, 'success');
          }else{
            this.$swal('Error!', res.data.message, 'error');
          }
          _hidePageLoading_();
        });
      },
      _removeClaimType_(data){
        this.$swal({
          title: "Confirm",
          text: "Are you sure you want to delete this claim type?",
          type: "warning",
          confirmButtonColor: "#25306C",
          cancelButtonColor: "#C1C1C1",
        }).then(result => {
          if (result.value) {
            this.global_claimTypeData = data;
            this.global_deleteClaimType = true;
            this._addUpdateDeleteClaimType_();
          } 
        });
        
      },
    }
  }
  
  export default claimTypeServices
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateSettings.scss";
</style>
