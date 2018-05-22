<template>
  <div class="mine" :id="model">
    <!--mine中的header-->
    <mt-header fixed title="MySelf" style="background: #ffd900;color:#724d06;" :class="model"></mt-header>
    <!--mine中的头像部分-->
    <minemain class="margintop"></minemain>
    <!--mine中的选项部分-->
    <mineunder></mineunder>
    <!--mine中的bottom-->
    <footerbottom :usermodel='usermodels'  v-if="usermodels"></footerbottom>
  </div>
</template>

<script>
  import minemain from '@/components/common/minecom'
  import footerbottom from '@/components/common/footerbottom'
  import mineunder from '@/components/common/mineunder'
  export default {
    name: 'mine',
    data(){
      return {
        usermodels:{}
      }
    },
    components:{
      minemain,
      footerbottom,
      mineunder
    },
    computed:{
      model() {
        document.body.className = this.$store.getters.changeModel
        return this.$store.getters.changeModel;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        .mine .margintop{
          margin-top: 44px;
          height: 100%;
        }
		    #night{
		    	 color: #fff;
		       background-color:#373535;
		    }
</style>
