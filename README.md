# vue-test

``` bash
npm install
# 打包第三方
npm run build:dll
# serve with hot reload at localhost:8082
npm run dev
```
####  知识点

```
// 获取子组件
this.$children
// 获取父组件
this.$parent
// 虚拟DOM
this.$vnode
// 当前组件的第一个元素（template的子元素）
this.$vnode.parent
// 判断组件是否缓存
this.$vnode.data.keepAlive
```