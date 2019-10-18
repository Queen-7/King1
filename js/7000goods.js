define(["jquery","jquery-cookie"],function($){
    //主页点击商品实现对应的跳转
    function goods(){
        var id = getUrl(`id`);
        mark();
        
        $.ajax({
            type: "get",
            url: "../data/goods.json",
            success: function(data){
                var node = $(`<div class="desc">
                                <div class="left">
                                    <div class="top">
                                    </div>
                                </div>  
                                <div class="right">

                                </div>
                            </div>`).appendTo(".descbox");
                var arr = data;
                    $(`<div class="left1">
                            <div class="prev">
                                <i class="iconfont">&#xe652;</i>
                            </div>
                            <div class="center">
                                <img src="../images/${arr[id].img}" alt="">
                            </div>
                            <div class="next">
                                <i class="iconfont">&#xe60e;</i>
                            </div>
                        </div>
                        <div class="left2">
                            <img src="../images/${arr[id].img}" alt="">
                            <div class="mark"></div>
                        </div>
                        <div class="left3">
                            <img src="../images/${arr[id].img}" alt="">
                        </div>
                `).appendTo(node.find(".left").find(".top"))
                // var arr = data;
                $(`<h3>${arr[id].title}</h3>
                    <h4>${arr[id].desc}</h4>
                    <div class="price">
                        <p>市场零售价<span>${arr[id].price}</span></p>
                    </div>
                    <div class="express">
                        <aside class="go">
                            <span>配送</span>
                            <select name="" id="area">
                                <option value="">请选择</option>
                                <option value="">北京</option>
                                <option value="">内蒙古</option>
                                <option value="">山东</option>
                                <option value="">陕西</option>
                                <option value="">安徽</option>
                                <option value="">河南</option>
                                <option value="">河北</option>
                                <option value="">广东</option>
                                <option value="">广西</option>
                                <option value="">湖北</option>
                                <option value="">湖南</option>
                                <option value="">陕西</option>
                            </select>
                            <span>有货</span>
                            <span>成交</span>
                            <span>${arr[id].yes}</span>
                            <span>库存</span>
                            <span>${arr[id].no}</span>
                        </aside>
                        <aside class="money">
                            <span>运费</span>
                            <span>单笔满500元的订单国内可包邮</span>
                        </aside>
                    </div>
                    <div class="type">
                        <span>规格</span>
                        <img src="../images/${arr[id].img}" alt="">
                        <span>${arr[id].color}</span>
                        <span>${arr[id].price}</span>
                        <span>40059台可售</span>
                        <div class="btnbox1" id="${arr[id].id}">
                            <button>-</button>
                            <span class="goods_num">1</span>
                            <button>+</button>
                        </div>
                    </div>
                    <div class="btnbox">
                        <button id="${arr[id].id}" class="btn_add">加入采购单</button>
                        <a href="7000Buy.html"><button class="btn_sale">立即订购</button></a>
                    </div>`).appendTo(node.find(".right"))
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }


    //商品详情大图
    function rightImg(){
        var id = getUrl(`id`);
        $.ajax({
            type: "get",
            url: "../data/goods.json",
            success: function(data){
                var arr = data;
                // alert(arr);
                $(`<div class="main">
                <div class="stand">
                    <div class="title">
                       <h4>热门推荐</h4>
                       <a href="">换一组</a> 
                    </div>
                    <div class="content">
                        <ul>
                            <li>
                                <a href="">
                                    <img src="../images/${arr[id].img1}" alt="">
                                    <p>${arr[id].title1}</p>
                                    <p>${arr[id].price1}</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="../images/${arr[id].img2}" alt="">
                                    <p>${arr[id].title2}</p>
                                    <p>${arr[id].price2}</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="../images/${arr[id].img3}" alt="">
                                    <p>${arr[id].title3}</p>
                                    <p>${arr[id].price3}</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="../images/${arr[id].img4}" alt="">
                                    <p>${arr[id].title4}</p>
                                    <p>${arr[id].price4}</p>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="../images/${arr[id].img5}" alt="">
                                    <p>${arr[id].title5}</p>
                                    <p>${arr[id].price5}</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="rightimg">
                    <img src="../images/${arr[id].bigimg}" alt="">
                </div>
            </div>`).appendTo(".mainbox")
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }


    //给加入购物车按钮添加点击事件
    function shoppingCar(){
        sc_num();
        $(".descbox").on("click",".desc .right .btnbox .btn_add",function(){
            //取出当前商品所在id
            var id = this.id;
            /* alert(id); */
            //判断是否是第一次存储
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var arr = [{id:id,num:1}];
                $.cookie("goods",JSON.stringify(arr),{
                    expires: 2
                })
            }else{
                //判断之前是否添加过
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;//假设之前没有存储过
                //通过循环遍历是否有之前存储过的商品
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }

                //判断如果没有添加过
                if(!same){
                    var obj = {id: id,num: 1};
                    cookieArr.push(obj);
                }

                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires: 3
                })
            }
            sc_num();
        })
        
    }

    //加和减
    function Add(){
        $(".descbox").on("click",".desc .right .type .btnbox1 button",function(){
            //商品id(closest:必须传参，找到第一个符合条件的父节点，从本身开始查找)
            //attr()      获取元素的行间属性
            var id = $(this).closest(".btnbox1").attr("id");
            // alert(id);
            //取出对应cookie中的数据
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    //要修改的数据
                    var goodObj = cookieArr[i];
                    break;
                }
            }
            if(this.innerHTML == "+"){
                goodObj.num++;
            }else{
                if(goodObj.num == 1){
                    alert("数量已经减到最小啦！");
                }else{
                    goodObj.num--;
                }
            }

            //重新显示数量(prevAll(选择器)   从当前节点开始往上所有的兄弟节点)
            //nextAll(选择器)     从当前节点开始往下所有的兄弟节点
            $(this).parent().find("span").html(goodObj.num);

            $.cookie("goods",JSON.stringify(cookieArr),{
                expires: 7
            });
            sc_num();
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
    // 取地址栏数据
    function getUrl(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return decodeURI(r[2]);
        }
        return null;
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

    //放大镜效果，给mark添加移入移出
    function mark(){
        $(".descbox").on("mouseenter",".left2",function(){
            $(".mark , .left3").show();
        })
        $(".descbox").on("mouseleave",".left2",function(){
            $(".mark , .left3").hide();
        })
        $(".descbox").on("mousemove",".left2",function(ev){
            var l = ev.clientX - $(".descbox .desc .left .top .left2").offset().left - 100;
            var t = ev.clientY - $(".descbox .desc .left .top .left2").offset().top;
            if(l <= 0){
                l = 0;
            }
            if(l >= 250){
                l = 250;
            }
            if(t <= 0){
                t = 0;
            }
            if(t >= 250){
                t = 250;
            }

            $(".mark").css({
                left: l,
                top: t,
            })

            //让大图反向移动对应倍数的距离
           $(".descbox .desc .left .top .left3 img").css({
                left: l * -2,
                top: t * -2
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

    //对外暴露
    return {
        scroll: scroll,
        footer: footer,
        mark: mark,
        center: center,
        getUrl: getUrl,
        goods: goods,
        rightImg: rightImg,
        shoppingCar: shoppingCar,
        Add:Add
    }
})