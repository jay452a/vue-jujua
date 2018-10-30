<template>
  <div class="content">
    <s-header title="体温">
    </s-header>
    <div class="s-header s-action-bar">
      <div class="top">
        <span class="circle">
          <span class="inner">
            <p>{{temperature}}</p>
            <p>{{status}}</p>
          </span>
        </span>
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
import HistoryList from '@/components/historyList';
import BScroll from 'better-scroll';
import { getHealthData } from '@/api/index';
import {Toast} from 'mand-mobile'

export default {
  data() {
    return {
      temperature: '',
      status: '',
      testTime: '',
      listData: [
        /*{ param: '36.6℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常1' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常1' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常1' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常1' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常1' },
        { param: '36.7℃', testTime: '2018-3-12: 19:00:00', status: '正常1' },*/
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
        dataType: 1,
        idCode: window.sessionStorage.personIndentify,
      }
      getHealthData(params).then(res => {
        if (!res) {
          this.nomore = true;
          this.loadingData = false;
          return;
        }
        if (res && res.length < this.pageSize) {
          this.nomore = true;
          this.loadingData = false;
        }
        if(this.pageNo === 1) {
          this.temperature = res[0].Temp + '℃'
          this.status = res[0].JudgeResult
          this.testTime = res[0].CreateDate
        }
        const data = []
        res.map(res => {
          data.push({ param: {temp: `${res.Temp}℃`}, testTime: res.CreateDate, status: res.JudgeResult})
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
        if (this.nomore && !this.loadingData) {
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
  watch: {
    listData() {
    },
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
    left:50%;
    top:50%;
    margin-top: -170px;
    margin-left: -150px;
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
    font-size: 40px;
    display: block;
    width: 100%;
    text-align: center;
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
