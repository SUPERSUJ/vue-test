<template>
  <div class="tooltip">
    Hover over me
    <span class="tooltip-text">Tooltip text</span>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  cursor: pointer;
  .tooltip-text {
    visibility: hidden;
    background: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }
  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
}
</style>
