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
this.$parent是拿不到keep-alive的实例，返回的是keep-alive上面的组件实例

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
```
this.$vnode.componentInstance === this // true
computed -> _computedWatchers
this.$props === this._props
```
```
this.$vnode.tag // `vue-component-${id}-${name}`
name this.$options.name
```
```
$options
  parent // VueComponent
  propsData
  _componentTag
  _parentListeners
  _parentVnode
  _propKeys // Array [props中key]
  _renderChildren
  __proto__
    beforeCreate // [beforeCreate, VuexInit, injectStyle, f()]
    beforeDestory
    components
    computed
    created // [created]
    data // f()
    destoryed // [destoryed]
    directives // {}
    filter // {}
    methods // {}
    mounted // mounted
    name // String
    props // {}
    render // f()
    staticRenderFns // []
    _Ctor // {}
      0: f VumComponent 方法
        cid 就是上面id
        component
        diretive
        extend
        extendOptions
        filter
        mixin
        options
        sealedOptions
        super
        superOptions
        use

    __file // src/views/zoomImg/index.vue 文件路径
    _base
      cid: 0,
      compile
      component
      delete
      directive
      extend
      filter
      mixin
      nextTick
      observable
      options
      set
      use
      util
        defineReactive
        extend
        mergeOptions
        warn
        version: 2.6.9
        _installedPlugins // vue.component注册的组件

    _compiled // true
    _scopeId // data-v-7763506e 就是element的tag属性
```

```
$vnode // 即vnode
  asyncFactory
  asyncMeta
  children
  componentInstance
  componentOptions
  context
  data
  devtoolsMeta
  elm
  fnContext
  fnScopeId
  isAsyncPlaceholder
  isCloned
  isOnce
  isRootInsert
  isStatic
  key
  ns
  parent
  raw
  tag
  text
  child

$vnode.componentInstance // vnode对应的实例
```

>wheel、mousewheel、和DOMMouseScroll则是“滚轮事件”。这有什么不同呢？
>
>scroll检测的是滚动条的滚动，当滚动条不能滚动（到顶或到底）时
>scroll便不再触发。而滚轮事件则不同，它监测的是鼠标滚轮是否滚动
>只要在滚动，便会触发。scroll的默认滚动行为是不能禁止的,
>而滚轮事件则可以阻止默认行为(event.preventDefault())。
>scroll 事件的e是没有wheelDelta属性
>4个window对象下：scrollX、scrollY、scrollTo、scroll（作用和scrollTo一样）
>4个Element对象下：scrollWidth、scrollHeight、scrollLeft、scrollTop