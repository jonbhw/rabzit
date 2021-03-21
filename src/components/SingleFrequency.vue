<template>
  <div>
    <b-field>
      <b-checkbox v-model="enableTable">显示频率表</b-checkbox>
    </b-field>
    <v-chart class="chart" :option="option"></v-chart>
    <b-collapse
      aria-id="singlefreqpanel"
      class="panel"
      animation="slide"
      v-model="isOpen"
      v-if="enableTable">
      <template #trigger>
        <div
          class="panel-heading"
          role="button"
          aria-controls="singlefreqpanel">
          频率表
        </div>
      </template>
      <b-table :data="tableData" :columns="columns"></b-table>
    </b-collapse>
  </div>
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
    },
    tableData() {
      var l = []
      for (let i=97; i<=97+25; i++) {
        const ch = String.fromCharCode(i)
        if (this.singleFrequency[ch] === undefined) {
          l.push({
            'letter': ch,
            'frequency': 0
          })
        }
        else {
          l.push({
            'letter': ch,
            'frequency': this.singleFrequency[ch]
          })
        }
      }
      return l
    }
  },
  data() {
    return {
      columns: [
        {
          field: 'letter',
          label: '字符',
          sortable: true
        },
        {
          field: 'frequency',
          label: '频率',
          sortable: true
        }
      ],
      isOpen: false,
      enableTable: false
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.chart
  height 500px
.panel
  margin-top 20px  
</style>