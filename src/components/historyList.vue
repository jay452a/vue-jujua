<template>
  <div>
    <p><img src="~@/assets/images/icon_60_history.png" class="icon"/>{{title}}</p>
    <ul>
      <li v-for="(item,index) in data" :key="index">
        <p v-for="value in item.param">{{value}}</p>
        <p class="time">{{item.testTime}}</p>
        <span :style="{color:rightColor}">{{item.status}}</span>
      </li>
    </ul>
    <slot name="loadmore"></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '历史记录',
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    rightColor: {
      type: String,
      default: '#20e079',
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="postcss" scoped>
.icon{
  vertical-align: middle;
  position: relative;
  top:-3px;
  margin-left: -15px;
}
  ul li{
   position: relative;
   padding: 30px 0;
 }
 ul li>p.time{
   color: #8c8c8c;
   font-size: 26px;
 }
 ul li>span{
   position: absolute;
   height: 100%;
   right: 0;
   bottom: 0;
   display: flex;
   align-items:center;
 }
 ul li:after{
   content: '';
   width: 100%;
   height:1px;
   background: #dcdcdc;
   position: absolute;
   left:0;
   bottom:0;
   transform: scaleY(0.5);
   -webkit-transform: scaleY(0.5);
   -ms-transform: scaleY(0.5);
   -moz-transform: scaleY(0.5);
   -o-transform: scaleY(0.5);
 }
</style>
