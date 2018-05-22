<template lang='html'>
  <div class="commend" :id="model">
    <mt-header title="发表文章" class="mt_header" style="background: #ffd900;font-size:20px">
      <div slot="left">
        <mt-button @click="back()" icon="back" style="font-size:16px">返回</mt-button>
      </div>
    </mt-header>
    <div class="commentCount">
      <p>发表文章</p>
    </div>
    <div class="line"></div>
    <input class="add-title" v-model="title" type="text" name="" value="" placeholder="添加标题">
    <div class="line"></div>
    <textarea v-model="content" placeholder="添加文章"></textarea>
    <div class="userCom">
      <div>
        <button type="button" class="mui-btn mui-btn-primary" style="margin: 10px 5px" @click="chooseType()">{{type}}</button>
        <button type="button" class="mui-btn mui-btn-primary" style="margin: 10px 0px" @click="chooseOpenType()">{{openOrNo}}</button>
      </div>
      <button type="button" class="mui-btn mui-btn-primary" style="margin: 10px 5px" @click="sendBtn()">发表</button>
    </div>
    <mt-popup v-model="popupVisible" class="changephoto" position="middle">
      <p>请选择文章类型</p>
      <div class="article-type">
        <img v-for="(item, index) in typeNum" :src="'http://p5tu13q99.bkt.clouddn.com/icon' + index  + '.png'" alt="" @click="articleType(index)">
      </div>
    </mt-popup>
    <mt-popup v-model="visible" class="changephoto" position="middle">
      <p>请选择文章类别</p>
      <div class="article-type">
        <img style="margin: 20px 15px" src="http://p5tu13q99.bkt.clouddn.com/suo0.png" @click="openOrUnopen('非公开')" alt="">
        <img style="margin: 20px 15px" src="http://p5tu13q99.bkt.clouddn.com/suo1.png" @click="openOrUnopen('公开')" alt="">
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import axios from 'axios';
  // 引入 mint－ui的Indicator模块
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        content: '',
        title: '',
        userid: '',
        classid: '',
        typeNum: ['001', '002', '003', '004', '005', '006'],
        typeName: ['MySql', 'CSS', 'H5', 'interview', 'project', 'JS'],
        type: '选择文章类型',
        openOrNo: '选择文章类别',
        popupVisible: false,
        visible: false,
        text: ''
      }
    },
    methods: {
      back() {
        history.back();
      },
      chooseType() {
        this.popupVisible = true
      },
      chooseOpenType() {
        this.visible = true
      },
      articleType(i) {
        this.type = this.typeName[i]
        this.classid = this.typeNum[i]
        this.popupVisible = false
      },
      openOrUnopen(type) {
        this.openOrNo = type
        this.visible = false
        if (type == '非公开') {
          this.text = '[非]' + this.content
        } else{
          this.text = this.content
        }
      },
      sendBtn() {
        let content = this.text.split("\n").join("<br />")
        console.log(content)
        if (this.content != '' && this.title != '' && this.classid != '') {
          axios.post('http://txspring.cn:8010/sendDetailPages', this.qs.stringify({
            content: content,
            title: this.title,
            userid: this.userid,
            classid: this.classid
          })).then((res) => {
            if (res.data.type == '1') {
              Toast({
                message: '文章发表成功',
                position: 'bottom',
                duration: 3000
              });
              if (this.text.slice(0,3) === '[非]') {
                this.$router.push('/shop')
              } else {
                this.$router.push('/home')
              }
            } else {
              Toast({
                message: '文章发表失败',
                position: 'bottom',
                duration: 3000
              });
            }
            //this.$router.push('/mine/article')
          }).catch((error) => {
            console.log(error)
          })
        } else {
          if (this.title== '') {
            Toast({
              message: '标题不能为空',
              position: 'bottom',
              duration: 3000
            });
          }else if (this.content== '') {
            Toast({
              message: '内容不能为空',
              position: 'bottom',
              duration: 3000
            });
          } else if (this.classid == '') {
            Toast({
              message: '请选择文章类别',
              position: 'bottom',
              duration: 3000
            });
          }
        }
      }
    },
    created() {
      this.userid = localMessage.get("userid");
      // console.log(this.userid)
    },
    computed: {
      model() {
        document.body.className = this.$store.getters.changeModel
        return this.$store.getters.changeModel;
      }
    }
  }
</script>

<style lang='css'>
  .mt_header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .commentCount {
    display: flex;
    height: 0.5rem;
    margin-top: 0.7rem;
    background: #fff;
  }

  .commentCount>p {
    margin-left: 0.15rem;
    color: #333;
    margin-top: 5px;
  }

  .commentCount span {
    color: gray;
    line-height: 0.5rem;
    padding-left: 0.1rem;
  }

  .commentBox {
    /*margin-top : 0.5rem;*/
  }

  .commentList {
    background: #fff;
    margin-bottom: 0.15rem;
    display: flex;
    justify-content: space-around;
  }

  .commentList>img {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    margin-top: 0.1rem;
    /*margin-left : 0.2rem;*/
  }

  .commentList>a {
    display: block;
    height: 0.6rem;
    font-size: 0.25rem;
    padding-top: 0.2rem;
    margin-right: 0.2rem;
  }

  .contentList {
    width: 4rem;
  }

  .contentList>p {
    margin-top: 0.1rem;
  }

  .contentList>h5 {
    margin-bottom: 0.3rem;
  }

  .userText {
    font-size: 0.25rem;
  }

  .contentText {
    padding-top: 0.2rem;
    font-size: 0.3rem;
    color: #000;
  }

  .userCom {
    width: 100%;
    background: #fff;
    box-shadow: 1px 1px 5px lightgray;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    display: flex;
    justify-content: space-between;
  }

  .userCom>input {
    border: none;
    width: 4.75rem;
    margin-top: 0.25rem;
    font-size: 14px;
    border-bottom: 1px solid lightgray;
  }

  .mui-btn {
    line-height: 0.43rem;
    height: 0.65rem;
    margin-top: 0.25rem;
    margin-left: 0.15rem;
    background-color: #ffd900;
    outline: none;
    border: 1px solid #724d06;
  }

  .noMore,
  .nullShow {
    margin-top: 0.3rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  div#night {
    color: #c7c7c7;
    background-color: #4b4b4b;
  }

  div#night input,div#night textarea, div#night .commentCount{
    color: #c7c7c7;
    background-color: rgba(100,100,100,0.5);
  }

  div#night .commentCount p{
    color: #c7c7c7;
  }
  div#night .line{
    background-color: #4b4b4b;
  }
  div#night .contentText {
    color: #C7C7C7;
  }
  div#night .userCom>input{
    color:#c7c7c7;
  }
  textarea{
    height: 450px;
    width: 100%;
    color: #333;
    margin-bottom: -10px;
    padding-bottom: 0;
    border: none;
  }
  .line{
    height: 10px;
    background-color: #efeff4;
  }
  input.add-title{
    margin-bottom: 0;
    border: none;
    color: #666;
  }
  .article-type img{
    width: 1.0rem;
    height: 1.0rem;
    margin: 10px 15px 0px 20px;
  }
  .changephoto{
    width: 70%;
    border-radius: 50px;
    padding: 20px;
    background-color: #f9f9f9;
    text-align: center;
  }
  .night{
    background: #4b4b4b;
  }
</style>
