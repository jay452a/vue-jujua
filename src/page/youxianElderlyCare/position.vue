<template>
<div>
  <s-header title="当前位置">
  </s-header>
  <div class="s-header s-action-bar" style="margin-bottom: 0;position: relative">
    <div id="container"></div>
    <p class="location">
      <span v-if="isGetLocation">正在定位中...</span>
      <span v-else>家属：{{location}}</span></p>
    <ul class="operate">
      <li @click="biger">+</li>
      <li @click="smaller">-</li>
    </ul>
    <ul class="layer">
      <li @click="setLayer(0)"><span :class="{checked:layerType===0}"></span>标准图</li>
      <li @click="setLayer(1)"><span  :class="{checked:layerType===1}"></span>卫星图</li>
      <li @click="setLayer(2)"><span :class="{checked:layerCheck===true}"></span>路线图</li>
    </ul>
  </div>
</div>
</template>
<script>
import AMap from 'AMap';

export default{
  components: {
  },
  data() {
    return {
      isGetLocation: true,
      location: '',
      zoom: 18,
      defaultPosition: [103.729985,30.531848],
      layerType: 0,
      layerCheck: false,
    };
  },
  methods: {
    getLocation(map) {
      // 解析定位结果
      const that = this;
      function onComplete(data) {
        console.log(data)
        const icon = new AMap.Icon({
          size: new AMap.Size(30, 40),
          image: require('@/assets/images/icon/location.png'),
          imageSize: new AMap.Size(30, 40),
        });
        const marker = new AMap.Marker({
          icon,
          position: new AMap.LngLat(data.position.lng, data.position.lat),
          offset: new AMap.Pixel(-15, -20),
        });
        that.map.add(marker);
        that.isGetLocation = false;
        that.location = data.addressComponent.city;
        that.map.setZoomAndCenter(that.zoom);
      }
      // 解析定位错误信息
      function onError() {
        that.location = '定位失败';
      }
      map.plugin('AMap.Geolocation', () => {
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: false, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: 'RB',
        });
        map.addControl(this.geolocation);
        this.geolocation.getCurrentPosition();
        AMap.event.addListener(this.geolocation, 'complete', onComplete); // 返回定位信息
        AMap.event.addListener(this.geolocation, 'error', onError); // 返回定位出错信息
      });
    },
    biger() {
      if (this.zoom < 18) {
        this.zoom += 1;
      }
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
  },
  mounted() {
    this.map = new AMap.Map('container', {
      center: this.defaultPosition,
      zoom: 12,
      zoomEnable: false,
    });
    this.getLocation(this.map);
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
    bottom: 100px;
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
</style>
<style lang="css">
   .amap-geo,.amap-logo,.amap-copyright{
    display: none !important;
  }
</style>
