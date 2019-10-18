/* 
    配置所有引入的.js文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie", 
        "7000buys": "7000buys"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

//遵从AMD规范编写代码 
require(["7000buys"],function(buys){
    //猜你喜欢商品加载
    buys.like();
    //底部六个圈
    buys.footer();
    //右侧客服
    buys.center();
    //回到顶部
    buys.scroll();
    //猜你喜欢轮播
    buys.like_banner();
    //列表页数据
    buys.Cookie();
    //列表页加减
    buys.Add();
    //删除商品数据
    buys.Delete();
    /* //
    buys.Click(); */
})