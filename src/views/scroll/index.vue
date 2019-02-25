<template>
  <div style="height: 400px; overflow: auto; position: relative;">
    <div class="section-1"></div>
    <div id="section-2">Scroll past this div</div>
    <div class="section-3"></div>
  </div>
</template>

<script>
export default {
  name: 'scroll',
  mounted() {
    console.log(this.$el);
    let parent = this.$el;
    let section2 = this.$el.querySelector('#section-2');
    let timer = null;
    parent.addEventListener('scroll', function() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // timer = setTimeout(function() {
      //   let diff = section2.offsetTop + section2.offsetHeight;
      //   console.log('diff: ', diff);
      //   console.log('parent.scrollTop: ', parent.scrollTop);
      //   if (parent.scrollTop >= diff) {
      //     console.log(true);
      //   }
      // }, 100);
      // timer = setTimeout(function() {
      //   let diff = section2.offsetTop;
      //   console.log('diff: ', diff);
      //   console.log('parent.scrollTop: ', parent.scrollTop);
      //   if (parent.scrollTop >= diff) {
      //     console.log(true);
      //   }
      // }, 100);
      timer = setTimeout(function() {
        let diff = section2.offsetTop - parent.clientHeight;
        console.log('diff: ', diff);
        console.log('parent.scrollTop: ', parent.scrollTop);
        if (parent.scrollTop >= diff) {
          console.log(true);
        }
      }, 100);
    }, false);
    // 4个window对象下：scrollX、scrollY、scrollTo、scroll（作用和scrollTo一样）
    // 4个Element对象下：scrollWidth、scrollHeight、scrollLeft、scrollTop
  },
};
</script>

<style>
.section-1 {
  height: 900px;
  width: 100%;
  background: green;
}

.section-3 {
  height: 400px;
  width: 100%;
  background: orange;
}
</style>
