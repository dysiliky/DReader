<template lang="html">
	<div class="ahotpage" :class="model">
		<ul>
			<li v-for="item in result" v-if="item.detailpagecontent.slice(0,3) != '[非]'" @click="todetailarticleView(item.detailpageid)">
				<div class="conHeader">
					<img :src="item.userphoto" alt="" />
					<p>{{fromWhich}}&nbsp;<span class="sorts">{{item.classname}}</span></p>
				</div>
				<div class="artTitle">
					<h3>{{item.detailpagetitle}}</h3>
				</div>
				<div class="detailCon">
          {{item.detailpagecontent}}
				</div>
				<div class="conFooter">
					<p class="agree"><span>{{item.detailpagegood}}</span>赞同·</p>
					<p class="comments"><span>{{item.detailpagecount}}</span>阅读·</p>
					<p class="careproblem">{{careProblem}}</p>
				</div>
			</li>
		</ul>

	</div>
</template>

<script>
	import rem from '../../../static/js/rem.js'
	import axios from 'axios'
  import { Indicator } from 'mint-ui';
	export default {
		name: 'ahotpage',
		data() {
			return {
				//全部内容
				result: {},
				fromWhich: '来自话题:',
				careProblem: '关注问题'
			}
		},
		methods: {
			//点击该动态跳转到详情页面
			todetailarticleView(num){
//				console.log('hahahahh')
				this.$router.push('/bdetailarticle/'+num)
			}
		},
		created() {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
			//获取到所有热门内容
      axios.get('http://txspring.cn:8010/getAllArticleCount').then((response) => {
        this.result = response.data;
        Indicator.close();
      }).catch((error) => {
        console.log(error)
      });
		},
		components: {

		},
		computed:{
			model(){
				//获取当前是日间/夜间模式
				return this.$store.getters.changeModel;
			}
		}

	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		font-family: "arial", "simsun", "microsoft yahei";
	}
	.ahotpage {
		margin-top: 1.4rem;
		position: relative;
		z-index: 99;
    	background: #f6f6f6;
	}

	.ahotpage ul {
		margin-top: 0.2rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.ahotpage ul li {
		width: 100%;
		height: 3.2rem;
		background-color: #fff;
		border: 1px solid #ececec;
		margin-top: 0.05rem;
	}

	.ahotpage .conHeader,
	.ahotpage .artTitle,
	.ahotpage .conFooter {
		margin-left: 0.3rem;
		margin-top: 0.2rem;
	}

	.ahotpage .detailCon {
		margin-left: 0.3rem;
	}

	.ahotpage .conHeader {
		height: 0.4rem;
	}

	.ahotpage .conHeader img,
	.ahotpage .conHeader p {
		float: left;
	}

	.ahotpage .conHeader p {
		margin: 0.1rem 0 0 0.2rem;
	}

	.ahotpage .conHeader img {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
	}

	.ahotpage .artTitle h3 {
    font-size: 0.27rem;
    line-height: 0.32rem;
    color: #333;
    width: 95%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	}

	.ahotpage .detailCon {
    width: 92%;
    height: 1.4rem;
    line-height: 0.35rem;
    margin-top: 5px;
    font-weight: bolder;
    font-size: 0.25rem;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 4 !important;
    -webkit-box-orient: vertical !important;
    word-break: break-all;
    color: #555;
	}

	.ahotpage .conFooter .agree,
	.ahotpage .conFooter .comments {
		float: left;
		margin: 0 0.1rem 0 0;
	}
  .night {
    color: #fff;
    background-color: #373535;
  }

  .night .ahotpage ul li {
    color: #fff;
    background-color: rgba(100, 100, 100, 0.5);
    border: none;
  }

  .night .ahotpage ul li .artTitle h3 {
    color: lightgray;
  }

  .night .ahotpage ul li .detailCon, .night .ahotpage ul li p{
    color: #d9d9d9;
  }
</style>
