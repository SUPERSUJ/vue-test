<template>
  <div class="round-turntable-controller">
    <round-turntable
      ref="roundTurntable"
      :prizeData="prizeData"
      @endRotate="endRotate"
    >
      <template slot="item" slot-scope="scope">
        <div class="turntable-name">{{ scope.item.prizeName }}</div>
        <div class="turntable-img">
          <img :src="scope.item.prizeImg">
        </div>
      </template>
    </round-turntable>
    <div @click="emitRotate" class="pointer"></div>
  </div>
</template>

<script>
import roundTurntable from '../roundTurntable';

export default {
  name: 'roundTurntableController',
  data() {
    this.prizeIndex = -1;
    this.isLock = false;
    return {
      prizeData: [
        {
          id: 1,
          prizeName: '0',
          prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/1.png',
        },
        {
          id: 2,
          prizeName: '1',
          prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/7.png',
        },
        {
          id: 3,
          prizeName: '2',
          prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/3.png',
        },
        {
          id: 4,
          prizeName: '3',
          prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/4.png',
        },
        {
          id: 5,
          prizeName: '4',
          prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/5.png',
        },
        {
          id: 6,
          prizeName: '5',
          prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
        },
      ],
    };
  },
  methods: {
    endRotate(e) {
      console.log('endRotate e: ', e);
      console.log('endRotate item: ', this.prizeData[this.prizeIndex]);
      this.isLock = false;
    },
    emitRotate() {
      if (!this.canRotate()) {
        return;
      }
      this.isLock = true;
      this.prizeIndex = Math.floor(Math.random() * this.prizeData.length);
      this.$refs.roundTurntable.rotate(this.prizeIndex);
    },
    canRotate() {
      return !this.isLock;
    },
  },
  components: {
    roundTurntable,
  },
};
</script>

<style lang="scss" scoped>
.round-turntable-controller {
  position: relative;
  width: 400px;
  height: 600px;
  margin: 0 auto;
  text-align: center;
}

.turntable {
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  width: 400px;
  height: 400px;
}
.turntable-name {
  /*background: pink;*/
  position: absolute;
  left: 10px;
  top: 20px;
  width: calc(100% - 20px);
  font-size: 26px;
  text-align: center;
  color: #fff;
}

.turntable-img {
  position: absolute;
  /*要居中就要50% - 宽度 / 2*/
  left: calc(50% - 80px / 2);
  top: 60px;
  width: 80px;
  height: 80px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}

.pointer {
  position: absolute;
  left: calc(200px - 46px);
  top: calc(200px - 50px);
  width: 100px;
  height: 100px;
  background-image: url("http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/start.png");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
