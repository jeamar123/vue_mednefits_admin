<script>
  import VueSlider from 'vue-slider-component'

  let addHeadCount = {
    components: {
      VueSlider
    },
    props: {
      customer_id: [String, Number],
      company_name: [String, Number],
    },
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        global_medicalSlider:  0,
        global_wellnessSlider:  0,
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_empPlanStart:  new Date(),
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