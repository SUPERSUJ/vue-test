<template>
  <div>
    <a v-ripple class="ripple">Click Me</a>
  </div>
</template>

<script>
let rippleFn;

export default {
  name: 'buttoncss',
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    },
  },
  directives: {
    ripple: {
      bind: function(el) {
        rippleFn = function (e) {
          console.log('e: ', e);
          let target = e.target;
          let rect = target.getBoundingClientRect();
          console.log('rect: ', rect);
          let clientX = e.clientX;
          let clientY = e.clientY;
          let btnWidth = target.clientWidth;
          console.log('btnWidth: ', btnWidth);
          let rippleX = clientX - rect.left;
          let rippleY = clientY - rect.top;
          console.log('rippleX: ', rippleX);
          console.log('rippleY: ', rippleY);
          let rippleElem = document.createElement('span');
          let baseCss = `position: absolute;width:${btnWidth * 2}px;height:${btnWidth * 2}px;border-radius: 50%;
          transition: transform 700ms, opacity 700ms;
          transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);background: rgba(255, 255, 255, 0.4);
          background-position: center;background-repeat: no-repeat;
          background-size: 100%;
          left: ${rippleX - btnWidth}px;top: ${rippleY - btnWidth}px;transform: scale(0);pointer-events: none;`;
          rippleElem.style.cssText = baseCss;
          target.style.overflow = 'hidden';
          target.appendChild(rippleElem);
          requestAnimationFrame(function() {
            rippleElem.style.cssText = baseCss + 'transform: scale(1); opacity: 0;';
          });
          setTimeout(() => {
            target.removeChild(rippleElem);
          }, 700);
        };
        console.log('el: ', el);
        el.addEventListener('click', rippleFn, false);
      },
      unbind: function(el) {
        el.removeEventListener('click', rippleFn);
        rippleFn = null;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.ripple {
  height: 100%;
  width: 200px;
  display: block;
  outline: none;
  padding: 20px;
  color: #fff;
  text-transform: uppercase;
  background: #000;
  box-sizing: border-box;
  text-align: center;
  line-height: 14px;
  font-family: roboto, helvetica;
  font-weight: 200;
  letter-spacing: 1px;
  text-decoration: none;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  /*border-radius: 50px;*/
  -webkit-tap-highlight-color: transparent;
  border-radius: 5px;
  position: relative;
}

.ripple:focus {
  outline: none;
}

.ripple::selection {
  background: transparent;
  pointer-events: none;
}
</style>
