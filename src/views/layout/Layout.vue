<template>
    <div id="app" v-show="isChen">
         <div class="sild">
             <sild-menu></sild-menu>
         </div>
         <div class="main">
             <div class="header">
                 <user-bar></user-bar>
             </div>
             <div class="content">
                 <router-view></router-view>
             </div>
         </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import SildMenu from "@views/layout/sild/SildMenu.vue";
import UserBar from "@views/layout/userBar/UserBar.vue";
    export default {
        name:"Layout",
        data(){
            return{
                isChen:false
            }
        },
        components:{
            SildMenu,UserBar
        },
        computed:{
            ...mapState(["userInfo"])
        },
        created(){
            this.isChen=JSON.stringify(this.userInfo)!="{}";
        }

    }
</script>

<style lang="less" scoped>
    .sild{
        width: 200px;
        height: 100%;
    }
    .main{
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        .header{
            width: 100%;
            height: 60px;
        }
        .content{
            width: 100%;
            flex: 1;
            display: flex;
            background-color: #eee;
            padding: 20px;
            overflow: hidden;
            box-sizing: border-box;
        }
    }
</style>