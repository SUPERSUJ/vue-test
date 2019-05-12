
<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="priceType" label="类型" width="180">
        </el-table-column>
      <el-table-column prop="price" label="单价" width="400">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row[scope.row.key]" class="input-with-select">
            <el-select class="select" v-model="scope.row.priceType" slot="prepend" placeholder="请选择" style="width: 200px;" @change="changeType(scope.$index)">
              <el-option label="目录价" value="catalogPrice"></el-option>
              <el-option label="销售价" value="salesPrice"></el-option>
              <el-option label="总监价" value="chiefPrice"></el-option>
            </el-select>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <el-radio-group v-model="radio" class="radioGroup">
      <el-radio label="catalogPrice">目录价</el-radio>
      <el-radio label="salesPrice">销售价</el-radio>
      <el-radio label="chiefPrice">总监价</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'tmpl',
  data() {
      return {
        radio: 'catalogPrice',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          price: '10',
          salesPrice: '100',
          chiefPrice: '1000',
          address: '上海市普陀区金沙江路 1518 弄',
          priceType: '',
          key: '',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          price: '20',
          salesPrice: '200',
          chiefPrice: '2000',
          address: '上海市普陀区金沙江路 1517 弄',
          priceType: '',
          key: '',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          price: '30',
          salesPrice: '300',
          chiefPrice: '3000',
          address: '上海市普陀区金沙江路 1519 弄',
          priceType: '',
          key: '',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          price: '40',
          salesPrice: '400',
          chiefPrice: '4000',
          address: '上海市普陀区金沙江路 1516 弄',
          priceType: '',
          key: '',
        }]
      }
    },
    created() {
      this.getRadio()
    },
    watch: {
      radio(val) {
        this.tableData.forEach(item=>{
          item.priceType = val
          let key;
          switch (val) {
            case 'catalogPrice': key = 'price'; break;
            case 'salesPrice': key = 'salesPrice'; break;
            case 'chiefPrice': key = 'chiefPrice'; break;
            default: break;
          }
          item.key = key;
        })
        console.log(this.tableData);
      }
    },
    methods: {
      getRadio() {
        this.tableData.forEach(item => {
          item.priceType =  this.radio;
          let key;
          switch (item.priceType) {
          case 'catalogPrice': key = 'price'; break;
          case 'salesPrice': key = 'salesPrice'; break;
          case 'chiefPrice': key = 'chiefPrice'; break;
          default: '';
        }
        item.key = key;
        });
      },
      changeType(index) {
        let item = this.tableData[index];
        let key;
        switch (item.priceType) {
          case 'catalogPrice': key = 'price'; break;
          case 'salesPrice': key = 'salesPrice'; break;
          case 'chiefPrice': key = 'chiefPrice'; break;
          default: '';
        }
        item.key = key;
      },
    }
}
</script>
