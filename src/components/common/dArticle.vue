<template>
  <div class="sortPage" :id="model">
    <div class="bookNav">
      <div v-for="(item, index) in types" @click="pushToAllArticle(item.classid, item.classname)">
        <img :src="'http://p5tu13q99.bkt.clouddn.com/icon' + index + '.png'">
      </div>
    </div>
    <div>
      <h4 class="sortAtical">全部非公开文章</h4>
      <div  class="sortAticalAll"  v-for="(sort, i) in articles" v-if="userid === sort.userid&sort.detailpagecontent.slice(0,3) === '[非]'" @click="tobdetailarticleview(sort.detailpageid)">
        <div class="classAndUser">
          <img :src="sort.userphoto" alt="">
          <p>文章作者: {{sort.userid}}</p>
          <p>来自话题: {{sort.classname}}</p>
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
    <div style="height: 80px">

    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  export default {
    data () {
      return {
        types: [],
        articles : [],
        id : this.$route.params.detailid,
        userid : ''
      }
    },
    methods: {
      back(){
        history.back();
      },
      // 获取到某篇文章，通过路由传参进入文章详情
      tobdetailarticleview(num){
        console.log(num);
        this.$router.push('/bdetailarticle/'+ num);
      },
      pushToAllArticle(classid, classname) {
        localMessage.set('articletypes', classname)
        this.$router.push('/article/' + classid)
      }
    },
    // 请求某个分类的文章
    created(){
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
      // 请求某个类所有的文章
      this.axios.get('http://txspring.cn:8010/getAllClass').then((data)=>{
        this.types = data.data;
        console.log(this.types)
        // Indicator.close();
      });
      this.userid = localMessage.get("userid");
      this.axios.get('http://txspring.cn:8010/getAllArticleDesc').then(data=>{
        this.articles = data.data;
        console.log(this.articles, '==============');
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
  .bookNav{
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /*flex-direction: row;*/
  }

  .bookNav img{
    height: 30px;
    width: 30px;
    margin: 10px auto;
    margin-left: 1px;
  }
  .sortPage{
    /*background-color: #f6f6f6;*/
  }
  .sortAtical{
    height : 0.8rem;
    padding-left : 0.2rem;
    line-height : 0.8rem;
    background : #fff;
    font-size : 0.28rem;
    color : #666;
    margin-bottom: -5px;
    /*border-bottom: 1px solid #333;*/
  }
  .sortAticalAll{
    background : #fff;
  }
  .sortAticalAll .detail-content{
    /*width : 93%;*/
    height : 1.42rem;
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
  .more{
    text-align: center;
  }
  .more>p{
    display: inline-block;
    margin-top : 0.3rem;
    background: #fff;
    border-radius: 20px;
    padding: 5px 20px;
    text-align: center;
    color: #333;
  }
  #night{
    color: #fff;
    background-color:#3f3c3c;
  }
  #night .sortAticalAll, #night .sortAtical{
    background-color: rgba(100, 100, 100, 0.5);
  }
  #night p, #night h4{
    color: lightgray;
  }
  #night .bookNav, #night .more p{
    background-color: rgba(255, 255, 255, 0.3);
  }
</style>
