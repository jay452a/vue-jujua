<style scoped lang="postcss">
.icon {
  width: 30px;
}
.btn-box{
  margin-top: 30px;
  padding:0 30px;
}
</style>
<template>
  <div>
    <s-header title="忘记密码"></s-header>
    <div class="s-header">
      <md-field>
        <md-input-item placeholder="请输入用户名">
          <img src="/static/ic_user.png" alt="" class="icon" slot="left">
        </md-input-item>
      </md-field>
      <div class="btn-box">
        <md-button>点击提交，新密码将发送至注册邮箱</md-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
