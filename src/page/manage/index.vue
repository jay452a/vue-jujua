<style scoped lang="postcss">
@import url("../../assets/css/index_box.css");
  .addPerson{
    width: 50px;
  }
  .personList{
    position: absolute;
    right: 0;
    top:92px;
  }
</style>
<template>
  <div>
    <s-header title="健康管理" noBack>
      <img slot="left" src="~@/assets/back.svg" style="width: 22px" @click="backHome">
      <a slot="right" @click="addPerson"><img src="~@/assets/images/person.png" class="addPerson"/></a>
    </s-header>
    <div class="s-header s-action-bar">
      <div class="box">
        <div class="item t r b" @click="toOtherPage('#/manage/temperature')"><img src="~@/assets/images/icon/temperatrue.png"/><p>体温</p></div>
        <div class="item t r b" @click="toOtherPage('#/manage/bloodPressure')"><img src="~@/assets/images/icon/bloodPressure.png"/><p>血压</p></div>
        <div class="item t r b" @click="toOtherPage('#/manage/bloodSugar')"><img src="~@/assets/images/icon/bloodSugar.png"/><p>血糖</p></div>
        <div class="item t b" @click="toOtherPage('#/manage/bloodO2')"><img src="~@/assets/images/icon/bloodO2.png"/><p>血氧</p></div>
        <div class="item r b" @click="toOtherPage('#/manage/pulse')"><img src="~@/assets/images/icon/heartRate.png"/><p>脉率/心率</p></div>
        <div class="item r b" @click="toOtherPage('#/manage/heartElectric')"><img src="~@/assets/images/icon/heartElectric.png"/><p>心电</p></div>
        <div class="item r b" @click="toOtherPage('#/manage/heightAndWeight')"><img src="~@/assets/images/icon/bmi.png"/><p>身高体重</p></div>
        <div class="item b" @click="toOtherPage('#/manage/routineUrineTest')"><img src="~@/assets/images/icon/routineUrineTest.png"/><p>尿常规</p></div>
        <div class="item r" @click="toOtherPage('#/manage/routineBloodTest')"><img src="~@/assets/images/icon/routineBloodTest.png"/><p>血常规</p></div>
        <!--<div class="item r" @click="toOtherPage()">护理记录</div>
        <div class="item r" @click="toOtherPage()">慢病干预</div>-->
      </div>
    </div>
    <s-action-bar></s-action-bar>
    <PersonList class="personList" v-show="showChosePerson" @chooseItem="getPerson"></PersonList>
  </div>
</template>
<script>
import PersonList from './components/personList.vue';

export default {
  data() {
    return {
      showChosePerson: false,
    };
  },
  components: {
    PersonList,
  },
  methods: {
    toOtherPage(url, e) {
      const ev = window.event || e;
      ev.stopPropagation();
      if (!window.sessionStorage.personIndentify && !this.showChosePerson) {
        this.showChosePerson = true;
        this.$Toast.info('请先选择家属');
        return;
      }
      if (!window.sessionStorage.personIndentify && this.showChosePerson) {
        this.showChosePerson = false;
        return;
      }
      window.location.href = url;
    },
    addPerson(e) {
      const ev = window.event || e;
      ev.stopPropagation();
      this.showChosePerson = !this.showChosePerson;
    },
    getPerson(data) {
      window.sessionStorage.personIndentify = data.IDNumber
      this.showChosePerson = false
    },
    backHome() {
      window.location.href = 'http://60.255.48.152:8008/#/Home'
    }
  },
  mounted() {
    const _this = this;
    document.onclick = function () {
      _this.showChosePerson = false;
    };
  },
};
</script>
