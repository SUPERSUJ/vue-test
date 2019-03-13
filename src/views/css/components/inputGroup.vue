<template>
  <div class="input-group">
    <span class="input-group-addon">Text</span>
    <input type="text" class="form-control" placeholder="hello world">
  </div>
</template>

<script>
export default {
  name: 'inputGroup',
};
</script>

<style lang="scss" scoped>
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
  .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 1%; // 没有这个，会不占满整行
    white-space: nowrap;
    vertical-align: middle; // 垂直居中
    display: table-cell;
    &:first-child {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .form-control {
    z-index: 1;
    display: table-cell;
    position: relative;
    float: left;
    width: 100%; // 没有这个，会不占满整行
    margin-bottom: 0;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.43;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    overflow: visible;
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
