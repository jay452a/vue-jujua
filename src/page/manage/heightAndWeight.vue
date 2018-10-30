<template>
  <div class="content">
    <s-header title="身高体重">
    </s-header>
    <div class="s-header s-action-bar">
      <div class="top">
        <span class="circle">
          <span class="inner">
            <p>BMI:{{BMI}}</p>
            <p>{{status}}</p>
          </span>
        </span>
        <div class="detail">
          <p>身高：{{height}}</p>
          <p>体重：{{weight}}</p>
          <p>腰围：{{waist}}</p>
        </div>
        <p class="testTime">测量时间：{{testTime}}</p>
      </div>
      <div class="bottom" id="wrapper" ref="wrapper">
        <!-- content goes here -->
        <HistoryList title="历史记录" :data="listData" class="list" id="list">
          <p ref="loading" class="progress-box" slot="loadmore">
            <i class="progress roate" v-show="loadingData && !nomore"></i>
            <span class="text" v-show="loadingData && !nomore">加载数据中....</span>
            <span class="text nomore" v-show="nomore">没有更多了</span>
          </p>
        </HistoryList>
      </div>
    </div>
  </div>
</template>
<script>
import HistoryList from './components/heightAndWeightHistory-component';
import BScroll from 'better-scroll';
import { getHealthData } from '@/api/index';
import {Toast} from 'mand-mobile';

export default {
  data() {
    return {
      BMI: '',
      status: '',
      testTime: '',
      height: '',
      weight: '',
      waist: '',
      listData: [
       /* { param: { height: '178cm', weight: '78kg', BMI: '23.5', waist: '78cm' }, testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: { height: '178cm', weight: '78kg', BMI: '23.5', waist: '78cm' }, testTime: '2018-3-12: 19:00:00', status: '正常' },*/
      ],
      loadingData: false,
      nomore: false,
      pageNo: 1,
      pageSize: 10,
    };
  },
  components: {
    HistoryList,
  },
  methods: {
    loadData() {
      const params = {
        currentPage: this.pageNo,
        pageSize: this.pageSize,
        dataType: 6,
        idCode: window.sessionStorage.personIndentify,
      }
      getHealthData(params).then(res => {
        console.log(res)
        if(!res) {
          this.nomore = true
          this.loadingData = false
          return
        }
        if(res&&res.length < this.pageSize) {
          this.nomore = true
          this.loadingData = false
        }
        if(this.pageNo === 1) {
          this.BMI = res[0].BMI
          this.height = res[0].Height + 'cm'
          this.weight = res[0].Weight + 'kg'
          this.waist = res[0].WaistLine + 'cm'
          this.status = res[0].JudgeResult
          this.testTime = res[0].CreateDate
        }
        const data = []
        res.map(res => {
          data.push({ param: {height:`${res.Height}cm`, weight: `${res.Weight}kg`, BMI: res.BMI, waist: `${res.WaistLine}cm`}, testTime: res.CreateDate, status: res.JudgeResult})
        })
        this.listData.push(...data)
      }, err => {
        Toast.failed(err)
      })
    },
  },
  mounted() {
    this.loadData();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        pullUpLoad: {
          threshold: -50,
        },
      })
      this.scroll.on('scrollEnd', (pos) => {
        if( this.nomore&&!this.loadingData) {
          return
        }
        const height = document.getElementById('list').clientHeight
        const heightBottom = document.getElementById('wrapper').clientHeight
        if (heightBottom - height >= pos.y) {
          this.loadingData = true
          this.pageNo++
          this.loadData();
        }
      });
    });
  },
};
</script>
<style lang="postcss" scoped>
  .top{
    height:450px;
    width: 100%;
    background: white;
    position: relative;
  }
  .top>.detail{
    position: absolute;
    right: 15%;
    top:100px;
  }
  .top>.detail>p{
    margin: 15px 0;
  }
  .top>p.testTime{
    position: absolute;
    left:0;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: #8c8c8c;
  }
  .top>span.circle{
    display: inline-block;
    width: 300px;
    height:300px;
    border: 1px solid #dcdcdc;
    position: absolute;
    left:10%;
    top:50%;
    margin-top: -170px;
    border-radius: 50%;
  }
  .top>span.circle>.inner{
    width: 280px;
    height: 280px;
    position: relative;
    left:10px;
    top:10px;
    display: inline-block;
    background: #20e079;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items:center;
    align-content:center;
    flex-wrap: wrap;
  }
  .top>span.circle>.inner>p{
    color: white;
    font-weight: 500;
    font-size: 36px;
    display: block;
    width: 100%;
    text-align: center;
    margin: 15px 0;
  }

  .bottom{
    width: 100%;
    margin: 20px auto;
    background: white;
    height: calc(100vh - 92px - 450px - 20px);
    overflow: hidden;
  }

  .bottom .list{
    width: 95%;
    margin-left: 2.5%;
    padding-top: 10px;
    margin-bottom: 20px;
  }
  .content{
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    overflow-y: hidden;
  }
  .progress-box {
    text-align: center;
    padding: 30px 0;
    color: #dedede;
    font-size: 28px;
    display: flex;
    align-self: center;
    justify-content: center;
  & > .progress {
        display: inline-block;
        width: 32px;
        height: 32px;
        border: 2px solid #dedede;
        border-right-color: transparent;
        border-radius: 100%;
        margin-right: 20px;
        animation: rotate 0.6s linear infinite;
      }
  & > .text.nomore {
        position: relative;
  &::after,
  &::before {
     content: "";
     border-top: 1px solid #dedede;
     display: block;
     position: absolute;
     width: 220px;
   }
  &::after {
     right: -236px;
     top: 22px;
   }
  &::before {
     left: -236px;
     top: 22px;
   }
  }
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotateZ(360deg);
      transform: rotateZ(360deg);
      -moz-transform: rotate(360deg);
    }
  }
</style>
