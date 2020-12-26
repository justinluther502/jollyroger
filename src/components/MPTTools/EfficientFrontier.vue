<script>
//Importing Line class from the vue-chartjs wrapper
import {Scatter} from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Chart from "chart.js"

//Exporting this so it can be used in other components
export default {
  extends: Scatter,
  components: {ChartDataLabels},
  data() {
    return {
      endpoint: '',
      individ_labels: [],
      rets: [],
      stdevs: [],
      individ_points: [],
      datacollection: {
        datasets: [
          {
            label: 'Portfolio Returns',
            backgroundColor: getComputedStyle(document.body)
                .getPropertyValue('--primary'),
            pointBackgroundColor: getComputedStyle(document.body)
                .getPropertyValue('--primary'),
            borderWidth: 1,
            pointBorderColor: getComputedStyle(document.body)
                .getPropertyValue('--primary'),
            data: this.chartdata,
            datalabels: {
              display: false
            }
          },
          {
            label: 'Individual Assets',
            labels: this.assetlabels,
            backgroundColor: getComputedStyle(document.body)
                .getPropertyValue('--secondary'),
            pointBackgroundColor: getComputedStyle(document.body)
                .getPropertyValue('--secondary'),
            borderWidth: 1,
            pointBorderColor: getComputedStyle(document.body)
                .getPropertyValue('--secondary'),
            data: this.assetdata
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        onClick: this.handlePointClick,
        responsive: true,
        // this plugin option points back to the "labels" defined in the
        // dataset.
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return context.dataset.labels[context.dataIndex]
            },
            align: 'bottom'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              suggestedMin: 3
            },
            gridLines: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: "Average Returns"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: "Standard Deviation of Returns"
            }
          }]
        },
        legend: {
          display: true
        },
        maintainAspectRatio: false,
      }
    }
  },
  props: {
    chartdata: Array,
    assetdata: Array,
    assetlabels: Array,
    point_clicked: Number
  },
  mounted() {
    //renderChart function renders the chart with the datacollection
    // and options object.
    Chart.plugins.register(ChartDataLabels)
    this.renderChart(this.datacollection, this.options)
  },
  methods: {
    handlePointClick(point, event) {
      const slice = event[0]._index
      this.$emit('update-slice', slice)
    }
  }
}
</script>