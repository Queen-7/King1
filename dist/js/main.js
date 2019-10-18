console.log("121212");

/*  
    配置所有引入的.js文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "7000首页": "7000首页",
        "LeftSide": "LeftSide",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

//遵从AMD规范编写代码  
require(["7000首页"],function(Mall){
    Mall.download();
    //banner图加载
    Mall.banner();
    //主页数码配件数据加载
    Mall.mainDownload();
    //右侧客服始终在页面中间位置显示
    Mall.center();
    //回到顶部
    Mall.scroll();
    //底部六个圆
    Mall.footer();
    //banner图下登录注册块移入移出
    Mall.login();
    //统计商品数量
    Mall.sc_num();
    
})

require(["LeftSide"],function(Left){
    //三个标题
    Left.leftside();
    //给Ali添加移入移出事件让div显示出来
    Left.move();
    /* //左侧内部数据头部
    Left.title(); */
})
