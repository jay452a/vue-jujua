<style scoped lang="postcss">
.avatar {
  width: 120px;
  align-self: center;
  border-radius: 100%;
}
.btn-box {
  padding: 0 30px;
}
</style>
<template>
  <div>
    <s-header title="个人信息"></s-header>
    <div class="s-header">
      <md-field>
        <md-field-item title="头像" arrow="arrow-right" value="" solid align="right">
          <img src="@/assets/avatar.png" alt="" class="avatar">
        </md-field-item>
        <md-field-item title="用户名" :value="userInfo.LoginName" solid align="right"></md-field-item>
        <md-field-item title="邮箱" arrow="arrow-right" :value="userInfo.Email" solid align="right" @click="to('info/editEmail')"></md-field-item>
        <md-field-item title="性别" arrow="arrow-right" :value="userInfo.Sex" solid align="right" @click="sexSheetShow = true"></md-field-item>
        <md-field-item title="电话" arrow="arrow-right" :value="userInfo.MobilePhone" solid align="right" @click="to('info/editPhone')"></md-field-item>
        <md-field-item title="修改密码" arrow="arrow-right" value="修改" solid align="right" @click="to('info/editPassword')"></md-field-item>
      </md-field>
    </div>
    <div class="btn-box">
      <md-button @click="exit">退出登陆</md-button>
    </div>
    <md-action-sheet v-model="sexSheetShow" title="修改性别" :options="sexOptions" @selected="sexSelected"></md-action-sheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      sexSheetShow: false,
      sexOptions: [
        {
          label: '男',
          value: '男',
        },
        {
          label: '女',
          value: '女',
        },
      ],
    };
  },
  methods: {
    to(path) {
      this.$router.push(path);
    },
    exit() {
      localStorage.removeItem('userInfo');
      this.$router.go(-1);
    },
    async sexSelected(e) {
      this.userInfo.Sex = e.value;
      await this.axios.post(
        '/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/SaveUserInfo',
        `userInfo=${JSON.stringify(this.userInfo)}&userImg=`,
      );
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    },
  },
};
</script>
