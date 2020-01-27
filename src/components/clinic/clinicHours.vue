<script>
let clinicHours = {
  data() {
    return {
      peakHoursData : [{ day: 'Monday' },{ day: 'Tuesday' },{ day: 'Wednesday' },{ day: 'Thursday' },{ day: 'Friday' },{ day: 'Saturday' },{ day: 'Friday' }],
      peakHoursViewStatus : 'holidays',
    };
  },
  created(){

  },
  methods: {
    setPeakHourView( opt ){
      this.peakHoursViewStatus = opt;
    }
  }
}
  
export default clinicHours
</script>

<style lang="scss" scoped>
  @import "./src/assets/css/clinic.scss";
</style>
