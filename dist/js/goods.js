console.log("加载成功");

/* 
    配置所有引入的.js文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie", 
        "7000goods": "7000goods",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"]
    }
})

//遵从AMD规范编写代码 
require(["7000goods"],function(goods){
    //回到顶部
    goods.scroll();
    //底部六个圈
    goods.footer();
    //放大镜
    goods.mark();
    //右侧客服
    goods.center();
    // 取地址栏数据
    goods.goods();
    //下面商品详情大图
    goods.rightImg();
    //给加入购物车按钮添加点击事件
    goods.shoppingCar();
    //加减按钮
    goods.Add();
})
