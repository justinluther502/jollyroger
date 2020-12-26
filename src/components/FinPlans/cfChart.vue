<script>
import { Scatter, mixins } from 'vue-chartjs'
import Chart from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

const { reactiveProp } = mixins

export default {
  extends: Scatter,
  mixins: [reactiveProp],
  props: {
    options: Object
  },
  mounted () {
    Chart.plugins.unregister(ChartDataLabels)
    this.renderChart(this.chartData, this.options)
  }
}
</script>