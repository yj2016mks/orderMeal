<template>
  <div class="login-box login-box-tsa clear-float">
      <div class="form-box login-wrap">
          <span class="login-font">登录</span>
          <form id="tsa_form" method="POST">
              <div class="login-row">
                  <div class="login-input-box login-input-user-box">
                      <input type="text" v-model='username' name="username" class="login-input login-input-user login-input-user-tsa input-login" placeholder="账号" style="text-indent:10px;">
                  </div>
              </div>
              <div class="login-row">
                    <div class="login-input-box login-input-password-box">
                      <input type="password" v-model='userpwd' name="password" class="login-input login-input-password login-input-password-tsa input-login" placeholder="密码" style="text-indent:10px;">
                    </div>
              </div>
              <div class="login-row login-row-error">
                  <div class="error-msg error-msg-tsa">{{errtip}}</div>
              </div>
              <div class="login-row login-row-sub">
                  <button type="button" @click='getinfo()' class="login-button login-button-tsa">login</button>
              </div>
          </form>
          <div class="back" title="返回"></div>
          <div class="back-img"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: '',
      userpwd: '',
      errtip:''
    }
  },
  mounted(){
      // this.getinfo();
    },
  methods: {
    getinfo() {
      var params = {
        name:this.username,
        password:this.userpwd
      }
      this.$http.post('/login',params).then((response) => {console.log(response)
        if(response.data.status == '0') {
          this.errtip = response.data.msg;
        } else {
          this.errtip = response.data.msg;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
