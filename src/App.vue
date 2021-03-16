<template>
  <div id="app">
    <Hero />
    <router-view />
    <footer class="footer">
      <div class="content">
        <p>
          © 2021 Jonbgua
        </p>
      </div>
    </footer>    
  </div>
  
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'

export default {
  components: {
    Hero
  }

}
</script>

<style lang="stylus">
footer
  padding-top 2rem!important
  padding-bottom 2rem!important
</style>
