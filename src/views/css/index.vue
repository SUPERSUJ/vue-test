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
    </el-tabs>
  </div>
</template>

<script>
import tooltip from './components/tooltip';
import percentageCircle from './components/percentageCircle';
import inputGroup from './components/inputGroup';

export default {
  name: 'css',
  data() {
    return {
      activeName: 'tooltip',
    };
  },
  components: {
    tooltip,
    percentageCircle,
    inputGroup,
  },
};
</script>
