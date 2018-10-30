<style scoped lang="postcss">
.top {
  width: 100%;
}
.icon {
  width: 30px;
}
.next {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 30px;
  margin: 30px 0;
  & .left {
    color: var(--mainColor);
  }
  & .right {
    color: #333;
  }
}
.btn-box {
  padding: 0 30px;
}
</style>
<template>
  <div>
    <s-header title="用户登录"></s-header>
    <div class="s-header">
      <img src="/static/img_jujia_top.png" alt="" class="top">
      <md-field>
        <md-input-item placeholder="请输入用户名" v-model="userName">
          <img src="/static/ic_user.png" alt="" class="icon" slot="left">
        </md-input-item>
        <md-input-item placeholder="请输入密码" v-model="userPass" type="password">
          <img src="/static/ic_pwd.png" alt="" class="icon" slot="left">
        </md-input-item>
      </md-field>
      <p class="next">
        <router-link to="/center/register" class="left">新用户注册</router-link>
        <!-- <router-link to="/center/forget" class="right">忘记密码</router-link> -->
      </p>
      <div class="btn-box">
        <md-button @click="login">登录</md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      userPass: '',
    };
  },
  methods: {
    async login() {
      if (this.userName === '') this.$Toast.failed('请输入用户名');
      else if (this.userPass === '') this.$Toast.failed('请输入密码');
      else {
        try {
          const res = await this.axios.post(
            '/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/Login',
            `userName=${this.userName}&userPass=${this.userPass}`,
          );
          window.localStorage.setItem('userInfo', JSON.stringify(res.data[0]));
          this.$router.go(-1);
        } catch (err) {
        }
      }
    },
  },
};
</script>
