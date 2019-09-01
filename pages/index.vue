<style lang="stylus">
.home__banner
  width 100%
  height 100%
</style>
 <template lang="pug">
  //- S 首页模块
  div(class="home")

    el-carousel(height='700px')
      el-carousel-item(v-for='item in imgData'  :key='item.url')
        .home__banner(:style="{background:`url(${item.url}) center center no-repeat`,backgroundSize:'contain contain'}")
    //- 轮播图

    div.home__search


  //- E 首页模块


</template>

<script>
export default {
  data () {
    return {
      imgData: [
        {
          url: "http://157.122.54.189:9095/assets/images/th01.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th02.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif",
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th04.jfif",
        }
      ]
    }
  },
  components: {
  }
}
</script>
