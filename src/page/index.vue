<style scoped lang="postcss">
@import url("../assets/css/index_box.css");
.title {
  padding: 10px 15px;
  font-size: 28px;
  display: flex;
  align-items: center;
  color: #8c8c8c;
  background-color: #fff;
  & .title-icon {
    width: 30px;
    margin-right: 10px;
  }
}
.title2 {
  margin-top: 20px;
}
.swiper {
  height: 250px;
  & .swiper-item {
    height: 100%;
    width: 100%;
    display: block;
    background-size: cover;
    background-position: center;
  }
}
</style>
<template>
  <div>
    <s-header title="健康养老" noBack>
      <img slot="left" src="~@/assets/back.svg" style="width: 22px" @click="backHome">
    </s-header>
    <div class="s-header s-action-bar">
      <md-swiper class="swiper">
        <md-swiper-item>
          <a href="javascript:void(0)" class="swiper-item" style="background-image:url('/static/img_jujia_top.png')"></a>
        </md-swiper-item>
      </md-swiper>
      <p class="title"><img src="/static/icon_title_jjfw.png" alt="" class="title-icon">居家服务</p>
      <div class="box">
        <router-link class="item r" tag="div" to="/services/index">
          <img src="/static/shzl.png" alt="">
          <span>生活照料</span>
        </router-link>
        <!-- <div class="item t r b">
          <img src="/static/ylbj.png" alt="">
          <span>医疗保健</span>
        </div>
        <div class="item t r b">
          <img src="/static/jswj.png" alt="">
          <span>精神慰藉</span>
        </div>
        <div class="item t b">
          <img src="/static/flwq.png" alt="">
          <span>法律维权</span>
        </div>
        <div class="item b r">
          <img src="/static/jkgl.png" alt="">
          <span>健康管理</span>
        </div>
        <div class="item b r">
          <img src="/static/kfhl.png" alt="">
          <span>康复护理</span>
        </div>
        <div class="item b r">
          <img src="/static/zyhd.png" alt="">
          <span>志愿活动</span>
        </div>
        <div class="item b">
          <img src="/static/whfw.png" alt="">
          <span>文化服务</span>
        </div> -->
      </div>
      <p class="title title2"><img src="/static/icon_title_aqgj.png" alt="" class="title-icon">安全管家</p>
      <div class="box">
        <div class="item r t b" @click="toOtherPage('#/position')">
          <img src="/static/wzdw.png" alt="">
          <span>位置定位</span>
        </div>
        <div class="item r t b" @click="toOtherPage('#/reviewRound')">
          <img src="/static/gjhf.png" alt="">
          <span>轨迹回放</span>
        </div>
        <div class="item r t b"></div>
        <div class="item l t b"></div>
      </div>
    </div>
    <s-action-bar></s-action-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    toOtherPage(url) {
      window.location.href = url;
    },
    backHome() {
      window.location.href = 'http://60.255.48.152:8008/#/Home'
    }
  },
};
</script>
