<template lang="html">
	<div class="mineunder" :id="model">
		<p class="jiange"></p>
		<router-link to="/mine/create">
			<div class="child" v-if="showcreate" :id="model">
				<span>发表文章</span>
				<img slot="icon" src="http://oz033lzfm.bkt.clouddn.com/riji.png" width="24" height="24">
			</div>
		</router-link>
    <router-link to="/mine/article">
      <div class="child" :id="model">
        <span>我的文章</span>
        <img slot="icon" src="../../../static/images/article.png" width="24" height="24">
      </div>
    </router-link>
		<router-link to="/mine/collection">
			<div class="child" :id="model">
				<span>我的收藏</span>
				<img slot="icon" src="http://oz033lzfm.bkt.clouddn.com/soucang.png" width="24" height="24">
			</div>
		</router-link>
		<p class="jiange"></p>
    <router-link to='/mine/weather'>
      <div class="child" :id="model">
        <span>我的天气</span>
        <img slot="icon" src="http://oz033lzfm.bkt.clouddn.com/tianqi.png" width="24" height="24">
      </div>
    </router-link>
		<div class="child" :id="model">
			<span @click="changeModel">{{this.$store.getters.changeModelText}}</span>
			<img slot="icon" :src="this.$store.getters.changeModelImgSrc" width="24" height="24">
		</div>
		<router-link to='/mine/location'>
			<div class="child" :id="model">
				<span>我的位置</span>
				<img slot="icon" src="http://oz033lzfm.bkt.clouddn.com/diliweizhi.png" width="24" height="24">
			</div>
		</router-link>
		<div @click="aboutme()">
			<div class="child" :id="model">
				<span>关于软件</span>
				<img slot="icon" src="http://oz033lzfm.bkt.clouddn.com/guanyu.png" width="24" height="24">
			</div>
		</div>

		<div class="exitBtn" @click="exit()">
			<mt-button size="large" type="danger" style="margin-bottom: 50px">退出登录</mt-button>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'personal',
		data() {
			return {
				showcreate: true
			}
		},
		created() {
			if(localMessage.get("usercanuser") == "1") {
				this.showcreate = true;
			}
		},
		methods: {
			aboutme() {
				MessageBox({
					title: 'DReader',
					message: 'dysiliky开发，版本1.0',
				})
			},
			exit() {
//			  清口localstorage
				localMessage.clear();

				this.$store.getters.changeModelExit;
				this.$router.push("/");

			},
			changeModel() {
				this.$store.dispatch('changeModel');
			}
		},
		computed: {
			model() {
				document.body.className = this.$store.getters.changeModel
				return this.$store.getters.changeModel;
			}
		}
	}
</script>
<style lang="css" scoped>
  .mineunder{
    padding-bottom: 50px;
  }
	.mineunder .list {
		padding-left: 8px;
		padding-right: 20px;
		border: 1px solid #ededed;
	}

	.exitBtn {
		margin-top: 0.4rem;
		margin-left: 10px;
		margin-right: 5px;
	}
	/*间隔大小*/

	.jiange {
		/*margin-top: 0.3rem;*/
		/*srr 我在此处做了2行代码的修改，因为日间/夜间模式切换效果太丑了*/
		height: 0.3rem;
		background-color: #EFEFF4;
	}

	.child>span {
		float: right;
		color: #000;
		margin-top: 15px;
		margin-right: 15px;
		font-size: 15px;
		color: #888;
		font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;
	}

	.child>img {
		margin-left: 15px;
		margin-top: 15px;
	}

	.child {
		height: 50px;
		background-color: #fff;
		border: 1px solid #ededed;
	}

	.morning {
		color: #c7c7c7;
		background-color: #EFEFF4;
	}

	.night {
		color: #999;
		background-color: #EFEFF4;
	}
  #night .child{
    background-color: rgba(100, 100, 100, 0.5);
    border: 1px solid #373535;
  }
	#morning {
		color: #c7c7c7;
		background-color: #fff;
	}

	#night {
		color: #c7c7c7;
		background-color: #373535;
	}

	.morning .jiange {
		background-color: #EFEFF4;
	}

	.night .jiange {
		background-color: #373535;
	}
	p{
		margin: 0;
	}
</style>
