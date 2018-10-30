<style scoped lang="postcss">
.btn-box{
  margin-top: 30px;
  padding:0 30px;
}
</style>
<template>
  <div>
    <s-header title="修改密码">
    </s-header>
    <div class="s-header">
      <md-field>
        <md-input-item name="password" title="原始密码:" placeholder="" :maxlength="99" v-model="oldPass" type="password"></md-input-item>
        <md-input-item name="password" title="新密码:" placeholder="请输入新密码" :maxlength="99" v-model="newPass" type="password"></md-input-item>
        <!-- <md-input-item name="password" title="再次输入:" placeholder="" :maxlength="99"></md-input-item> -->
      </md-field>
      <div class="btn-box">
        <md-button @click="save">确定</md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      // LoginPass
      oldPass: '',
      newPass: '',
    };
  },
  methods: {
    async save() {
      if (this.newPass === '') {
        this.$Toast.failed('请输入新密码');
      } else if (this.oldPass !== this.userInfo.LoginPass) {
        this.$Toast.failed('原始密码不正确');
      } else {
        this.userInfo.LoginPass = this.newPass;
        await this.axios.post(
          '/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/SaveUserInfo',
          `userInfo=${JSON.stringify(this.userInfo)}&userImg=`,
        );
        window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.$router.go(-1);
      }
    },
  },
};
</script>
