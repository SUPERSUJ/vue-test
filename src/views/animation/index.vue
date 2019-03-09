<template>
  <div>
    <div>
      菜单按钮
      <menu-icon></menu-icon>
    </div>
    <div>
      滚动固定导航栏
      <narbar-sticky></narbar-sticky>
    </div>
  </div>
</template>

<script>
import menuIcon from './components/menuIcon';
import narbarSticky from './components/narbarSticky';

export default {
  name: 'animation',
  components: {
    menuIcon,
    narbarSticky,
  },
};
</script>
