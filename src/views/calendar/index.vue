<template>
  <div>
    <div class="calendar">
      <div class="header">
        <span @click="prev">
          <i class="el-icon-arrow-left"></i>
        </span>
        <h1>{{currentTime.getFullYear()}}年{{currentTime.getMonth() + 1}}月</h1>
        <span @click="next">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div class="days">
        <div class="days-item">Mon</div>
        <div class="days-item">Tue</div>
        <div class="days-item">Wed</div>
        <div class="days-item">Thu</div>
        <div class="days-item">Fri</div>
        <div class="days-item">Sat</div>
        <div class="days-item">Sun</div>
      </div>
      <div class="dates" @click="setActive">
        <div v-for="(item, index) in dates" :key="index" class="date-item" :data-click="item.canClick" :data-index="index" :class="{active: index === activeIndex}">{{item.canClick ? item.text : '\&nbsp;'}}</div>
      </div>
    </div>
    <calendar-dialog></calendar-dialog>
  </div>
</template>

<script>
import calendarDialog from './components/calendarDialog';

export default {
  name: 'calendar',
  data() {
    return {
      dates: [],
      startIndex: null,
      daysNum: null,
      currDate: null,
      activeIndex: null,
      currentTime: new Date(),
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.setTitle();
      this.setDates();
    },
    setTitle() {
      let currYear = this.currentTime.getFullYear();
      let currMonth = this.currentTime.getMonth();
      let firstDayOfMonth = new Date(currYear, currMonth);
      this.startIndex = firstDayOfMonth.getDay();
      this.daysNum = new Date(currYear, currMonth + 1, 0).getDate();
      this.currDate = this.currentTime.getDate();
      // new Date(2019, 1) === new Date(2019, 1, 1) 2月1号
      // new Date(2019, 2, 1) 3月1号
      // new Date(2019, 2, 0) 2月28号
    },
    setDates() {
      this.dates = [];
      let startIndex = this.startIndex === 0 ? 6 : this.startIndex - 1;
      for (let i = 0; i < startIndex; i++) {
        this.dates.push({
          canClick: 0,
        });
      }
      for (let i = 1; i <= this.daysNum; i++) {
        this.dates.push({
          canClick: 1,
          text: i,
        });
        if (i === this.currDate) {
          this.activeIndex = this.dates.length - 1;
        }
      }
      let diffNums = 7 - this.dates.length % 7;
      for (let i = 0; i < diffNums; i++) {
        this.dates.push({
          canClick: 0,
        });
      }
    },
    setActive(e) {
      let target = e.target;
      let currentTarget = e.currentTarget;
      if (target !== currentTarget) {
        this.activeIndex = parseInt(target.dataset.index, 10);
      }
    },
    prev() {
      this.currentTime.setMonth(this.currentTime.getMonth() - 1);
      this.init();
    },
    next() {
      this.currentTime.setMonth(this.currentTime.getMonth() + 1);
      this.init();
    },
  },
  components: {
    calendarDialog,
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  background: #00A8E8;
  width: 400px;
  height: 415px;
  border-radius: 5px;
  padding: 30px;
  .header {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    color: #fff;
    font-size: 20px;
    span {
      cursor: pointer;
    }
    h1 {
      font-size: 20px;
      margin: 0;
    }
  }
  .days {
    display: flex;
    justify-content: flex-start;
    width: 400px;
    .days-item {
      display: inline-block;
      color: #fff;
      width: 50px;
      text-align: center;
      padding-bottom: 10px;
    }
  }
  .dates {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    width: 350px;
    .date-item {
      color: #FFF;
      width: 50px;
      text-align: center;
      height: 50px;
      padding: 1em;
      cursor: pointer;
      border-radius: 100%;
      &.active {
        color: greenyellow;
      }
    }
  }
}
</style>
