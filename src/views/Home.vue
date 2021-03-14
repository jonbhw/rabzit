<template>
  <div>
    <!-- 文本框 -->
    <section class="section">
      <div class="container">
        <b-field>
          <b-input v-model="plaintext" type="textarea" placeholder="明文"></b-input>
        </b-field>
        <b-field>
          <b-input v-model="vigenereKey" placeholder="维吉尼亚密钥（可选）"></b-input>
        </b-field>
        <div class="buttons is-right">
          <b-button @click="processPlainText">开始分析</b-button>
        </div>
      </div>
    </section>
    <!-- 原文词频分析 -->
    <section class="section" v-show="lowerCasedPlainText">
      <div class="container">
        <h2 class="title">原文词频分析</h2>
        <b-tabs v-model="activeTab" type="is-boxed" size="is-medium">
          <b-tab-item label="单字符频率">
            <template v-if="displaySingleFrequency">
              <SingleFrequency :lowerCasedPlainText="lowerCasedPlainText" />
            </template>
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
          <b-tab-item :visible="!(displaySingleFrequency||displayDuoFrequency||displayTripleFrequency)" label=" "></b-tab-item>
        </b-tabs>
      </div>
    </section>
    <!-- 加密 -->
    <section class="section" v-show="vigenereCryptedText">
      <div class="container">
        <h2 class="title">Vigenere 加密</h2>
        <h3 class="title">密文</h3>
        <b-field class="vg-crypt-text">
          <b-input v-model="vigenereCryptedText" type="textarea" placeholder="密文" disabled></b-input>
        </b-field>
        <h3 class="title">密文词频分析</h3>
        <b-tabs v-model="activeTabC" type="is-boxed" size="is-medium">
          <b-tab-item label="单字符频率">
            <template v-if="displaySingleFrequencyC">
              <SingleFrequency :lowerCasedPlainText="vigenereCryptedText" />
            </template>
          </b-tab-item>
          <b-tab-item label="双字符频率">
            <template v-if="displayDuoFrequencyC">
              <DuoFrequency :lowerCasedPlainText="vigenereCryptedText" />
            </template>
          </b-tab-item>
          <b-tab-item label="三字符频率">
            <template v-if="displayTripleFrequencyC">
              <TripleFrequency :lowerCasedPlainText="vigenereCryptedText" />
            </template>
          </b-tab-item>
          <b-tab-item :visible="!(displaySingleFrequencyC||displayDuoFrequencyC||displayTripleFrequencyC)" label=" "></b-tab-item>
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
      vigenereKey: "",
      lowerCasedPlainText: "",
      vigenereCryptedText: "",

      displaySingleFrequency: false,
      displaySingleFrequencyC: false,
      displayDuoFrequency: false,
      displayDuoFrequencyC: false,
      displayTripleFrequency: false,
      displayTripleFrequencyC: false,
      activeTab: 3,
      activeTabC: 3
    }
  },
  watch: {
    activeTab() { // 魔法: 为了解决ECharts在这个Tab还没显示时获取不到DOM Width导致图表畸形的问题
      if (this.activeTab === 0) {
        this.displaySingleFrequency = true
      } else if (this.activeTab === 1) {
        this.displayDuoFrequency = true
      } else if (this.activeTab === 2) {
        this.displayTripleFrequency = true
      }
    },
    activeTabC() { // 密文板块
      if (this.activeTabC === 0) {
        this.displaySingleFrequencyC = true
      } else if (this.activeTabC === 1) {
        this.displayDuoFrequencyC = true
      } else if (this.activeTabC === 2) {
        this.displayTripleFrequencyC = true
      }
    }
  },
  methods: {
    processPlainText() {
      this.lowerCasedPlainText = this.plaintext.toLowerCase().replace(/[^a-z]+/g, '')
      this.activeTab = 0
      if (this.vigenereKey) {
        this.vigenereCrypt()
        this.activeTabC = 0
      }
    },
    vigenereCrypt() {
      var i = 0
      var result = ""
      for (let ch of this.lowerCasedPlainText) {
        result += String.fromCharCode('a'.charCodeAt() + ((ch.charCodeAt()-'a'.charCodeAt()+this.vigenereKey[i].charCodeAt()) % 26))
        i = (i+1) % this.vigenereKey.length
      }
      this.vigenereCryptedText = result
    }
  }
}
</script>

<!-- 没有使用 scoped, 因为一用 scoped 那个 cursor 就生效不了 -->
<style lang="stylus">
.vg-crypt-text
  margin-bottom 30px!important
  .textarea
    cursor text!important
</style>
