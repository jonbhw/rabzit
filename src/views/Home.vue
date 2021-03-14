<template>
  <div>
    <!-- 文本框(明文) -->
    <section class="section">
      <div class="container">
        <b-field>
          <b-input v-model="plaintext" type="textarea" placeholder="明文"></b-input>
        </b-field>
        <div class="buttons is-right">
          <b-button @click="processPlainText">开始分析</b-button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="title">原文词频分析</h2>
        <b-tabs v-model="activeTab" type="is-boxed" size="is-medium">
          <b-tab-item label="单字符频率">
            <SingleFrequency :lowerCasedPlainText="lowerCasedPlainText" />
          </b-tab-item>
          <b-tab-item label="双字符频率">
            <template v-if="displayDuoFrequency">
              <DuoFrequency :lowerCasedPlainText="lowerCasedPlainText" />
            </template>
          </b-tab-item>
          <b-tab-item label="三字符频率">
            <template v-if="displayTripleFrequency">
              <TripleFrequency :lowerCasedPlainText="lowerCasedPlainText" />
            </template>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>

    
  </div>
</template>

<script>
import SingleFrequency from '@/components/SingleFrequency.vue'
import DuoFrequency from '@/components/DuoFrequency.vue'
import TripleFrequency from '@/components/TripleFrequency.vue'
export default {
  name: 'Home',
  components: {
    SingleFrequency, DuoFrequency, TripleFrequency
  },
  data() {
    return {
      plaintext: "",
      lowerCasedPlainText: "",
      displaySingleFrequency: true,
      displayDuoFrequency: false,
      displayTripleFrequency: false,
      activeTab: 0
    }
  },
  watch: {
    activeTab() {
      if (this.activeTab === 1) {
        this.displayDuoFrequency = true
      } else if (this.activeTab === 2) {
        this.displayTripleFrequency = true
      }
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
