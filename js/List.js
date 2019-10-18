console.log("Yes!");
/* 
    配置所有引入的.js文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "7000List": "7000List"
    },
    shim: {
        //设置依赖关系  先引入jquery.js 然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

//遵从AMD规范编写代码
require(["7000List"],function(list){
    //数据加载
    list.main();
    //给数据添加移入移出
    list.data();
    //底部六个圆
    list.footer();
    //右侧客服
    list.center();
    //回到顶部
    list.scroll();
})