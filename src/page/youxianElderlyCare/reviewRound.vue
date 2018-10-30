<template>
  <div>
    <s-header title="轨迹回放">
    </s-header>
    <div class="s-header s-action-bar" style="margin-bottom: 0;position: relative">
      <div id="container"></div>
      <div class="dateTime">
        <input type="text"
               v-model="startTime"
               readonly
               class="date" placeholder="开始日期"
               @click="isDatePickerShow=true;dateTitle='请选择开始日期'"/>
        <input type="text"
               v-model="endTime"
               readonly
               class="date"
               placeholder="结束日期"
               @click="isDatePickerShow=true;dateTitle='请选择结束日期'"/>
        <button class="search" @click="searchBydate">查询</button>
      </div>
      <!--<p class="location">
        <span v-if="isGetLocation">正在定位中...</span>
        <span v-else>家属：{{location}}</span></p>-->
      <ul class="operate">
        <li @click="biger">+</li>
        <li @click="smaller">-</li>
      </ul>
      <ul class="layer">
        <li @click="setLayer(0)"><span :class="{checked:layerType===0}"></span>标准图</li>
        <li @click="setLayer(1)"><span  :class="{checked:layerType===1}"></span>卫星图</li>
        <li @click="setLayer(2)"><span :class="{checked:layerCheck===true}"></span>路线图</li>
      </ul>
      <button class="review" @click="replay">重新播放轨迹</button>
      <md-date-picker
        ref="datePicker"
        v-model="isDatePickerShow"
        type="custom"
        today-text="&(今天)"
        :title="dateTitle"
        :custom-types="['yyyy', 'MM','dd']"
        :default-date="currentDate"
        @confirm="onDatePickerConfirm"
      ></md-date-picker>
    </div>
  </div>
</template>
<script>
import AMap from 'AMap';
import { DatePicker, Toast } from 'mand-mobile';
import { getPositionLine } from '@/api/index';
import { dateTransform } from '@/utils/utils';

export default{
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      isGetLocation: true,
      location: '',
      zoom: 13,
      defaultPosition: [103.729985,30.531848],
      layerType: 0,
      layerCheck: false,
      minDate: new Date('2010/1/1'),
      maxDate: new Date('2050/12/31'),
      currentDate: new Date(),
      isDatePickerShow: false,
      dateTitle: '',
      endTime: '',
      startTime: '',
      /*endTime: dateTransform(new Date()),
      startTime: dateTransform(new Date(new Date().getTime() - 24*60*60*1000)),*/
      pageNo: 1,
      pageSize: 10,
      lineArr: []
    };
  },
  methods: {
    biger() {
      if (this.zoom < 18) {
        this.zoom += 1;
      }
      console.log(this.zoom)
      this.map.setZoomAndCenter(this.zoom);
    },
    smaller() {
      if (this.zoom > 6) {
        this.zoom -= 1;
      }
      this.map.setZoomAndCenter(this.zoom);
    },
    setLayer(type) {
      if (type === 0) {
        this.layerCheck = false;
        this.layerType = 0;
        const TileLayer = new AMap.TileLayer({ zIndex: 10 });
        TileLayer.setMap(this.map);
        this.TileLayer = TileLayer;
        if (this.satellLayer) {
          this.satellLayer.setMap(null);
        }
      } else if (type === 1) {
        this.layerCheck = false;
        this.layerType = 1;
        const satellLayer = new AMap.TileLayer.Satellite({ zIndex: 10 });
        satellLayer.setMap(this.map);
        this.satellLayer = satellLayer;
        if (this.TileLayer) {
          this.TileLayer.setMap(null);
        }
      } else {
        this.layerCheck = !this.layerCheck;
        if (this.layerCheck) {
          const trafficLayer = new AMap.TileLayer.Traffic({ zIndex: 10 });
          trafficLayer.setMap(this.map);
          this.trafficLayer = trafficLayer;
        } else {
          this.trafficLayer.hide();
        }
      }
    },
    searchBydate() {
        this.map.clearMap()
        this.getPositionData().then(res => {
            console.log(res, 'search')
            this.paintRoad(res)
        })
    },
    onDatePickerConfirm(columnsValue) {
      console.log(columnsValue);
      if (this.dateTitle === '请选择开始日期') {
        this.startTime = this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
      } else {
        this.endTime = this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
      }
    },
    async getPositionData() { // 获取轨迹数据
      return new Promise((resolve, reject) => {
        const params = {
          currentPage: this.pageNo,
          pageSize: this.pageSize,
          idCode: window.sessionStorage.personIndentify || '',
          startTime: this.startTime,
          endTime: this.endTime
        }
        getPositionLine(params).then(res => {
          resolve(res)
        }, err => {
          Toast.failed(err)
          reject(err)
        })
      })
    },
    paintRoad(data) {
       Toast.hide()
       if(!data) {
         Toast.failed('未查询到历史轨迹')
         this.lineArr = []
         return
       }
      const icon = new AMap.Icon({
        size: new AMap.Size(30, 40),
        image: require('@/assets/images/icon/location.png'),
        imageSize: new AMap.Size(30, 40),
      });
      const marker = new AMap.Marker({
        map: this.map,
        icon,
        position: new AMap.LngLat(data[0].LONG, data[0].LAT),
        offset: new AMap.Pixel(-15, -20),
        autoRotation: true
      });
      this.map.setZoomAndCenter(this.zoom);
      this.lineArr = []
      data.map(res => {
        /*lineArr.push({
          "lngX": res.LONG,
          "latY": res.LAT,
          "address": res.Address,
          "dTime": res.Time
        })*/
        this.lineArr.push([res.LONG, res.LAT])
      })
      var polyline = new AMap.Polyline({
        map: this.map,
        path: this.lineArr ,
        strokeColor: "#00A",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 3,      //线宽
        // strokeStyle: "solid"  //线样式
      });
      var passedPolyline = new AMap.Polyline({
        map: this.map,
        // path: lineArr,
        strokeColor: "#F00",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 3,      //线宽
        // strokeStyle: "solid"  //线样式
      });
      marker.on('moving',function(e){
        passedPolyline.setPath(e.passedPath);
      })
      this.map.setFitView();
      marker.moveAlong(this.lineArr, 1000);
      this.playMarker = marker
    },
    replay() {
      if(this.lineArr.length === 0) {
        Toast.failed('未查询到历史轨迹')
        return
      }
      this.playMarker.moveAlong(this.lineArr , 1000);
    }
  },
  mounted() {
      this.map = new AMap.Map('container', {
        center: this.defaultPosition,
        zoom: 13,
        zoomEnable: false,
      });
      // 当定位及获取历史轨迹完成之后再渲染历史轨迹
     Toast.loading('正在查询历史轨迹数据')
     this.getPositionData().then(rs => {
        this.paintRoad(rs)
      })

  },
};
</script>
<style lang="postcss" scoped>
  #container{
    width: 100%;
    height: calc(100vh - 92px);
  }
  p.location{
    position: absolute;
    bottom: 150px;
    width: 300px;
    height:100px;
    left:50%;
    margin-left: -150px;
    background: black;
    border-radius: 10px;
    color: white;
    font-size: 26px;
    line-height: 100px;
    text-align: center;
    opacity: 0.7;
  }
  ul.operate{
    position: absolute;
    right: 20px;
    bottom: 40px;
  }
  ul.operate>li{
    width: 100px;
    height:100px;
    text-align: center;
    line-height: 100px;
    font-size: 80px;
    background: white;
    opacity:0.7;
  }
  ul.layer{
    position: absolute;
    top:40px;
    right: 20px;
  }
  ul.layer>li{
    margin: 25px 0;
  }
  ul.layer>li>span{
    width: 36px;
    height: 36px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #000000;
    position: relative;
    left:-10px;
    top:8px;
    position: relative;
  }
  ul.layer>li>span.checked{
    border-color: #00937e;
  }
  ul.layer>li>span.checked:after{
    content: '';
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 4px;
    top:4px;
    background: #00937e;
  }
  ul.layer>li:last-child>span{
    border-radius: 0;
  }
  ul.layer>li:last-child>span.checked:after{
    content: '\2713';
    background: none;
    color: #00937e;
    position: absolute;
    text-align: center;
    line-height: 27px;
  }
  .review{
    position: absolute;
    width: 250px;
    height: 100px;
    bottom: 30px;
    left: 50%;
    margin-left: -125px;
    background: #f1870d;
    border: none;
    outline: none;
    border-radius: 10px;
    color: white;
  }
  .review:active,.search:active{
    background: #fbaa4c;
  }
  .dateTime{
    position: absolute;
    left: 20px;
    top:20px;
    width: 80%;
  }
  .dateTime input{
    width: 200px;
    height:60px;
    border: none;
    outline: none;
    opacity: 0.8;
    text-indent: 5px;
  }
  .search{
    width: 100px;
    height: 60px;
    border: none;
    outline: none;
    border-radius: 10px;
    color: white;
    background: #f1870d;
  }
</style>
<style lang="css">
  .amap-geo,.amap-logo,.amap-copyright{
    display: none !important;
  }
</style>
