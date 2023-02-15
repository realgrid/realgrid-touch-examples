<template>
  <RealGridTouch :domName="dom"/>
</template>

<script>
import RealGridTouch from './components/RealGridTouch.vue'

export default {
  name: 'App',
  components: {
    RealGridTouch
  },
  data(){
    return{
      dom: 'realtouch'
    }
  },
}
</script>

<style>
html {
    margin: 0px;
}

body {
    margin: 0px;
}
</style>
