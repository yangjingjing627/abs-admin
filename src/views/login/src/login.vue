<template>
  <div class="login-bg">
    <div class="form">
      好升益管理后台
      <input type="text" placeholder="账号" v-model="username"/>
      <input type="password" placeholder="密码" v-model="passwd"/>
      <a class="button" @click="login" :disabled="isLogin">登录</a>
    </div>
  </div>
</template>
<script>
import LoginService from '@/services/login.service.js'
export default {
  data() {
    return {
      username: '',
      passwd: ''
    }
  },
  created() {
    this.LoginService = new LoginService()
  },
  computed: {
    isLogin() {
      return this.username.length <= 0 && this.passwd.length <= 0
    }
  },
  methods: {
    async login() {
      let res = await this.LoginService.login({username: this.username, passwd: this.passwd})
      this.$notify.success('登录成功')
      for (let key in res) {
        // 设置了一周的过期时间
        this.$cookie.set(key, res[key], {
          path: '/',
          expires: 7
        })
      }
      this.$router.replace('／')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.login-bg {
  background: url(../../../assets/img/login/login-bg.png) no-repeat center;
  background-size: contain;
  background-color: #ebf9ff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .form {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 290px;
    height: 280px;
    margin: -140px 0 0 -145px;
    background: url(../../../assets/img/login/login-bg-form.png) no-repeat center;
    background-size: contain;
    color: #1faff6;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 0;
    text-align: center;
    padding: 22px 35px 41px;
    input{
      width: 190px;
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      padding: 4px 7px;
      border: 1px solid $border-color;
      border-radius: 4px;
      color: $font-color;
      &:nth-of-type(1) {
        margin-top: 31px;
        margin-bottom: 16px;
      }
    }
    .button {
      width: 190px;
      height: 34px;
      line-height: 34px;
      margin: 31px auto 0;
      font-size: 18px;
      &[disabled] {
      background: $border-color;
      cursor: default;
      pointer-events: none;
    }
    }
  }
}
</style>
