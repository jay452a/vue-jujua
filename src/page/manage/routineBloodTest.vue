<template>
  <div>
    <s-header title="血液测量记录">
    </s-header>
    <div class="s-header s-action-bar">
      <div class="content">
        <p class="testTime"><span>{{testTime}}</span></p>
        <Table :title='tableTitle' class="tableList" :data="listData"></Table>
      </div>
    </div>
  </div>
</template>
<script>
import Table from './components/table';
import { GetBloodRecordInfo } from '@/api/index'
import {Toast} from 'mand-mobile';

export default {
  data() {
    return {
      testTime: '',
      tableTitle: {
        name: '项目名称',
        result: '结果',
        unit: '单位',
        range: '参考范围',
      },
      listData: [
        { name: '白细胞计数', result: '-', unit: '10^9/L', range: '4~10' },
        { name: '淋巴细胞计数', result: '-', unit: '10^9/L', range: '0.8~4' },
        { name: '中间细胞计数', result: '-', unit: '10^9/L', range: '0.1~0.7' },
        { name: '中性粒细胞计数', result: '-', unit: '10^9/L', range: '4.5~8' },
        { name: '淋巴细胞百分比', result: '-', unit: '%', range: '20~40' },
        { name: '中间细胞百分比', result: '-', unit: '%', range: '3.5~14' },
        { name: '中性粒细胞百分比', result: '-', unit: '%', range: '50~75' },
        { name: '血红蛋白浓度', result: '-', unit: 'g/L', range: '120~160' },
        { name: '红细胞计数', result: '-', unit: '10^12/L', range: '4.0~5.5' },
        { name: '红细胞压积', result: '-', unit: '%', range: '36~50' },
        { name: '平均红细胞体积', result: '-', unit: 'fL', range: '82~100' },
        { name: '平均红细胞血红蛋白含量', result: '-', unit: 'pg', range: '26~32' },
        { name: '平均红细胞血红蛋白浓度', result: '-', unit: 'g/L', range: '320~360' },
        { name: '红细胞分布宽度变异系数', result: '-', unit: '%', range: '11.5~15.5' },
        { name: '红细胞分布宽度标准差', result: '-', unit: 'fl', range: '35~56' },
        { name: '血小板计数', result: '-', unit: '10^9/L', range: '100~300' },
        { name: '平均血小板体积', result: '-', unit: 'fL', range: '9~13' },
        { name: '血小板分布宽度', result: '-', unit: 'L', range: '15~18' },
        { name: '血小板压积', result: '-', unit: '%', range: '0.078~0.282' },
        { name: '大血小板比率', result: '-', unit: '%', range: '13~43' },
      ],
    };
  },
  components: {
    Table,
  },
  methods: {
    getData() {
      const params = {
        idCode: window.sessionStorage.personIndentify,
      }
      GetBloodRecordInfo(params).then(res => {
        console.log(res)
        if(res && res[0]) {
          const data = res[0]
          this.testTime = data.CreateDate
          this.listData[0].result = data.WBC
          this.listData[1].result = data.Lymph
          this.listData[2].result = data.Mid
          this.listData[3].result = data.Gran
          this.listData[4].result = data.LymphPercent
          this.listData[5].result = data.MidPercent
          this.listData[6].result = data.GranPercent
          this.listData[7].result = data.HGB
          this.listData[8].result = data.RBC
          this.listData[9].result = data.HCT
          this.listData[10].result = data.MCV
          this.listData[11].result = data.MCH
          this.listData[12].result = data.MCHC
          this.listData[13].result = data.RDWCV
          this.listData[14].result = data.RDWSD
          this.listData[15].result = data.PLT
          this.listData[16].result = data.MPV
          this.listData[17].result = data.PDW
          this.listData[18].result = data.PCT
          this.listData[19].result = data.PLCR
        }else{
          Toast.failed('暂无记录')
        }

      }, err => {
        Toast.failed(err)
      })
    }
  },
  created() {
      this.getData()
  }
};
</script>
<style lang="postcss" scoped>
  .content{
    padding-top: 20px;
    text-align: center;
    background: white;
    position: absolute;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    height: calc(100% - 110px);
    -webkit-overflow-scrolling: touch;
  }
  .testTime>span{
    border-bottom:1px solid #dcdcdc;
    padding-bottom: 5px;
  }
  .tableList{
    margin-top: 20px;
  }
</style>
