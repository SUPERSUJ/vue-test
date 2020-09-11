<template>
  <div>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="tooltip" name="tooltip">
        <tooltip style="margin-top: 100px;"></tooltip>
        <el-button size="small" type="primary" @click="actionB">actionB</el-button>
        <el-button size="small" type="primary" @click="ACTION_A">ACTION_A</el-button>
        {{testMapGetters}}
      </el-tab-pane>
      <el-tab-pane label="percentageCircle" name="percentageCircle">
        <percentage-circle style="margin-top: 100px;"></percentage-circle>
      </el-tab-pane>
      <el-tab-pane label="inputGroup" name="inputGroup">
        <input-group style="margin-top: 100px;"></input-group>
      </el-tab-pane>
      <el-tab-pane label="viewPhoto" name="viewPhoto">
        <div v-view>
          <img src="https://images.pexels.com/photos/3036355/pexels-photo-3036355.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
          <img src="https://images.pexels.com/photos/2568091/pexels-photo-2568091.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
          <img src="https://images.pexels.com/photos/3039185/pexels-photo-3039185.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="100" height="100">
          <img src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2019/08/Black-Hole_2880x1700_Lede.jpg" alt="" width="100" height="100">
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
      <el-tab-pane label="phoneCalender" name="phoneCalender">
        <phone-calender></phone-calender>
      </el-tab-pane>
      <el-tab-pane label="picker" name="picker">
        <picker></picker>
      </el-tab-pane>
      <el-tab-pane label="下拉" name="damping">
        <damping></damping>
      </el-tab-pane>
      <el-tab-pane label="左滑删除" name="touchdel">
        <touchdel></touchdel>
      </el-tab-pane>
      <el-tab-pane label="转盘" name="roundTurntableController">
        <round-turntable-controller></round-turntable-controller>
      </el-tab-pane>
      <el-tab-pane label="canvas例子" name="testCanvas">
        <test-canvas></test-canvas>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import phoneCalender from '@components/phoneCalendar';
import picker from '@components/picker';
import damping from '@components/damping';
import touchdel from '@/components/touchdel';
import roundTurntableController from '@/components/roundTurntableController';
import tooltip from './components/tooltip';
import percentageCircle from './components/percentageCircle';
import inputGroup from './components/inputGroup';
import loading from './components/loading';
import imgList from './components/imgList';
import testCanvas from './components/testCanvas';

export default {
  name: 'css',
  data() {
    return {
      activeName: 'roundTurntableController',
    };
  },
  computed: {
    ...mapGetters(['testMapGetters']),
  },
  created() {
    // this.$store.dispatch('actionB');
  },
  methods: {
    ...mapActions(['actionB']),
    ...mapMutations(['ACTION_A']),
  },
  components: {
    tooltip,
    percentageCircle,
    inputGroup,
    loading,
    imgList,
    phoneCalender,
    picker,
    damping,
    touchdel,
    roundTurntableController,
    testCanvas,
  },
};
</script>
