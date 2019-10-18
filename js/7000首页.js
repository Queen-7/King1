define(["jquery",'jquery-cookie'],function($){
    //banner图
    function download(){
        //下载数据，将数据添加到页面上
        $.ajax({
            type: 'get',
            url: "../data/MainContent.json",
            success: function(data){
                //alert(data);
                //1.取出轮播图的数据
                var arr = data.banner;
                //2、遍历循环，创建节点添加到页面上
                for(var i = 0; i < arr.length; i++){
                    $(`<li>
                        <a href="${arr[i].url}">
                            <img src="../images/${arr[i].img}" alt="">
                        </a>
                    </li> `).appendTo("#banner #imgList")

                    if(i == 0){
                        $(`<li><a href="" class="active"></a></li>`).appendTo("#banner ol")
                    }else{
                        $(`<li><a href=""></a></li>`).appendTo("#banner ol")
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //添加切换效果，上下运动
    function banner(){
        var iNow = 0;//代表当前图片的下标
        var aImgs = null; //记录所有图片
        var aBtns = null; //记录所有原点
        var timer = null;

        timer = setInterval(function(){
            iNow++;
            tab();
        },2000);

        function tab(){
            if(!aImgs){
                aImgs = $("#banner").find("#imgList").find("li").find("a");
            }
            if(!aBtns){
                aBtns = $("#banner").find("ol").find("li").find("a");
            }
            if(iNow == 3){
                iNow = 0;
            }
            aImgs.hide().css("opacity",0.3).show().animate({opacity: 1},500);
            aBtns.removeClass("active").eq(iNow).addClass("active");
        }

        //给每一个圆圈添加点击事件，事件委托去添加(圆圈是后加载进来的)
        $("#banner ol").on("click","li",function(){
            iNow = $(this).index();
            tab();
            return false;
        })

        //添加移入移出
        $("#banner").mouseenter(function(){
            clearInterval(timer);
            $(".prev , .next").css({
                "display": "block"
            })
        })
        $("#banner").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
            $(".prev , .next").css({
                "display": "none"
            })
        })

        //给左右按钮添加点击函数
        $(".prev ,.next").click(function(){
            if(this.className == "prev"){
                iNow--;
                if(iNow == 0){
                    iNow == 2;
                }
            }else{
                iNow++;
            }
            tab();
        })
    }

    //主页数码配件数据加载
    function mainDownload(){
        //下载数据，将数据添加到页面上
        $.ajax({
            type: "get",
            url: "../data/MainContent.json",
            success: function(data){
                //alert(data);
                //1.取出主页面数据
                var arr = data.main;
                //2.遍历循环，创建节点添加到页面上
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<div id="main">
                                    <article>
                                        <h2>${arr[i].a}</h2>
                                        <a href="http://localhost:3838/7000List.html"><span>${arr[i].b}</span><i class="iconfont">&#x3435;</i></a>
                                    </article>
                                    <a href="" class="z">
                                    </a></div>`).appendTo("#mainbox")

                    var arr1 = arr[i].con;
                    for(var j = 0; j < arr1.length; j++){
                        $(`<aside id="${arr1[j].id}">
                            <a href="7000goods.html?id=${arr1[j].id}">
                                <dl>
                                    <dt><img src="../images/${arr1[j].img}" alt=""></dt>
                                    <dd>${arr1[j].title}</dd>
                                    <dd>${arr1[j].desc}</dd>
                                    <dd>${arr1[j].price}</dd>
                                </dl>
                            </a>
                        </aside>`).appendTo(node.find(".z"))
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
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
            if(($(window).scrollTop()) >= 800){
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

    
    //banner图下登录注册块移入移出
    function login(){
        $(".divbox1").find(".div1").find(".right").find(".bottom").find("article").mouseenter(function(){
            this.style.backgroundColor = "#4a73ff";
            this.style.color = "#fff";
        })

        $(".divbox1").find(".div1").find(".right").find(".bottom").find("article").mouseleave(function(){
            $(".divbox1").find(".div1").find(".right").find(".bottom").find("article").css({
                "backgroundColor" : "#f2f2f2",
                "color": "#929292"
            })
        })
    }

    //统计商品数量
    function sc_num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $(".headerbox .header aside .goods_num").html(sum);
        }else{
            $(".headerbox .header aside .goods_num").html(0);
        }
    }
    //对外暴露
    return {
        download : download,
        banner: banner,
        mainDownload: mainDownload,
        center: center,
        scroll: scroll,
        footer: footer,
        login: login,
        sc_num: sc_num
    }
})
