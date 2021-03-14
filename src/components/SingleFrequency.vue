<template>
  <v-chart class="chart" :option="option"></v-chart>
</template>

<script>
export default {
  name: "SingleFrequency",
  props: {
    lowerCasedPlainText: String
  },
  computed: {
    singleFrequency() { // 单字符频率
      var obj = {}
      for (const ch of this.lowerCasedPlainText) {
        if (obj[ch] !== undefined) {
          obj[ch]++
        }
        else {
          obj[ch] = 1
        }
      }
      return obj
    },
    freqList() {  // 转换成 ECharts 所需的 y 轴数据
      var arr = []
      var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
      for (let i = 0; i < alphabet.length; i++) {
        if (this.singleFrequency[alphabet[i]] !== undefined) {
          arr[i] = this.singleFrequency[alphabet[i]]
        }
        else {
          arr[i] = 0
        }
      }
      return arr
    },
    option() {
      var obj = {
        xAxis: {
          type: 'category',
          data: 'abcdefghijklmnopqrstuvwxyz'.split('')  // 字母表
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.freqList,
          type: 'bar'
        }]
      }
      return obj
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.chart
  height 500px
</style>