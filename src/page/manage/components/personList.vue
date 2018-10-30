<template>
  <div class="content" @click="defaultMethods">
    <ul>
      <li v-for="item in listData" :key="item.PersonID" @click="clickItem(item)">{{item.Relations}}：{{item.Name}}</li>
    </ul>
    <p @click="goFocus">
      <span class="add">+</span>添加家属
    </p>
  </div>
</template>
<script>
import { getPersonList } from '@/api/index';
import { urlEncode } from '@/utils/utils';

export default{
  data() {
    return {
      listData: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    async getPerson() {
      const user = JSON.parse(window.localStorage.userInfo);
      const params = {
        userName: user.LoginName,
        isWeiXin: false,
      };
      const res = await this.axios.get(
        `/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/GetAttention?${urlEncode(params)}`,
      );
      this.listData = res.data;
    },
    clickItem(info) {
      this.$emit('chooseItem', info);
    },
    defaultMethods(e) {
      const ev = window.event || e;
      ev.stopPropagation();
    },
    goFocus() {
      window.location.href = '#/addFollow';
    },
  },
  mounted() {
    this.getPerson();
  },
};
</script>
<style lang="postcss" scoped>
  .content{
    width:380px;
    height:400px;
    background: white;
    border: 1px solid #dcdcdc;
    box-shadow: 2px 2px 2px #dcdcdc;
  }
  .content>p{
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #f2f2f2;
  }
  .content .add{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: red;
    color:white;
    display: inline-block;
    margin-right: 20px;
    line-height: 40px;
    text-align: center;
  }
  .content ul{
    height: 360px;
    overflow:auto;
    padding: 0px 15px;
    -webkit-overflow-scrolling: touch;
  }
  .content ul>li{
    padding: 15px 0;
    position: relative;
  }
  .content ul>li:active{
    background: #f2f2f2;
  }
  .content ul>li:after{
    content: '';
    width: 100%;
    height: 1px;
    background: #dcdcdc;
    position: absolute;
    left:0;
    bottom: 0;
    transform: scaleY(0.5);
  }
</style>
