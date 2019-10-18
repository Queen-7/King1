define(["jquery","Parabola"],function($){
    //抛物线函数
    function ballMove(oBtn){
        //小球位置显示在加入购物车按钮这个位置
        $("#ball").css({
            display:"block",
            left: $(oBtn).offset().left,
            top: $(oBtn).offset().top
        })

        var X = $(".headerbox .header aside .cgd").offset().left - $(oBtn).offset().left;
        var Y = $(".headerbox .header aside .cgd").offset().top - $(oBtn).offset().top;

        //创建一个抛物线对象
        var bool = new Parabola({
            el: "#ball",
            offset: [X,Y],
            duration: 800,
            curvature: 0.0005,
            callback: function(){
                $("#ball").hide();
            }
        });
        //开始运动
        bool.start();
    }

    //对外暴露
    return {
        ballMove: ballMove
    }

})