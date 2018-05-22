import Vue from 'vue'
import Router from 'vue-router'
//导入mintui
import mintui from 'mint-ui';
import 'mint-ui/lib/style.min.css'
//导入axios  qs模块  并在全局声明使用
import axios from 'axios';
import qs from 'qs'
Vue.prototype.axios=axios;
Vue.prototype.qs=qs;
//导入vuex模块
import Vuex from 'vuex'
//导入swiper模块
import { Swipe, SwipeItem } from 'mint-ui'
import Swiper from '@/components/common/dSwiper'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
//
import footerbottom from '@/components/common/footerbottom'
//导入home   classes  shop   mine
import home from '@/components/pages/home'
import mine from '@/components/pages/mine'

//a
import minecreate from '@/components/page/mineCreate'
import minecollection from '@/components/page/mineCollection'
import { Lazyload } from 'mint-ui';

import shop from '@/components/pages/shop'

import loginandregister from '@/components/pages/loginandregister'
import updateinfo from '@/components/page/updateinfo'
//b
import  bloandreg from '@/components/pages/bLoAndReg'
import bdetailarticle from '@/components/page/bdetailarticle'
//d
import allbooks from '@/components/page/dAllbooks'
import allarticle from '@/components/page/dAllArticle'
import bookdetail from '@/components/page/dDetails'
import weather from '@/components/page/mineWeather'
import minelocation from '@/components/common/minelocation'
import mineArticle from '@/components/page/mineArticle'
//c
import category from '@/components/pages/category'
import cCategoryList from '@/components/page/cCategoryList'
import cCommentPage from '@/components/page/cCommentPage'

Vue.use(mintui);
Vue.use(Router);
Vue.use(Vuex)
Vue.use(Lazyload);

let router = new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    // 一级所有路由
    {path: '/',name: 'bloandreg',component: bloandreg},
    {path: '/home',name: 'home',component: home},
    {path: '/mine',name: 'mine',component: mine},
    {path: '/shop',name: 'shop',component: shop},
    {path: '/category',name: 'category',component: category},
    // a 我的模块路由
    {path:'/mine/updatemine',component:updateinfo},
    {path:'/mine/create',component:minecreate},
    {path:'/mine/collection',component:minecollection},
    //d 商城模块分类
    {path: '/allbooks/:id',component:allbooks},
    {path: '/article/:id',component:allarticle},
    {path: '/bookdetail/:id',component:bookdetail},
    {path:'/mine/weather',component:weather},
    {path:'/mine/location',component:minelocation},
    {path:'/mine/article',component:mineArticle},
    //c 分类模块分类
    {path:'/category/categorydetailu',name:'categorydetailu',component:cCategoryList},
    // {path:'/category/categorydetailu/:id',component:cCategoryList},

    // 首页模块分类(首页模块跳入文章详情)
    {path: '/bdetailarticle/:id',name: 'bdetailarticle',component: bdetailarticle},
    //b  文章详情（文章详情跳入评论页面）
    {path: '/cCommentPage/:id',name: 'cCommentPage',component: cCommentPage}
  ]
})
export default router
