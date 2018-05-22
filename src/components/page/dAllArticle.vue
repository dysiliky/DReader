<template>
  <div class="sortPage" :id="model">
    <div class="topSort">
      <mt-header title="全部文章" style="background:#ffd900;font-size:20px">
        <div slot="left">
          <mt-button @click="back()" icon="back" style="font-size:16px">返回</mt-button>
        </div>
      </mt-header>
    </div>
    <h4 class="sortAtical">{{ classnametitle }}类文章</h4>
    <div class="sortAticalAll" v-for="sort in result" v-if="sort.detailpagecontent.slice(0,3) == '[非]' && sort.classname == classnametitle" @click="tobdetailarticleview(sort.detailpageid)">
      <div class="classAndUser">
        <img :src="sort.userphoto" alt="">
        <p>文章作者: {{sort.detaileuserid}}</p>
      </div>
      <h4>{{sort.detailpagetitle}}</h4>
      <p class="detail-content">{{sort.detailpagecontent}}</p>
      <div class="datailGood">
        <p style="margin-right:0.1rem;">{{sort.detailpagegood}}赞同</p>
        <p>{{sort.detailpagecount}}阅读</p>
      </div>
    </div>
    <div class="noMore">
      <p>已经没有更多了...</p>
    </div>

  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  export default {
    data () {
      return {
        result : {},
        id : this.$route.params.detailid,
        classnametitle : ''
      }
    },
    methods: {
      back(){
        this.$router.push('/shop')
      },
      // 获取到某篇文章，通过路由传参进入文章详情
      tobdetailarticleview(num){
        console.log(num);
        this.$router.push('/bdetailarticle/'+ num);
      }
    },
    // 请求某个分类的文章
    created(){
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
      this.classnametitle = localMessage.get('articletypes');
      console.log(this.$route)
      // 请求某个类所有的文章
      this.axios.get('http://txspring.cn:8010/getAllArticleDesc').then(data=>{
        this.result = data.data;
        console.log(data);
        Indicator.close();
      });
    },
    computed:{
      model(){
        return this.$store.getters.changeModel;
      }
    }
  }
</script>

<style lang="css" scoped>
  .sortPage{
    background-color: #efeff4;
  }
  .sortAtical{
    height : 0.5rem;
    padding-left : 0.2rem;
    line-height : 0.5rem;
    background : #fff;
    font-size : 0.25rem;
    color : gray;
  }
  .sortAticalAll{
    background : #fff;
    border-radius : 30px 0px 30px 0px;
  }
  .sortAticalAll .detail-content{
    /*width : 93%;*/
    height : 1.4rem;
    font-weight: bolder;
    font-size: 0.25rem;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 4 !important;
    -webkit-box-orient: vertical !important;
    word-break: break-all;
    color: #555;
    margin-left : 0.2rem;
  }
  .sortAticalAll>h4{
    color: #333;
    margin-left : 0.2rem;
  }
  .classAndUser{
    margin-top : 0.15rem;
    /*background : #fff;*/
    border-radius : 30px 0px 30px 0px;
    display : flex;
  }
  .classAndUser>img{
    width : 0.5rem;
    height : 0.5rem;
    border-radius : 50%;
    margin-left : 0.2rem;
    margin-top : 0.15rem;
  }
  .classAndUser>p{
    margin-left : 0.2rem;
    margin-top : 0.15rem;

  }
  .datailGood{
    display: flex;
    margin-left : 0.2rem;
  }
  .noMore{
    margin-top : 0.3rem;
    text-align : center;
  }
  #night{
    color: #fff;
    background-color:#373535;
  }
  #night .sortAticalAll, #night .sortAtical{
    background-color: rgba(100, 100, 100, 0.5);
  }
  #night p, #night h4{
    color: lightgray;
  }
</style>
