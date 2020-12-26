<script>
import { Pie } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Chart from "chart.js"

export default {
  extends: Pie,
  props: {
    chartdata: Object,
    slice: Number
  },
  data() {
    return {
      datacollection: {
        datasets: [{
          data: [],
          backgroundColor: [
              '#00FFFF',
              '#F0FFFF',
              '#89CFF0',
              '#0000FF',
              '#0047AB',
              '#6495ED',
              '#00FFFF',
              '#00008B',
              '#CCCCFF',
              '#4169E1',
              '#9FE2BF',
              '#008080',
              '#40E0D0',
              '#0437F2'
          ]
        }],
        labels: []
      }
    }
  },
  mounted() {
    Chart.plugins.unregister(ChartDataLabels)
    const data = this.chartdata
    delete data['labels']
    delete data['returns']
    delete data['risks']
    for (const key in data) {
      this.datacollection.labels.push(key)
      this.datacollection.datasets[0].data.push(data[key][this.slice])
    }
    this.renderChart(this.datacollection)
  }
}
</script>

<style scoped>

</style>