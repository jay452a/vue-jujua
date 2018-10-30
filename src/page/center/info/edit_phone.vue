<style scoped lang="postcss">
</style>
<template>
  <div>
    <s-header title="修改电话">
      <span slot="right" @click="save">保存</span>
    </s-header>
    <div class="s-header">
      <md-field>
        <md-input-item name="phone" title="电话:" v-model="userInfo.MobilePhone" placeholder="请输入电话号码" :maxlength="11"></md-input-item>
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
      if (this.userInfo.MobilePhone === '') {
        this.$Toast.failed('请输入电话号码');
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
