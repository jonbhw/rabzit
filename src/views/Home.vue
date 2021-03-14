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
    }
  }
}
</script>
