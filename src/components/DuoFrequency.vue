<template>
  <div>
    <b-field>
      <b-checkbox v-model="enableTable">显示频率表（可能导致轻微卡顿）</b-checkbox>
    </b-field>
    <v-chart class="chart" :option="option"></v-chart>
    <b-collapse
      aria-id="duofreqpanel"
      class="panel"
      animation="slide"
      v-model="isOpen"
      v-if="enableTable">
      <template #trigger>
        <div
          class="panel-heading"
          role="button"
          aria-controls="duofreqpanel">
          频率表
        </div>
      </template>
      <b-table :data="tableData" :columns="columns"></b-table>
    </b-collapse>
  </div>
  
</template>

<script>
export default {
  name: "DuoFrequency",
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
      isOpen: false,
      enableTable: false
    }
  },
  computed: {
    duoFreqMatrix() {
      var temp_arr = new Array(26);
      for (let i = 0; i < temp_arr.length; i++) {
        temp_arr[i] = new Array(26)
        for (let j = 0; j < temp_arr[i].length; j++) {
          temp_arr[i][j] = 0
        }
      }

      for (let i = 0; i < this.lowerCasedPlainText.length-1; i++) {
        const first = this.lowerCasedPlainText[i].charCodeAt() - "a".charCodeAt()
        const second = this.lowerCasedPlainText[i+1].charCodeAt() - "a".charCodeAt()
        temp_arr[first][second] ++
      }
      return temp_arr
    },
    duoFrequency() {
      const temp_arr = this.duoFreqMatrix
      var arr = []
      for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
          arr.push([i,j,temp_arr[i][j]])
        }
      }
      return arr
    },
    option() {
      var obj = {
        tooltip: {},
        visualMap: {
          max: 20,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
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
          type: 'value'
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [{
          name: "双字符频率",
          type: 'bar3D',
          data: this.duoFrequency.map(function (item) {
            return {
                value: [item[1], item[0], item[2]]
            }
          }),
          shading: 'color',

          label: {
            show: false,
            fontSize: 16,
            borderWidth: 1
          },

          itemStyle: {
            opacity: 0.4
          },

          emphasis: {
            label: {
              fontSize: 20,
              color: '#900'
            },
            itemStyle: {
              color: '#900'
            }
          }
        }]
      }
      return obj
    },
    tableData() {
      var data = []
      for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
          if (this.duoFreqMatrix[i][j] !== 0) {
            data.push({
              'letter': String.fromCharCode(i+97) + String.fromCharCode(j+97),
              'frequency': this.duoFreqMatrix[i][j]
            })
          }
        }
      }
      return data
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart
  height 1000px
.panel
  margin-top 20px
</style>