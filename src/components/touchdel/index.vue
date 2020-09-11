<template>
  <div class="touchdel">
    <p>滑动删除</p>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :data-type="activeSwiper === index ? 1 : 0"
        class="list-item">
        <div
          @touchstart.capture="touchStart"
          @touchend.capture="touchEnd"
          @click="skip"
          :data-index="index"
          class="list-box"
          >
          <img :src="item.imgUrl" class="list-img" alt="">
          <div class="list-content">
            <p class="title">{{item.title}}</p>
            <p class="tips">{{item.tips}}</p>
            <p class="time">{{item.time}}</p>
          </div>
        </div>
        <div class="delete" @click="deleteItem" :data-index="index">删除</div>
      </li>
    </ul>
  </div>
</template>

<script>
const IMG_URL = require('../../assets/imgs/avatar.jpg');

export default {
  name: 'touchdel',
  data() {
    return {
      list: [
        {
          title: 'Chrome更新了',
          imgUrl: IMG_URL,
          tips: '不再支持Flash视频播放',
          time: '上午 8:30',
        },
        {
          title: '电影新资讯',
          imgUrl: IMG_URL,
          tips: '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观',
          time: '上午 12:00',
        },
        {
          title: '聚焦两会·共筑中国梦',
          imgUrl: IMG_URL,
          tips: '习近平代表的两会故事',
          time: '下午 17:45',
        },
        {
          title: '微信团队',
          imgUrl: IMG_URL,
          tips: '您的帐号有异常登录，如非本人操作，请及时修改密码',
          time: '昨天',
        },
      ],
      startX: 0,
      activeSwiper: -1,
    };
  },
  methods: {
    touchStart(e) {
      console.log('touchStart e:', e);
      this.startX = e.touches[0].clientX;
    },
    touchEnd(e) {
      console.log(e);
      console.log('touches: ', JSON.parse(JSON.stringify(e.touches)));
      console.log('changedTouches: ', JSON.parse(JSON.stringify(e.changedTouches)));
      console.log('targetTouches: ', JSON.parse(JSON.stringify(e.targetTouches)));
      let endX = e.changedTouches[0].clientX;
      let diff = this.startX - endX;
      if (diff > 30) {
        this.activeSwiper = parseInt(e.currentTarget.dataset.index, 10);
      } else if (diff < -30) {
        this.activeSwiper = -1;
      }
      this.startX = 0;
    },
    skip() {
      this.activeSwiper = -1;
    },
    deleteItem(e) {
      let index = e.currentTarget.dataset.index;
      this.activeSwiper = -1;
      this.list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.touchdel {
  position: relative;
  width: 375px;
  overflow: hidden;
}

ul,
li,
p {
  margin: 0;
  padding: 0;
  list-style: none;
}

.page-title {
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}
.page-title:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-item {
  position: relative;
  height: 80px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type="0"] {
  transform: translate3d(0,0,0);
}
.list-item[data-type="1"] {
  transform: translate3d(-100px,0,0);
}
.list-item:after {
  content: " ";
  position: absolute;
  left: 10px;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box {
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-img {
  display: block;
  width: 50px;
  height: 50px;
}
.list-item .list-content {
  padding: 5px 0 5px 10px;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}
.list-item .title {
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 5px;
  color: #666;
}
.list-item .delete {
  width: 100px;
  height: 80px;
  background: #ff4949;
  font-size: 17px;
  color: #ffffff;
  text-align: center;
  line-height: 80px;
  position: absolute;
  top: 0;
  right: -100px;
}

</style>
