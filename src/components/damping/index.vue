<template>
  <div class="box" ref="box">
    <div
      :style="{
        'border-bottom-width': borderBottom + 'px',
        height: height + 'px',
        transition: touching ? 'none' : 'height .25s, border-bottom-width .25s',
      }"
      class="loading">
      {{loading_text}}
    </div>
    <div
      ref="content"
      @touchstart="touchstart"
      @touchmove.stop="touchmove"
      @touchend="touchend">
      <ul>
        <li>列表内容5</li>
        <li>列表内容23</li>
        <li>列表内容5394</li>
        <li>列表内容86</li>
        <li>列表内容6845321</li>
        <li>列表内容9006</li>
        <li>列表内容0485</li>
        <li>列表内容4843876334</li>
        <li>列表内容28632252</li>
        <li>列表内容4051943</li>
        <li>列表内容5</li>
        <li>列表内容1444</li>
        <li>列表内容349131</li>
        <li>列表内容2686006</li>
        <li>列表内容32</li>
        <li>列表内容5636521946</li>
        <li>列表内容8879</li>
        <li>列表内容3817956039</li>
        <li>列表内容57390051</li>
        <li>列表内容7155</li>
        <li>列表内容6698213</li>
        <li>列表内容171</li>
        <li>列表内容2754850774</li>
        <li>列表内容348373</li>
        <li>列表内容61392</li>
        <li>列表内容87</li>
        <li>列表内容55</li>
        <li>列表内容3316</li>
        <li>列表内容862855</li>
        <li>列表内容16186</li>
        <li>列表内容418084</li>
        <li>列表内容76296</li>
        <li>列表内容8688</li>
        <li>列表内容1</li>
        <li>列表内容776958</li>
        <li>列表内容7647232933</li>
        <li>列表内容28</li>
        <li>列表内容2</li>
        <li>列表内容135061184</li>
        <li>列表内容686</li>
        <li>列表内容08</li>
        <li>列表内容4934529211</li>
        <li>列表内容6252</li>
        <li>列表内容27523</li>
        <li>列表内容413</li>
        <li>列表内容738153</li>
        <li>列表内容6993867</li>
        <li>列表内容5727909913</li>
        <li>列表内容05703</li>
        <li>列表内容5</li>
        <li>列表内容5480178389</li>
        <li>列表内容734</li>
        <li>列表内容4</li>
        <li>列表内容773654</li>
        <li>列表内容309</li>
        <li>列表内容73014809</li>
        <li>列表内容71956</li>
        <li>列表内容8733</li>
        <li>列表内容854</li>
        <li>列表内容78585</li>
        <li>列表内容722</li>
        <li>列表内容2242816</li>
        <li>列表内容3943</li>
        <li>列表内容53833</li>
        <li>列表内容627583</li>
        <li>列表内容5310823</li>
        <li>列表内容491393067</li>
        <li>列表内容214</li>
        <li>列表内容913</li>
        <li>列表内容837</li>
        <li>列表内容4</li>
        <li>列表内容5555920571</li>
        <li>列表内容862100514</li>
        <li>列表内容68286</li>
        <li>列表内容88426</li>
        <li>列表内容4241526855</li>
        <li>列表内容95152059</li>
        <li>列表内容6</li>
        <li>列表内容042025</li>
        <li>列表内容977</li>
        <li>列表内容9096</li>
        <li>列表内容573347</li>
        <li>列表内容0479</li>
        <li>列表内容4652516</li>
        <li>列表内容25</li>
        <li>列表内容0909828915</li>
        <li>列表内容2623</li>
        <li>列表内容448834</li>
        <li>列表内容208763</li>
        <li>列表内容19559</li>
        <li>列表内容090801785</li>
        <li>列表内容6261345203</li>
        <li>列表内容83519</li>
        <li>列表内容9129037</li>
        <li>列表内容9</li>
        <li>列表内容861</li>
        <li>列表内容08</li>
        <li>列表内容544458832</li>
        <li>列表内容36</li>
        <li>列表内容087678</li>
      </ul>
    </div>
  </div>
</template>

<script>
// 代码参考
// https://www.zhangxinxu.com/wordpress/2017/01/mobile-phone-drag-drop-inertia-loading/
const LOADING_HEIGHT = 40;

const step = [0, 20, 40, 60, 80, 100];
const rate = [1, 0.5, 0.4, 0.3, 0.1, 0.02];
const stepMap = [];
for (let i = 0, len = step.length - 1; i < len; i++) {
  let ret = 0;
  for (let j = i + 1; j > 0; j--) {
    ret += (step[j] - step[j - 1]) * rate[j - 1];
  }
  stepMap.push(ret);
}
// 分段折线图，x越大，斜率(rate)越小，y增长越慢
function damping(n) {
  let ret = 0;

  for (let i = step.length - 1; i >= 0; i--) {
    if (n > step[i]) {
      ret = (n - step[i]) * rate[i];
      ret += i > 0 ? stepMap[i - 1] : 0;
      break;
    }
  }

  return ret;
}

// 37 => 28.5
// 313 => 69.3

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// 随机整数
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  name: 'damping',
  data() {
    this.timer = null;
    this.loading = false; // 是否在加载数据
    return {
      borderBottom: 0,
      height: 0,
      touchStartY: 0,
      touching: false,
      markFirstDistance: -1,
      rectY: 0,
      loading_text: '下拉更新',
    };
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    touchstart(e) {
      this.touchStartY = e.touches[0].pageY;
      this.touching = true;
    },
    touchmove(e) {
      if (!this.touching) {
        return;
      }
      let distanceY = e.touches[0].pageY - this.touchStartY;
      let $box = this.$refs.box;
      console.log('$box.scrollTop: ', $box.scrollTop);
      console.log('$box.clientHeight: ', $box.clientHeight);
      console.log('$box.scrollHeight: ', $box.scrollHeight);
      console.log('$box.clientHeight === $box.scrollHeight: ', $box.clientHeight === $box.scrollHeight);
      if ($box.scrollTop === 0) {
        if (distanceY > 0 || this.markFirstDistance > 0) {
          e.preventDefault();
        }
        if (distanceY > 0 && this.markFirstDistance === -1) {
          this.markFirstDistance = distanceY;
        }
      }
      let moveY = distanceY - this.markFirstDistance;
      console.log('this.loading: ', this.loading);
      if (this.markFirstDistance > 0 && !this.loading) {
        if (moveY < 0) {
          this.height = 0;
        } else {
          this.height = Math.min(moveY, LOADING_HEIGHT);
        }
        // moveY 临界点是60，才会触发阻尼
        let overflowHeight = Math.max(0, moveY - LOADING_HEIGHT) - this.height / 2;
        if (overflowHeight > 0) {
          this.loading_text = '释放加载';
          this.borderBottom = damping(overflowHeight);
          console.log('this.height: ', this.height);
          console.log('this.borderBottom: ', this.borderBottom);
        }
      }
      this.rectY = moveY;
    },
    touchend() {
      if (!this.touching || this.loading) {
        return;
      }
      if (this.markFirstDistance > 0 && this.rectY > 0) {
        if (this.rectY > LOADING_HEIGHT) {
          this.borderBottom = 0;
          this.getData();
        } else {
          this.origin();
        }
      }
    },
    origin() {
      console.log('origin');
      this.touching = false;
      this.borderBottom = 0;
      this.height = 0;
      this.touchStartY = 0;
      this.markFirstDistance = -1;
      this.loading = false;
      this.loading_text = '下拉更新';
    },
    getData() {
      this.loading = true;
      this.loading_text = '加载中...';
      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      let sec = randomInt(2, 10) * 1000;
      console.log('sec: ', sec);
      this.timer = setTimeout(() => {
        this.origin();
      }, sec);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  background: red;
}

.box {
  position: relative;
  width: 500px;
  height: 500px;
  margin: auto;
  border: 1px solid #000000;
  overflow: auto;
}

.loading {
  box-sizing: content-box;
  line-height: 40px;
  text-align: center;
  background-color: #eeeeee;
  font-size: 14px;
  overflow: hidden;
  border-bottom-style: solid;
  border-bottom-color: transparent;
}

</style>
