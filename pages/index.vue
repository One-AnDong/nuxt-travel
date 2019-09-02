<style lang="stylus">
.home
  position relative
  min-width 1000px
.home__banner
  width 100%
  height 100%
.home__search
  position absolute
  top 50%
  left 50%
  width 552px
  height 85px
  transform translate(-50%, -50%)
  z-index 999
</style>
 <template lang="pug">
  //- S 首页模块
  div(class="home")

    el-carousel(height='700px')
      el-carousel-item(v-for='item in imgData'  :key='item.url')
        .home__banner(:style="{background:`url(${$axios.defaults.baseURL+item.url}) center center no-repeat`,backgroundSize:'contain contain'}")

    //- 轮播图模块

    div.home__search
      el-row
        Tabs(:options='options' @tabClick='handleClick')
    //- 搜索模块

  //- E 首页模块
</template>

<script>
import Tabs from '@/components/common/Tabs'
export default {
  name: 'Home',
  components: {
    Tabs
  },
  data () {
    return {
      imgData: [],//轮播图片数据
      options: [
        { title: '攻略', placeholder: '搜索城市', name: 'strategy' },
        { title: '酒店', placeholder: '请输入城市搜索酒店', name: 'hotel' },
        { title: '机票', placeholder: '', name: 'ticket' }
      ]
    }
  },
  methods: {
    handleClick (index) {
      console.log("TCL: handleClick -> index", index)
    },
    async getBanners () {//获取轮播图数据
      let res = await this.$axios.get('/scenics/banners')
      const { data } = res.data
      this.imgData = data
    }
  },
  mounted () {
    this.getBanners()
  }
}
</script>
