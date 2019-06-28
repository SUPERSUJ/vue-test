<template>
  <div
    class="drag-item"
    draggable
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop">
    <slot></slot>
  </div>
</template>

<script>
const findNearestComponent = (element, componentName) => {
  let target = element;
  console.log('findNearestComponent start');
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      console.log('if: ', target.__vue__);
      return target.__vue__;
    }
    target = target.parentNode;
    console.log('while: ', target);
  }
  return null;
};

export default {
  name: 'dragItem',
  data() {
    return {
      dragingNode: null,
      dropCom: null,
    };
  },
  methods: {
    handleDragStart(event) {
      event.dataTransfer.effectAllowed = 'move';
      this.dragingNode = event.target;
      // wrap in try catch to address IE's error when first param is 'text/plain'
      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData('text/plain', '');
      } catch (e) {
        console.log('handleDragStart e: ', e);
      }
      this.$emit('changeDraging', event.target.innerHTML);
    },
    handleDragOver(event) {
      // dragOver event.target是移动到上面的元素
      this.dropCom = findNearestComponent(event.target, 'dragItem');
      console.log('this.dropNode: ', this.dropNode);
      event.dataTransfer.dropEffect = 'move';
    },
    handleDragEnd(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this.dropCom.$el.parentNode.insertAfter(this.dropCom.$el, this.dragingNode);
    },
    handleDrop(event) {
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.drag-item {
  margin: 2px 0;
  padding: 2px;
  border: 1px solid black;
}
</style>
