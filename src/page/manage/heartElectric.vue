<template>
  <div class="content">
    <s-header title="心电">
    </s-header>
    <div class="s-header s-action-bar">
      <p class="title"><img src="~@/assets/images/icon_60_history.png" class="icon"/>测量时间：{{time}}</p>
    </div>
    <div class="bottom" id="wrapper" ref="wrapper">
      <img :src="imgUrl">
    </div>
  </div>
</template>
<script>
  import { getHeartElectronic } from '@/api';
  import BScroll from 'better-scroll';

  export default {
      data() {
          return {
            imgUrl: "",
            time: '' || '暂无记录'
          }
      },
      components: {
      },
      methods: {
          getData() {
              const params = {
                  idCode:window.sessionStorage.personIndentify
              }
            getHeartElectronic(params).then(res => {
                if(res && res[0]) {
                  this.imgUrl = res[0].REMARK
                  this.time = res[0].CreateDate
                }else{
                    this.$Toast.failed('暂无记录')
                }
            }, err => {
              this.$Toast.failed(err)
            })
          }
      },
    created() {
          this.getData()
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          zoom: {
            start: 1,
            min: 1,
            max: 2
          },
          scrollY: true,
          scrollX: true,
          pullUpLoad: {
            threshold: -50,
          },
        })
      });
    }
  }
</script>
<style lang="postcss" scoped>
  .icon{
    vertical-align: middle;
    position: relative;
    top:-3px;
  }
  .title{
    padding-top:10px;
    padding-bottom: 10px;
    width: 95%;
    margin:  auto;
    border-bottom: 1px solid #dcdcdc;
  }
  .content{
    height: 100vh;
    background: white;
    overflow: auto;
  }
  .bottom{
    position: absolute;
    left:0;
    right: 0;
    top:180px;
    bottom: 0;
    z-index: 10;
    background: white;
    overflow: hidden;
    padding-top: 20px;
  }
</style>

