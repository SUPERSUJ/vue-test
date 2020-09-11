<template>
  <el-table
    :data="tableData6"
    :span-method="arraySpanMethod"
    border
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <div style="text-align: center;" v-if="scope.row.type === 'parent'">
          总计：{{scope.row.total}}
          <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="add(scope.$index)">添加</el-button>
        </div>
        <div v-else>{{scope.row.id}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="数值 1（元）">
    </el-table-column>
    <el-table-column
      prop="amount2"
      label="数值 2（元）">
    </el-table-column>
    <el-table-column
      label="数值 3（元）">
      <template slot-scope="scope">
        <ipt v-if="scope.row.type === undefined" v-model="tableData6[scope.$index].amount3" :parentindex="scope.row.parentIndex" @changeTotal="changeTotal"></ipt>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ipt from './ipt';

export default {
  name: 'specialTable',
  data() {
    return {
      tableData6: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
        type: 'parent',
        total: 0,
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        parentIndex: 0,
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
        parentIndex: 0,
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
        parentIndex: 0,
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
        parentIndex: 0,
      }, {
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
        parentIndex: 0,
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        parentIndex: 0,
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
        type: 'parent',
        total: 0,
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
        parentIndex: 7,
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
        parentIndex: 7,
      }],
    };
  },
  methods: {
    arraySpanMethod({ row, columnIndex }) {
      if (row.type === 'parent') {
        if (columnIndex === 0) {
          return [1, 5];
        }
      }
    },
    changeTotal(parentIndex) {
      if (typeof this.tableData6[parentIndex] === 'object' && this.tableData6[parentIndex].type === 'parent') {
        let total = 0;
        for (let i = parentIndex + 1; i < this.tableData6.length; i++) {
          let item = this.tableData6[i];
          if (item.parentIndex === parentIndex) {
            total += parseFloat(item.amount3);
          } else {
            break;
          }
        }
        this.tableData6[parentIndex].total = total;
      }
    },
    add(parentIndex) {
      console.log(parentIndex);
      let lastIndex = parentIndex + 1;
      let initIndex = 0;
      for (let i = lastIndex; i < this.tableData6.length; i++) {
        let item = this.tableData6[i];
        initIndex++;
        if (!item.hasOwnProperty('parentIndex')) {
          lastIndex = i;
          break;
        }
      }
      this.tableData6.splice(lastIndex, 0, {
        id: '12987123',
        name: `王小虎${initIndex}`,
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        parentIndex: parentIndex,
      });
    },
  },
  components: {
    ipt,
  },
};
</script>
