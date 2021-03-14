<template>
  <div>
    <!-- 文本框(明文) -->
    <section class="section">
      <div class="container">
        <b-field>
          <b-input v-model="plaintext" type="textarea"></b-input>
        </b-field>
        <b-button @click="processPlainText">Process!</b-button>
      </div>
    </section>
    <section v-if="displaySingleFrequency" class="section">
      <div class="container">
        <SingleFrequency :lowerCasedPlainText="lowerCasedPlainText" />
      </div>
    </section>
    <section v-if="displayDuoFrequency" class="section">
      <div class="container">
        <DuoFrequency :lowerCasedPlainText="lowerCasedPlainText" />
      </div>
    </section>    
  </div>
</template>

<script>
import SingleFrequency from '@/components/SingleFrequency.vue'
import DuoFrequency from '@/components/DuoFrequency.vue'
export default {
  name: 'Home',
  components: {
    SingleFrequency, DuoFrequency
  },
  data() {
    return {
      plaintext: "",
      lowerCasedPlainText: "",
      tripleFrequency: {},  // 三字符频率
      displaySingleFrequency: true,
      displayDuoFrequency: true,
    }
  },
  methods: {
    processPlainText() {
      this.lowerCasedPlainText = this.plaintext.toLowerCase().replace(/[^a-z]+/g, '')
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
