<template>
  <div>
    <v-chart class="chart" :option="option"></v-chart>
    <b-collapse
      aria-id="triplefreqpanel"
      class="panel"
      animation="slide"
      v-model="isOpen">
      <template #trigger>
        <div
          class="panel-heading"
          role="button"
          aria-controls="triplefreqpanel">
          频率表
        </div>
      </template>
      <b-table :data="tableData" :columns="columns"></b-table>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "TripleFrequency",
  props: {
    lowerCasedPlainText: String
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
      isOpen: false
    }
  },
  computed: {
    tripleFrequencyMatrix() {
      var temp_arr = new Array(26);
      for (let i = 0; i < temp_arr.length; i++) {
        temp_arr[i] = new Array(26)
        for (let j = 0; j < temp_arr[i].length; j++) {
          temp_arr[i][j] = new Array(26)
          for (let k = 0; k < temp_arr[i][j].length; k++) {
            temp_arr[i][j][k] = 0
          }
        }
      }

      for (let i = 0; i < this.lowerCasedPlainText.length-2; i++) {
        const first = this.lowerCasedPlainText[i].charCodeAt() - "a".charCodeAt()
        const second = this.lowerCasedPlainText[i+1].charCodeAt() - "a".charCodeAt()
        const third = this.lowerCasedPlainText[i+2].charCodeAt() - "a".charCodeAt()
        temp_arr[first][second][third] ++
      }
      return temp_arr
    },
    tripleFrequency() {
      const temp_arr = this.tripleFrequencyMatrix
      var arr = []
      for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
          for (let k = 0; k < 26; k++) {
            if (temp_arr[i][j][k] !== 0) {
              arr.push([i,j,k,temp_arr[i][j][k]])
            }
          }
        }
      }
      return arr
    },
    vistualMapMaxNumber() {
      if (this.lowerCasedPlainText.length < 2000) {
        return parseInt(this.lowerCasedPlainText.length / 200) + 1
      }
      const log = parseInt(2*Math.log(this.lowerCasedPlainText.length))
      return log || 15
    },
    option() {
      var obj = {
        tooltip: {},
        visualMap: {
          show: true,
          min: 1,
          max: this.vistualMapMaxNumber,
          inRange: {
            symbolSize: [0.5, 25],
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
            colorAlpha: [0.2, 1]
          }
        },
        xAxis3D: {
          type: 'category',
          data: 'abcdefghijklmnopqrstuvwxyz'.split('')  // 字母表
        },
        yAxis3D: {
          type: 'category',
          data: 'abcdefghijklmnopqrstuvwxyz'.split('')  // 字母表
        },
        zAxis3D: {
          type: 'category',
          data: 'abcdefghijklmnopqrstuvwxyz'.split('')  // 字母表
        },
        grid3D: {
          axisLine: {
            lineStyle: { color: '#000' }
          },
          axisPointer: {
            lineStyle: { color: '#000' }
          },
          viewControl: {
            // autoRotate: true
          }
        },
        series: [{
          name: "三字符频率",
          type: 'scatter3D',
          data: this.tripleFrequency,
          emphasis: {
            label: {
              fontSize: 20,
            }
          }
        }]
      }
      return obj
    },
    tableData() {
      const temp_arr = this.tripleFrequencyMatrix
      var arr = []
      for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
          for (let k = 0; k < 26; k++) {
            arr.push({
              'letter': String.fromCharCode(i+97) + String.fromCharCode(j+97) + String.fromCharCode(k+97),
              'frequency': temp_arr[i][j][k]
            })
          }
        }
      }
      return arr
    }
  }  
}
</script>

<style lang="stylus" scoped>
.chart
  height 1200px
.panel
  margin-top 20px
</style>