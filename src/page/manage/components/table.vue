<template>
  <div>
    <div class="head">
      <ul class="title">
        <li v-for="value in title" :key="value">{{value}}</li>
      </ul>
    </div>
     <ul class="row" v-for="(item,index) in data" :key="index">
      <li v-for="value in item" :key="value">{{value}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: Object,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="postcss" scoped>
.head{
  background: #f2f4f3;
}
ul.title{
  width: 90%;
  margin: auto;
}
ul.title,ul.row{
  display: flex;
  list-style: none;
}
ul.row{
  background: white;
  width: 90%;
  margin: auto;
}
ul.title>li,ul.row>li{
  flex: 1;
  padding: 20px 0;
  position: relative;
  font-size: 26px;
}
ul.row>li:first-child,ul.title>li:first-child{
  text-align: left;
}
ul.row>li:last-child,ul.title>li:last-child{
  text-align: right;
}
ul.row>li:after{
  position: absolute;
  content: "";
  width: 100%;
  height: 1px;
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
