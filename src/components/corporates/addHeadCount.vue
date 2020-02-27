<script>

  let addHeadCount = {
    props: {
      customer_id: [String, Number],
      company_name: [String, Number],
    },
    formats: {
      input: ["DD/MM/YYYY"],
      data: ["DD/MM/YYYY"]
    },
    global_empPlanStart:  new Date(),
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
      };
    },
    created(){
      
    },
    methods: {
     
      
    }
  }
  
  export default addHeadCount
</script>

<style lang="scss">
  @import "./src/assets/css/corporateSettings.scss";
  
  input.vDatepicker {
    background-color: transparent;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    padding: 2px;
    width: 100%;
  }
</style>