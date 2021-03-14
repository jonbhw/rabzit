<template>
  <v-chart class="chart" :option="option"></v-chart>  
</template>

<script>
import { THEME_KEY } from "vue-echarts";
export default {
  name: "TripleFrequency",
  props: {
    lowerCasedPlainText: String
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  computed: {
    tripleFrequency() {
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
    option() {
      var obj = {
        visualMap: {
          show: false,
          min: 2,
          max: 6,
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
            lineStyle: { color: '#fff' }
          },
          axisPointer: {
            lineStyle: { color: '#fff' }
          },
          viewControl: {
            // autoRotate: true
          }
        },
        series: [{
          type: 'scatter3D',
          data: this.tripleFrequency
        }]
      }
      return obj
    },
  }  
}
</script>

<style lang="stylus" scoped>
.chart
  height 1500px
</style>