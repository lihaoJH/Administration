const mutations={
    //保存token
    COMMIT_TOKEN(state,object){
        state.token=object.token;
    },
    addOpenList(state,arr){
        state.openList=arr;
    },
    updateUserInfo(state,info) {
        state.userInfo=JSON.parse(JSON.stringify(info));
    },
    RESET_STATE(state){
        for(let key in state){
           if(typeof state[key]=="object"){
               state[key]=Array.isArray(state[key])?[]:{};
           } ;
           state[key]="";
        }
    },
    updateRouter(state,arr){
        state.routerList=JSON.parse(JSON.stringify(arr));
    }
}
export default mutations;