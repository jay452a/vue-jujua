<template>
  <div>
    <s-header title="尿液测量记录">
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
import { GetUrineRecordInfo } from '@/api/index';
import {Toast} from 'mand-mobile';

export default {
  data() {
    return {
      testTime: '',
      tableTitle: {
        name: '项目名称',
        result: '结果',
        range: '参考范围',
      },
      listData: [
        { name: '尿胆原', result: '无', range: '阴性(-)' },
        { name: '潜血', result: '无', range: '阴性(-)' },
        { name: '胆红素', result: '无', range: '阴性(-)' },
        { name: '酮体', result: '无', range: '阴性(-)' },
        { name: '葡萄糖', result: '无', range: '阴性(-)' },
        { name: '蛋白质', result: '无', range: '阴性(-)' },
        { name: 'ph值', result: '无', range: '5.0~7.0' },
        { name: '亚硝酸盐', result: '无', range: '阴性(-)' },
        { name: '白细胞', result: '无', range: '阴性(-)' },
        { name: '比重', result: '无', range: '1.015~1.025' },
        { name: '维生素', result: '无', range: '阴性(-)' },
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
        GetUrineRecordInfo(params).then(res => {
          if(res&&res[0]) {
            const data = res[0]
            this.testTime = data.CreateDate
            this.listData[0].result = data.UrineUbg
            this.listData[1].result = data.UrineBld
            this.listData[2].result = data.UrineBil
            this.listData[3].result = data.UrineKet
            this.listData[4].result = data.UrineGlu
            this.listData[5].result = data.UrinePro
            this.listData[6].result = data.UrinePH
            this.listData[7].result = data.UrineNit
            this.listData[8].result = data.UrineLeu
            this.listData[9].result = data.UrineSG
            this.listData[10].result = data.UrineVC
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
