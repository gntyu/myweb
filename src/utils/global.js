window.myglobal={
    setLastSys:(sys)=>{
        // console.log('window.myglobal',window.myglobal)
        window.myglobal.lastSys=sys;
    },
    setLastCheck:(check)=>{
        window.myglobal.lastCheck=check;
    },
    lastSys:'',
    lastCheck:[],
};//声明一个全局的对象,用于存储菜单路由映射，页面title展示菜单name