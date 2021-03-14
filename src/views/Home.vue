<template>
  <div>
    <!-- 文本框(明文) -->
    <section class="section">
      <div class="container">
        <b-field>
          <b-input v-model="plaintext" type="textarea"></b-input>
        </b-field>
        <b-button @click="processPlainText">Process 1</b-button>
        <b-button @click="analyzeSingleFrequency">Process 2</b-button>
        <b-button @click="analyzeDuoFrequency">Process 3</b-button>
        <b-button @click="analyzeTripleFrequency">Process 4</b-button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      plaintext: "",
      lowerCasedPlainText: "",
      singleFrequency: {}, // 单字符频率
      duoFrequency: {}, // 双字符频率
      tripleFrequency: {},  // 三字符频率
    }
  },
  methods: {
    processPlainText() {
      this.lowerCasedPlainText = this.plaintext.toLowerCase().replace(/[^a-z]+/g, '')
    },
    analyzeSingleFrequency() {  // 统计单字符频率
      for (const ch of this.lowerCasedPlainText) {
        if (this.singleFrequency[ch] !== undefined) {
          this.singleFrequency[ch]++
        }
        else {
          this.singleFrequency[ch] = 1
        }
      }
    },
    analyzeDuoFrequency() { // 统计双字符频率
      var temp_str = "";
      for (let i = 0; i < this.lowerCasedPlainText.length-1; i++) {
        temp_str = this.lowerCasedPlainText[i] + this.lowerCasedPlainText[i+1]
        if (this.duoFrequency[temp_str] !== undefined) {
          this.duoFrequency[temp_str]++
        }
        else {
          this.duoFrequency[temp_str] = 1
        }
      }
    },
    analyzeTripleFrequency() {  // 统计三字符频率
      var temp_str = "";
      for (let i = 0; i < this.lowerCasedPlainText.length-2; i++) {
        temp_str = this.lowerCasedPlainText[i] + this.lowerCasedPlainText[i+1] + this.lowerCasedPlainText[i+2]
        if (this.tripleFrequency[temp_str] !== undefined) {
          this.tripleFrequency[temp_str]++
        }
        else {
          this.tripleFrequency[temp_str] = 1
        }
      }
    },
  }
}
</script>
