<style scoped lang="postcss">
@import url("../../assets/css/index_box.css");
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
  background-color: var(--mainColor);
  & .info-box {
    & .avatar {
      width: 150px;
      border-radius: 100%;
    }
    & .name {
      text-align: center;
      color: #fff;
      margin-top: 10px;
    }
  }
}
.box2 {
  margin-top: 20px;
}
.title{
  font-size: 28px;
  color:#333;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:20px 30px;
  & .right {
    display: inline-flex;
    align-items:center;
    & .arrow{
      display: block;
      width: 16px;
      height: 16px;
      border-right:1px solid #ccc;
      border-bottom:1px solid #ccc;
      transform: rotate(-45deg);
    }
  }
}
</style>
<template>
  <div>
    <div class="s-action-bar">
      <div class="info">
        <div class="info-box" @click="toInfo">
          <img src="@/assets/avatar.png" alt="" class="avatar">
          <p class="name" v-if="userInfo">{{userInfo.LoginName}}</p>
          <p class="name" v-else>登陆</p>
        </div>
      </div>
      <p class="title">
        <span>我的订单</span>
        <span class="right" @click="stand">查看全部订单 <i class="arrow"></i></span>
      </p>
      <div class="box">
        <div class="item r" @click="stand">
          <img src="/static/yxd.png" alt="">
          <span>已下单</span>
        </div>
        <div class="item r" @click="stand">
          <img src="/static/yfp.png" alt="">
          <span>已分配</span>
        </div>
        <div class="item r" @click="stand">
          <img src="/static/dpj.png" alt="">
          <span>待评价</span>
        </div>
        <div class="item" @click="stand">
          <img src="/static/ywc.png" alt="">
          <span>已完成</span>
        </div>
      </div>
      <div class="box box2">
        <div class="item r" @click="toInfo">
          <img src="/static/grxx.png" alt="">
          <span>个人信息</span>
        </div>
        <div class="item r" @click="stand">
          <img src="/static/jylr.png" alt="">
          <span>家有老人</span>
        </div>
        <div class="item r" @click="stand">
          <img src="/static/gysz.png" alt="">
          <span>关于设置</span>
        </div>
        <div class="item" @click="stand">
          <img src="/static/xzfx.png" alt="">
          <span>下载分享</span>
        </div>
      </div>
    </div>
    <s-action-bar></s-action-bar>
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
    stand() {
      this.$Toast.info('功能维护，暂未开放');
    },
    toInfo() {
      if (this.userInfo) {
        this.$router.push('/center/info');
      } else {
        this.$router.push('/center/login');
      }
    },
  },
};
</script>
