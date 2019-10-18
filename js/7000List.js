define(["jquery"],function($){
    //列表页数据加载
    function main(){
        $.ajax({
            type: "get",
            url: "../data/List.json",
            success: function(data){
                var obj = data; 
                for(var i in obj){
                    var node = $(`<div class="main">
                            </div>`).appendTo(".mainbox");
                    var arr = obj[i];
                    // alert(arr);
                    // alert(arr.length);
                    for(var j = 0; j < arr.length; j++){
                        $(`<div class="goods_item">
                        <a href="" class="goods_img">
                            <img src="../images/${arr[j].img}" alt="">
                        </a>
                        <a href="" class="goods_title">${arr[j].title}</a>
                        <span>${arr[j].price}</span>
                    </div>`).appendTo(node);
                    }
                } 
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //给每个数据添加移入移出效果
    function data(){
        $(".mainbox").on("mouseenter",".main .goods_item",function(){
            $(this).css({
                "backgroundColor": "#fff",
                "boxShadow": "2px 2px 2px 2px #8c8c8c"
            })
        })

        $(".mainbox").on("mouseleave",".main .goods_item",function(){
            $(this).css({
                "backgroundColor": "#fff",
                "boxShadow": "0 0 0 0 #fff"
            })
        })
    }


    //底部六个圆
    function footer(){
        $(".footerbox").find(".footer").find("ul").find("li").find("a").find("aside").mouseenter(function(){
            this.style.backgroundColor = "#4a73ff";
            this.style.color = "white";
        })

        $(".footerbox").find(".footer").find("ul").find("li").find("a").find("aside").mouseleave(function(){
            $(".footerbox").find(".footer").find("ul").find("li").find("a").find("aside").css({
                "backgroundColor" : "#fff",
                "color": "#929292"
            })
        })
    }

    //右侧客服始终在页面中间位置显示
    function center(){
        //右侧客服点击
        $("#img").click(function(){
            $("#sec").css({
                "display": "block"
            })
        })

        $("#narrow").click(function(){
            $("#sec").css({
                "bottom": -315,
            });

            $("#narrow").css({
                "display": "none"
            });

            $("#enlarge").css({
                "display": "block"
            });

            $("#enlarge").click(function(){
                $("#sec").css({
                    "bottom": 0
                });

                $("#narrow").css({
                    "display": "block"
                });
    
                $("#enlarge").css({
                    "display": "none"
                });
            })
        })
    }

    //回到顶部
    function scroll(){
        $(window).bind("scroll",function(){
            if(($(window).scrollTop()) >= 450){
                $("#returnTop").css({
                    "display": "block"
                })
            }else{
                $("#returnTop").css({
                    "display": "none"
                })
            }
        })

        $("#returnTop").click(function(){
            $(window).scrollTop(0);
        });
    }
    //对外暴露
    return {
        //列表数据加载
        main: main,
        //给数据添加移入移出
        data: data,
        //底部六个圆
        footer: footer,
        //右侧客服
        center: center,
        //回到顶部
        scroll: scroll
    }
})