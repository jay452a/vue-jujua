<style scoped lang="postcss">
</style>
<template>
  <div>
    <s-header title="修改邮箱">
      <span slot="right" @click="save">保存</span>
    </s-header>
    <div class="s-header">
      <md-field>
        <md-input-item name="email" v-model="userInfo.Email" title="邮箱:" placeholder="请输入邮箱" :maxlength="99"></md-input-item>
      </md-field>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    };
  },
  methods: {
    async save() {
      if (this.userInfo.Email === '') {
        this.$Toast.failed('请输入邮箱');
      } else {
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
