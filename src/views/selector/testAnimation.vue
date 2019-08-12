<template>
  <div>
    <!-- <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class"
      appear-active-class="custom-appear-active-class">
        <p v-if="show">test</p>
    </transition> -->
    <!-- <button @click="changeText">button</button> -->
    <div>
      <transition name="fade" mode="out-in">
        <button v-if="modeShow" key="btn1">btn1</button>
        <button v-else key="btn2">btn2</button>
      </transition>
    </div>
    <button @click="modeShow = !modeShow">changeModeShow</button>
    <div id="list-demo" class="demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list" tag="p">
        <span v-for="item in items" v-bind:key="item" class="list-item">
          {{ item }}
        </span>
      </transition-group>
    </div>
    <base-checkbox v-model="lovingVue"></base-checkbox>
    {{lovingVue}}
    <base-input :label="label" v-model="name"></base-input>
    {{name}}
  </div>
</template>

<script>
export default {
  name: 'testAnimation',
  data() {
    return {
      show: true,
      modeShow: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      lovingVue: false,
      name: 'szj',
      label: '名字',
    };
  },
  methods: {
    changeText() {
      this.show = !this.show;
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
  },
  components: {
    'base-checkbox': {
      model: {
        prop: 'checked',
        event: 'change',
      },
      prop: {
        checked: Boolean,
      },
      template: `
        <input type="checkbox" v-bind:checked="checked" @change="$emit('change', $event.target.checked)">
      `,
    },
    'base-input': {
      inheritAttrs: false,
      props: ['label', 'value'],
      computed: {
        inputListeners: function() {
          let vm = this;
          return Object.assign({}, this.$listeners, {
            input: function(event) {
              vm.$emit('input', event.target.value);
            },
          });
        },
      },
      template: `
        <label>
          {{label}}
          <input v-bind="$attr" v-bind:value="value" v-on="inputListeners">
        </label>
      `,
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-appear-class {
  font-size: 70px;
}
.custom-appear-to-class {
  font-size: 20px;
}
.custom-appear-active-class {
  transition: all 3s ease;
}

.fade-enter, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s ease;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
