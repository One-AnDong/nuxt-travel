<style lang='stylus' scoped>
#hotel
  width 1000px
  margin 0 auto
#container
  width 1000px
  height 600px
</style>
<template lang='pug'>
#hotel
  #container
</template>

<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {
    window.onLoad = function () {
      var map = new AMap.Map('container', {
        zoom: 11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode: '3D'//使用3D视图
      });
      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      });
      map.add(marker)
    }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=2faa261f5c0f79589a1e86669bcdd569&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { }
}
</script>
