<template>
  <div id="app">
    <Hero />
    <router-view />
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

</style>
