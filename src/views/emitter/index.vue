<template>
  <div>
    <bb>
      <aa>
        <cc></cc>
      </aa>
    </bb>
  </div>
</template>

<script>
import aa from '@components/aa';
import bb from '@components/bb';
import cc from '@components/cc';

export default {
  name: 'emitter',
  components: {
    aa,
    bb,
    cc,
  },
};
</script>
