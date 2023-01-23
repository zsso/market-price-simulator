<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        chartdata: null,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // aspectRatio: 5,
          layout: {
              padding: {
                  left: 0,
                  right: 10,
                  top: 5,
                  bottom: 10
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
          },
          animation: {
            duration: 200,
            easing: 'easeOutCirc'
          }
        }
      }
    },
    mounted () {
      this.fillData()
      this.renderChart(this.chartdata, this.options)
      // var ctx = document.getElementById("line-chart").getContext("2d");
      // ctx.canvas.style.height = 300;
      // ctx.canvas.height = 300;
      // console.log("monted")
    },
    watch: {
      '$store.state.ordersHistory': function() {
        // console.log("change")
        this.fillData()
      }
    },
    methods: {
      fillData () {
        this.chartdata = {
          labels: this.$store.getters.lastPrice[1],
          datasets: [
            {
              fill: false,
              lineTension: 0,
              label: 'Last Price',
              borderColor: '#36a2eb',
              backgroundColor: '#36a2eb',
              data: this.$store.getters.lastPrice[0]
            }
          ]
        }
      this.renderChart(this.chartdata, this.options)
      // console.log("render")
      }
    }
  }
</script>

<style>

</style>