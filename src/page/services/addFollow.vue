<style scoped lang="postcss">
.notice {
  font-size: 24px;
  padding: 0 30px;
  margin: 20px 0;
}
.btn-box {
  padding: 0 30px;
}
</style>
<template>
  <div>
    <s-header title="添加关注"></s-header>
    <div class="s-header">
      <md-field>
        <md-input-item placeholder="老人身份证" v-model="PersonIDNumber"></md-input-item>
        <md-input-item placeholder="老人姓名" v-model="PersonName"></md-input-item>
        <md-input-item placeholder="与本人关系" v-model="Relations"></md-input-item>
      </md-field>
      <p class="notice">
        温馨提示：机构老人家属请关注机构养老平台老人，居家老人家属请关注居家养老平台老人。
      </p>
      <div class="btn-box">
        <md-button @click="add">添加</md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      PersonName: '',
      PersonIDNumber: '',
      Relations: '',
    };
  },
  methods: {
    async add() {
      if (this.PersonName === '') this.$Toast.failed('请输入老人身份证');
      else if (this.PersonIDNumber === '') this.$Toast.failed('请输入老人姓名');
      else if (this.Relations === '') this.$Toast.failed('请输入与本人关系');
      else {
        try {
          if (!window.localStorage.userInfo) {
            this.$Toast.failed('请登陆后再添加关注');
          } else {
            const user = JSON.parse(window.localStorage.userInfo) || null;
            const params = {
              LoginName: user.LoginName,
              PersonName: this.PersonName,
              PersonIDNumber: this.PersonIDNumber,
              Relations: this.Relations,
            };
            const res = await this.axios({
              url:
                '/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/SaveAttention',
              method: 'post',
              data: `attentionInfo=${JSON.stringify(params)}&isDefault=0`,
            });
            if (res.statusCode === 8000) {
              this.$router.go(-1);
            }
          }
        } catch (err) {
          console.warn(err);
        }
      }
    },
  },
};
</script>
