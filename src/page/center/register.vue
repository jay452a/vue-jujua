<style scoped lang="postcss">
.icon {
  width: 30px;
}
.btn-box {
  margin-top: 30px;
  padding: 0 30px;
}
</style>
<template>
  <div>
    <s-header title="用户注册"></s-header>
    <div class="s-header">
      <md-field>
        <md-input-item placeholder="请输入用户名" v-model="loginName">
          <img src="/static/ic_user.png" alt="" class="icon" slot="left">
        </md-input-item>
        <md-input-item placeholder="请输入密码" v-model="loginPass" type="password">
          <img src="/static/ic_pwd.png" alt="" class="icon" slot="left">
        </md-input-item>
        <md-input-item placeholder="请输入邮箱，用于找回密码" v-model="Email">
          <img src="/static/ic_email.png" alt="" class="icon" slot="left">
        </md-input-item>
      </md-field>
      <div class="btn-box">
        <md-button @click="register">点击注册</md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginName: '',
      loginPass: '',
      Email: '',
    };
  },
  methods: {
    async register() {
      if (this.loginName === '') this.$Toast.failed('请输入用户名');
      else if (this.loginPass === '') this.$Toast.failed('请输入密码');
      else if (this.Email === '') this.$Toast.failed('请输入邮箱');
      else {
        await this.axios.post(
          '/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/Register',
          `loginName=${this.loginName}&loginPass=${this.loginPass}&Email=${
            this.Email
          }`,
        );
        this.$router.go(-1);
      }
    },
  },
};
</script>
