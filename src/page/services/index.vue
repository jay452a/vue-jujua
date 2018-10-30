<style scoped lang="postcss">
.top-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  & header {
    position: relative;
  }
  & .filters {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & .item {
      flex: 0 0 33.33%;
      padding: 20px 0;
      text-align: center;
      font-size: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      &.r {
        border-right: 0.5px solid #e3e3e3;
      }
      &.b {
        border-bottom: 0.5px solid #e3e3e3;
      }
    }
  }
}
.arrow {
  width: 0;
  height: 0;
  border-left: 8.66px solid transparent;
  border-right: 8.66px solid transparent;
  border-top: 10px solid #ccc;
  margin-left: 10px;
}
.list {
  background-color: #f3f4f5;
  & .item {
    background-color: #fff;
    display: flex;
    padding: 10px;
    margin-bottom: 20px;
    & img.left {
      width: 150px;
      height: 150px;
      border-radius: 100%;
    }
    & .right {
      flex: 1;
      margin-left: 14px;
      & p {
        color: #666;
        font-size: 24px;
        display: flex;
        align-items: center;
        line-height: 1;
        padding: 3px 0;
      }
      & .qual {
        & .score {
          position: relative;
          background-color: #fff;
          color: #ccc;
          display: inline-block;
          z-index: 2;
          & .after {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #fff;
            color: #f00;
            z-index: 3;
            display: block;
            position: absolute;
            overflow: hidden;
          }
        }
      }
      & .title {
        color: #333;
        font-size: 26px;
        justify-content: space-between;
        & .color {
          color: var(--mainColor);
        }
      }
      & .icon {
        width: 24px;
        margin-right: 8px;
      }
    }
  }
}
.s-header {
  margin-top: 167px;
}
.pop-box {
  background-color: #fff;
  font-size: 28px;
  & .row {
    display: flex;
    align-items: center;
    padding: 10px;
    position: relative;
    & .title {
      color: var(--mainColor);
    }
    & .value {
      color: #333;
      flex: 1;
    }
    & input[type="text"] {
      width: 100%;
      border: none;
      border-bottom: 1px solid #b2b2b2;
    }
  }
}
.btm-arrow {
  margin-left: 5px;
  position: relative;
  &::after,
  &::before {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-left: 1px solid var(--mainColor);
    border-bottom: 1px solid var(--mainColor);
    transform: rotate(-45deg);
  }
  &::before {
    top: 10px;
  }
}
.personList {
  position: absolute;
  left: 380px;
  top: 0;
  z-index: 1;
}
</style>
<template>
  <div>
    <div class="top-box" ref="topBox">
      <s-header title="健康养老">
        <span slot="right" @click="serviceObjectShow=!serviceObjectShow">
          服务对象
        </span>
      </s-header>
      <div class="pop-box" v-show="serviceObjectShow">
        <div class="row">
          <span class="title">老人姓名：</span>
          <span class="value" @click="showPersonList = !showPersonList">{{personName}}
            <i class="btm-arrow"></i>
          </span>
          <person-list class="personList" v-show="showPersonList" @chooseItem="chooseOlder"></person-list>
        </div>
        <div class="row">
          <span class="title">所在地区：</span>
          <span class="value" @click="districtShow = true;showPersonList = false">{{CommunityText}}
            <i class="btm-arrow"></i>
          </span>
        </div>
        <div class="row">
          <span class="title">详细地址：</span>
          <span class="value">
            <input type="text" v-model="personAddress" @focus="showPersonList = false">
          </span>
        </div>
      </div>
      <div class="filters">
        <label class="item r b" @click="stand">
          <span>生活照料</span>
          <i class="arrow"></i>
        </label>
        <label class="item r b" @click="priceShow=true">
          <span>价格</span>
          <i class="arrow"></i>
        </label>
        <label class="item r b" @click="mydShow=true">
          <span>满意度</span>
          <i class="arrow"></i>
        </label>
      </div>
    </div>
    <loadmore class="s-header" ref="loadmore" :style="{'margin-top':computeHeight}" @pullingUp="getSerivceItemByCommunityID" nomoreText="没有更多服务">
      <div class="list">
        <div class="item" v-for="n in list" :key="n.ItemID" @click="stand">
          <img :src="`${$baseUrl}/WSDL_HBC_HomeServiceManage/UploadFiles/ServiceItem/${n.Img}`" alt="" class="left">
          <div class="right">
            <p class="title">
              <span class="name">{{n.ItemName}}</span>
              <span class="price">
                <span class="color">{{n.Price}}</span>元/{{n.ChargeUnit}}</span>
            </p>
            <p class="qual">服务质量：
              <span class="score">
                ★★★★★
                <span class="after" :style="{'width':`${parseFloat(n.Satisfaction)*20}%`}">★★★★★</span>
              </span>
            </p>
            <p class="num">服务销量：{{n.SalesVolume}}{{n.ChargeUnit}}</p>
            <p class="time"><img class="icon" src="/static/ic_merchant_time.png">最低服务市场：{{n.MinHours}}分钟</p>
            <p class="company"><img class="icon" src="/static/ic_merchant_name.png">{{n.CompanyName}}</p>
          </div>
        </div>
      </div>
    </loadmore>
    <md-action-sheet v-model="priceShow" :options="priceOptions" @selected="clickItem($event,'price')" :default-index="0"></md-action-sheet>
    <md-action-sheet v-model="mydShow" :options="mydOptions" @selected="clickItem($event,'myd')" :default-index="0"></md-action-sheet>
    <md-picker v-model="districtShow" @confirm="pickerConfirm" :data="districtData" :cols="3" is-cascade></md-picker>
  </div>
</template>
<script>
import personList from '@/page/manage/components/personList';

export default {
  components: {
    'person-list': personList,
  },
  data() {
    return {
      currentPage: 1,
      personName: '选择居家老人',
      personAddress: '',
      CommunityText: '',
      showPersonList: false,
      districtShow: false,
      serviceObjectShow: false,
      priceShow: false,
      mydShow: false,
      priceOptions: [
        { label: '价格由高到低', value: 1 },
        { label: '价格由低到高', value: 2 },
      ],
      mydOptions: [
        { label: '按销量由高到低', value: '按销量' },
        { label: '按评价由高到低', value: '按评价' },
      ],
      districtData: [[]],
      list: [],
      computeHeight: '',
      strPriceSort: '1',
      strSatisfactionSort: '按销量',
    };
  },
  watch: {
    async serviceObjectShow(val) {
      if (val) {
        await this.$nextTick();
        this.computeHeight = getComputedStyle(this.$refs.topBox).height;
      } else {
        this.computeHeight = '';
      }
    },
  },
  methods: {
    stand() {
      this.$Toast.info('功能维护，暂未开放');
    },
    clickItem(e, b) {
      if (b === 'price') {
        this.strPriceSort = e.value;
      } else if (b === 'myd') {
        this.strSatisfactionSort = e.value;
      }
      this.currentPage = 1;
      this.list = [];
      this.getSerivceItemByCommunityID();
    },
    chooseOlder(e) {
      this.showPersonList = false;
      this.personName = e.Name;
      this.personAddress = e.HouseHoldRegisterAddr;
      this.CommunityText = `${e.CityShow} ${e.AreaShow} ${e.StreetShow} ${
        e.CommunityShow
      }`;
    },
    async init() {
      // GetDistrictListByCityName
      const res = await this.axios.get(
        '/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/GetDistrictListByCityName?strCityName=绵阳市',
      );
      res.data.forEach((el, index) => {
        this.districtData[0].push({
          label: el.DistName,
          value: el.ID,
          children: [],
        });
        this.GetStreetList(el.ID, index);
      });
    },
    async GetStreetList(districtId, districtIndex) {
      const res = await this.axios.get(
        `/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/GetStreetList?strDistrictID=${districtId}`,
      );
      if (res.data.length !== 0) {
        res.data.forEach((el, index) => {
          this.districtData[0][districtIndex].children.push({
            label: el.StreetName,
            value: el.ID,
            children: [],
          });
          this.GetCommunityList(el.ID, index, districtIndex);
        });
      }
    },
    async GetCommunityList(streetId, streetIndex, districtIndex) {
      const res = await this.axios.get(
        `/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/GetCommunityList?strStreetID=${streetId}`,
      );
      if (res.data.length !== 0) {
        res.data.forEach((el) => {
          this.districtData[0][districtIndex].children[
            streetIndex
          ].children.push({
            label: el.CommunityName,
            value: el.CommunityCode,
          });
        });
      }
    },
    // pickerChange(a, b, c, d) {
    //   console.log(a, b, c, d);
    // },
    pickerConfirm(e) {
      this.CommunityText = '';
      e.forEach((el) => {
        if (el) this.CommunityText = `${this.CommunityText} ${el.label}`;
      });
    },
    async getSerivceItemByCommunityID() {
      const res = await this.axios.get(
        `/WSDL_HBC_HomeServiceManage/WS/Mobile/WS_AppService.asmx/GetSerivceItemByCommunityID?currentPage=${this.currentPage}&itemName=&pageSize=10&strCommunityID=&strPriceSort=${
          this.strPriceSort
        }&strSatisfactionSort=${this.strSatisfactionSort}&strTypeSort=生活照料`,
      );
      this.list = this.list.concat(res.data);
      if (res.data.length < 10) {
        this.$refs.loadmore.endUpLoading(true);
      }
      this.currentPage += 1;
    },
  },
  mounted() {
    this.init();
    this.getSerivceItemByCommunityID();
  },
};
</script>
