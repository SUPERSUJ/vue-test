<template>
  <div>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="tooltip" name="tooltip">
        <tooltip style="margin-top: 100px;"></tooltip>
      </el-tab-pane>
      <el-tab-pane label="percentageCircle" name="percentageCircle">
        <percentage-circle style="margin-top: 100px;"></percentage-circle>
      </el-tab-pane>
      <el-tab-pane label="inputGroup" name="inputGroup">
        <input-group style="margin-top: 100px;"></input-group>
      </el-tab-pane>
      <el-tab-pane label="viewPhotot" name="viewPhotot">
        <div v-view>
          <img src="https://images.pexels.com/photos/3036355/pexels-photo-3036355.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
          <img src="https://images.pexels.com/photos/2568091/pexels-photo-2568091.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
        </div>
        <div v-view>
          <!-- <img src="https://images.pexels.com/photos/2819549/pexels-photo-2819549.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100"> -->
          <img src="https://images.pexels.com/photos/3039185/pexels-photo-3039185.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
          <img src="https://images.pexels.com/photos/3036355/pexels-photo-3036355.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
        </div>
      </el-tab-pane>
      <el-tab-pane label="loading" name="loading">
        <loading></loading>
        <div>
          <img-list></img-list>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tooltip from './components/tooltip';
import percentageCircle from './components/percentageCircle';
import inputGroup from './components/inputGroup';
import loading from './components/loading';
import imgList from './components/imgList';

export default {
  name: 'css',
  data() {
    return {
      activeName: 'loading',
    };
  },
  components: {
    tooltip,
    percentageCircle,
    inputGroup,
    loading,
    imgList,
  },
};
</script>
