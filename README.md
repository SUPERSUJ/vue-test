# vue-test

``` bash
npm install
# 打包第三方
npm run build:dll
# serve with hot reload at localhost:8082
npm run dev
```
##  知识点

```
// 获取子组件
this.$children
// 获取父组件
this.$parent
// 获取组件虚拟DOM
this.$vnode
// 获取组件实例
this.$vnode.componentInstance
this
// 判断当前组件是否缓存
this.$vnode.data.keepAlive
// 获取父组件
this.$parent
```
>父组件是keep-alive，用this.$parent获取不到keep-alive的实例。this.$vnode.parent.componentInstance可以拿到keep-alive的实例

### this.$vnode.parent.componentInstance(keep-alive实例)的属性
* cache (对象，缓存的页面组件$vnode，key对应this.$vnode.componentOptions.Ctor.cid，Ctor是函数)
* exclude
* include
* max
* keys (cache的key集合)
```
let key = this.$vnode.key == null
      ? this.$vnode.componentOptions.Ctor.cid + 
        (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
      : this.$vnode.key;
```