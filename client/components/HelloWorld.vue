<template>
  <div class="hello">
    <p>ddd</p>
    <p>{{msg2}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg2: ''
    }
  },
  mounted(){
      this.getinfo();
    },
  methods: {
    getinfo() {
      this.$http.get('/login').then((response) => {
        this.msg2 = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
