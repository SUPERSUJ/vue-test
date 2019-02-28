<template>
  <div>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="tooltip" name="tooltip">
        <tooltip style="margin-top: 100px;"></tooltip>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tooltip from './components/tooltip';

export default {
  name: 'css',
  data() {
    return {
      activeName: 'tooltip',
    };
  },
  components: {
    tooltip,
  },
};
</script>
