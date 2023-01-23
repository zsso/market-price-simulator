<template >
  <div class="bg-info" style="max-height: 350px">
    <b-card 
      
      bg-variant="light">
      <LineChart :chart-data="datacollection" :options="options" />
    </b-card>
  </div>
</template>

<script>

  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // aspectRatio: 5,
          layout: {
              padding: {
                  left: 0,
                  right: 10,
                  top: 0,
                  bottom: 0
              }
          },
          legend: {
            display: false
          },
          scales: {
              xAxes: [{
                  ticks: {
                      display: false
                  }
              }]
          }
        }
      }
    },
    mounted () {
      this.fillData()
    },
    watch: {
      '$store.state.ordersHistory': function() {
        // console.log("change")
        this.fillData()
      }
    },
    methods: {
      fillData () {
        // console.log(this.$store.getters.lastPrice)
        this.datacollection = {
          labels: this.$store.getters.lastPrice[1],
          datasets: [
            {
              fill: false,
              label: 'Last Price',
              borderColor: '#36a2eb',
              backgroundColor: '#36a2eb',
              data: this.$store.getters.lastPrice[0]
            }
            // {
            //   label: 'horizontalBar',
            //   data: [10, 10, 10, 10],
            //   type: 'horizontalBar',
            //   // this dataset is drawn on top
            //   order: 1
            // }
          ]
        }
      }
    }
  }
</script>

<style>

</style>