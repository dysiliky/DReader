<template lang="html">
  <div class="allweather">
    <div class="weatherhead">
      <mt-header title="Weather" style="background: #ffd900">
        <span @click="back()" slot="left">
          <mt-button  icon="back">返回</mt-button>
        </span>
      </mt-header>
    </div>
    <div class="reserach">
      <input type="search" @keyup.enter="showCityWeacher()" v-model="city" placeholder="请输入城市">
      <p @click="showCityWeacher()">ok</p>
    </div>
    <div class="weatherbody">
      <p class="city">{{data.city}}</p>
      <div class="tem">
        <p class="temperture">{{data.wendu}}</p>
        <p class="du">o</p>
        <p class="cdu">c</p>
        <p class="type">{{today.type}}</p>
      </div>
      <p class="aqi">Clear | AQI {{data.aqi}} </p>
      <div class="bottomitem">
        <p class="windy">{{today.fengxiang}}</p>
        <!-- <p>{{today.fengli}}</p> -->
        <!-- <p class="mark">{{data.ganmao}}</p> -->
      </div>
    </div>
    <div class="futrue-weather">
      <div class="small">
        <canvas id="myChart2" width="320px" height="350px"></canvas>
      </div>
    </div>
  </div>

</template>

<script>
  //引入chartjs
  import Chart from 'chart.js'
  import { Indicator } from 'mint-ui';
export default{
  data(){
    return{
      data:'',
      today:'',
      city: '',
      day: [],
      tem:[]
    }
  },
  created(){
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
    this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(data=>{
      let temp=data.data.data;
      this.data=temp;
      console.log(this.data);
      let forecast=temp.forecast;
      let fx=forecast[0].fengxiang;
      this.windy=fx;
      this.today=forecast[0];
      console.log(this.today);
      // 折线图的数据
      for(var i=0;i<forecast.length;i++) {
        var day = forecast[i].date;
        this.day.push(day);
        var low = parseInt(forecast[i].low.slice(3, 5));
        var high = parseInt(forecast[i].high.slice(3, 5));
        var tem = parseFloat((low + high) / 2);
        this.tem.push(tem);
      }
    })
  },
  mounted(){
    //由于setTimeout中指针指向window，因此在这保存指针指向，使_this指向vue组件对象
    let  _this = this;
    setTimeout(_this.weather, 800);

    // 绘制折线图
    //由于axios的请求异步，所以需要设置一个延时定时器，使其能够收到请求下来的数据
    setTimeout(_this.writeLine, 1000);
  },
  methods:{
    back(){
      history.back();
    },
    showCityWeacher(){
      if (this.city != '') {
        this.day = []
        this.tem = []
        this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city).then(data=>{
          let temp=data.data.data;
          this.data=temp;
          console.log(this.data);
          let forecast=temp.forecast;
          let fx=forecast[0].fengxiang;
          this.windy=fx;
          this.today=forecast[0];
          console.log(this.today);
          this.weather()
          // 折线图的数据
          console.log(forecast)
          for(var i=0;i<forecast.length;i++) {
            var day = forecast[i].date;
            this.day.push(day);
            var low = parseInt(forecast[i].low.slice(3, 5));
            var high = parseInt(forecast[i].high.slice(3, 5));
            var tem = parseFloat((low + high) / 2);
            this.tem.push(tem);
          }
          this.writeLine()
        })
      }
    },
    weather() {
      let weatherbody=document.querySelector('.weatherbody');
      console.log(this.today.type.indexOf("雨") , '========================')
      if(this.today.type=='晴'){
        console.log(1);
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/shine.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else if (this.today.type=='雷') {
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/thunder.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else if (this.today.type.indexOf("雨")>=0) {
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/rain.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else if (this.today.type.indexOf("雪")>=0){
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/snow.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }else{
        weatherbody.style.background="url(http://oz033lzfm.bkt.clouddn.com/cloudy.gif) no-repeat"
        weatherbody.style.backgroundSize="100% 100%"
      }
    },
    writeLine(){
      //获取到canvas画布
      let ctx2 = document.getElementById("myChart2");
      let myChart2 = new Chart(ctx2, {
        //type属性表示图形形状:line:折线图;bar:柱状图 ;Radar:雷达图/蛛网图 ;doughnut:圆环图 ;pie:饼图 ;polarArea:极地区域图;bubble：气泡分布图;scatter：散点图
        type: "line",
        data: {
          //横坐标的数据,数组类型
          labels: this.day,
          datasets: [
            {
              //标题
              label: "未来五天天气预测",
              //背景颜色
              backgroundColor: "rgba(225,10,10,0.3)",
              //边框颜色
              borderColor: "rgba(225,103,110,1)",
              //边框宽
              borderWidth: 1,
              //数据点边框颜色
              pointStrokeColor: "#fff",
              //数据点颜色
              pointStyle: "crossRot",
              //纵坐标的数据，数组类型
              data: this.tem,
              cubicInterpolationMode: "monotone",
              spanGaps: "false",
              // animation: true,
              fill: "false"
              //详细网址：http://m.blog.csdn.net/macanfa/article/details/50994593
            }
          ]
        }
      });
      let data = myChart2.config.data;
      data.labels = this.day;
      data.datasets[0].data = this.tem;
      Indicator.close();

    }
  }
}
</script>

<style lang="css" scoped>
  *{
    margin: 0;
  }
  .allweather{
    background-color: #fff;
  }
  .weatherbody{
    height: 220px;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
  }
  .city{
    color:#fff;
    font-size: 24px;
    font-family: cursive;
    margin: 0;
    margin-left: 35px;
    padding-top: 25px;
  }
  .temperture{
    color: #fff;
    margin-left: 30px;
    font-size: 64px;
    margin-top: 10px;
  }
  .tem{
    width: 100%;
    height: 80px;
  }
  .tem>p{
    float:left;
    margin-top: 30px;
  }
  .du{
    display: inline-block;
    vertical-align: top;
    font-size:18px;
    font-weight: bold;
    color:#fff;
    padding-left: 0;
    margin-top: 10px;
  }
  .cdu{
    display: inline-block;
    font-size: 32px;
    /*font-weight: bold;*/
    color:#fff;
    vertical-align: top;
    margin-top: 2px;
    margin-left: 1px;
  }
  .type{
    color:#fff;
    font-size: 50px;
    font-family: cursive;
    margin: 0;
    margin-left: 30px;

  }
  .windy{
    color:#fff;
    font-size: 30px;
    font-family: cursive;
    margin: 0;
    margin-left: 30px;
    padding-top: 13px;
  }
  /*.mark{
    color:#fff;
    font-size: 24px;
    font-family: cursive;
    margin: 0;
    margin-left: 30px;
    padding-top: 113px;
    text-indent: 1em;
  }*/
  .aqi{
    color: #fff;
    font-size: 20px;
    margin-left: 30px;
  }
  .mint-searchbar-inner{
    background-color: transparent;
  }
  .mint-search{
    height: 40px;
    background: #d9d9d9;
    height: 100%;
  }
  .reserach{
    width: 100%;
    height: 40px;
    background-color: #d9d9d9;
    overflow: hidden;
  }
  .reserach>input{
    width: 85%;
    border-radius: 4px;
    float: left;
    margin-top: 5px;
    height: 30px;
    margin-bottom: 0;
    background-color: #fff;
    text-align: left;
    margin-left: 10px;
    padding: 0;
    padding-left: 15px;
  }
  .reserach>p{
    float: left;
    width: 10%;
    text-align: center;
    font-weight: bold;
    color: #5599ff;
    padding-top: 10px;
    padding-left: 10px;
  }
  .small {
    width: 100%;
    height: 100%;
    margin: 0;
    padding-left: 18px;
    padding-top: 5px;
    background: rgb(255,255,255);
  }
</style>
