define(["jquery","jquery-cookie"],function($){
    //列表页结算数据
    function Cookie(){
        sc_msg();
        var id = getUrl(`id`);
    }
    //加载购物车
    function sc_msg(){
        $(".descbox").empty();//清空所有子节点
        $.ajax({
            type: "get",
            url: "../data/ListCar.json",
            success: function(arr){
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                //找出购物车中的商品数据
                var newArr = [];
                for(var i = 0; i < arr.length; i++){
                    for(var j = 0; j < cookieArr.length; j++){
                        if(arr[i].id == cookieArr[j].id){
                            //增加购物车商品数量
                            arr[i].num = cookieArr[j].num;
                            newArr.push(arr[i]);
                        }
                    }
                }
                // console.log(newArr);
                for(var i = 0; i < newArr.length; i++){
                    $(`<div class="list" id="${newArr[i].id}">
                        <input type="checkbox" class="check">
                        <a class="shoplist" href=""><img src="../images/${newArr[i].img}" alt=""></a>
                        <div class="shop">
                            <a href="">${newArr[i].title}</a>
                            <aside>
                                <span>【${newArr[i].color}】</span>
                            </aside>
                        </div>
                        <div class="btnbox">
                            <button>-</button>
                            <span class="goods_num">${newArr[i].num}</span>
                            <button>+</button>
                        </div>
                        <div class="price">
                            <span>${newArr[i].price}</span>
                        </div>
                        <div class="total">
                            <p>${newArr[i].price * newArr[i].num}</p>
                            <i class="iconfont">&#xe66f;</i>
                            <i class="iconfont" id="icon">&#xe630;</i>
                        </div>
                    </div>`).appendTo(".listbox")
                }  

                $(`<div class="over">
                        <div class="check">
                            <input type="checkbox">
                            <span>全选</span>
                        </div>
                        <div class="delete">
                            <a href="">删除选择商品</a>
                        </div>
                        <div class="shoptype">
                            <p>商品种类：<span>${newArr.length}</span>种(不含赠品)</p> 
                        </div>
                        <div class="shop_money">
                            <p>商品总金额(不含运费)：<span>0.00</span></p>
                        </div>
                        <a href="7000login.html"><input type="submit" value="结算"></a>
                    </div>`).appendTo(".overbox")
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //加和减
    function Add(){
        $(".listbox").on("click",".list .btnbox button",function(){
            //商品id(closest:必须传参，找到第一个符合条件的父节点，从本身开始查找)
            //attr()      获取元素的行间属性
            var id = $(this).closest(".list").attr("id");
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

                //商品单价
                var money = parseInt($(this).parent().nextAll(".price").find("span").html());
                //商品数量
                let num = Number($(this).prevAll(".goods_num").html());
                //拿到下面合计
                let sum = parseInt($(this).parent().parent().parent().nextAll().children(".over").children(".shop_money").find("p").find("span").html());
                /* alert(sum) */
                $(this).parent().parent().parent().nextAll().children(".over").children(".shop_money").find("p").find("span").html((num + 1) * money);
                /* alert(money); */
            }else{
                if(goodObj.num == 1){
                    alert("数量已经减到最小啦！");
                }else{
                    goodObj.num--;
                }
            }
            //重新显示数量(prevAll(选择器)   从当前节点开始往上所有的兄弟节点)
            //nextAll(选择器)     从当前节点开始往下所有的兄弟节点
            $(this).siblings(".goods_num").html(goodObj.num);
            // alert($(this).parent().next().children("span").html())
            $(this).parent().nextAll('.total').children("p").html((goodObj.num * $(this).parent().next().children("span").html()))
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires: 7
            });
        })
    }

    //删除商品
    function Delete(){
        $(".listbox").on("click",".list .total #icon",function(){
            //商品id
            var id = $(this).closest(".list").remove().attr("id");
            /*  
                1.删除页面上的节点
                2.cookie存储的该数据删除
            */
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    cookieArr.splice(i,1);
                    break;
                }
            }

            //存储数据到cookie的时候，判断数组是否为空
            if(cookieArr.length){
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires: 7
                })
            }else{
                $.cookie("goods",null);
            }
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
            $(".listbox .list .btnbox .goods_num").html(sum);
        }else{
            $(".listbox .list .btnbox .goods_num").html(0);
        }
    }

    //给input选框添加点击
    // function Total(){
        $(".listbox").on("click",".list .check",function(){
            //拿到商品总金额
            var price = parseInt($(this).nextAll(".total").find("p").text());
            // alert(price);
            //拿到下面合计
            let sum = parseInt($(this).parent().parent().nextAll().children().children(".shop_money").find("p").find("span").html());
            // alert(sum);
        
            var isChecked = $(this).prop("checked");
            if(isChecked == true){
                sum += price;
            }else{
                sum -= price;
            }
            $(".overbox .over .shop_money p span").html(sum);
        })
    // }

    /* //点击全选按钮选中全部商品
    function Click(){
        $(".titlebox .title .check .allSelect").addEventListener("click",clickHandler);
        for(var i = 0; i < $(".check").length; i++){
            $(".check").addEventListener("click",clickHandler);
        }
    }
    

    function clickHandler(){
        if($(".titlebox .title .check .allSelect") === this){
            for(var i = 0; i < $(".check").length; i++){
                check.checked = $(".check").checked;
            }
            return;
        }
        for(var j = 0;j < $(".check").length; j++){
            var checks = $(".check" + j);
            if(!checks.checked){
                $(".titlebox .title .check .allSelect").checked = false;
                return;
            }
        }
        $(".titlebox .title .check .allSelect").checked = false;
    } */
    
    // 取地址栏数据
    function getUrl(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return decodeURI(r[2]);
        }
        return null;
    }
    //猜你喜欢
    function like(){
        //下载数据到页面上
        $.ajax({
            type: "get",
            url: "../data/youlike.json",
            success: function(data){
                // alert(data);
                var arr = data;
                for(var i = 0; i < arr.length; i++){
                    $(`<a href="">
                    <aside>
                        <img src="../images/${arr[i].img}" alt="">
                        <p>${arr[i].title}</p>
                        <span>${arr[i].price}</span>
                    </aside>
                </a>`).appendTo(".likebox .like_list")
                }
            },
            error: function(msg){
                console.log(msg);
            }

        })
    }

    //添加切换效果，左右运动
    function like_banner(){
        var iNow = 0;//代表当前图片的下标
        var aImgs = null; //记录所有图片
        var timer = null;

        timer = setInterval(function(){
            iNow++;
            tab();
        },3000);

        function tab(){
            if(!aImgs){
                aImgs = $(".likebox").find(".like_liist").find("a").find("aside");
            }
            if(iNow == 3){
                iNow = 0;
            }
            $(".likebox .like_list").animate({left: -1192 * iNow},function(){
                //动画结束
                if(iNow == 10){
                    iNow = 0;
                    $(".likebox .like_list").css("left", 0);
                }
            })
        }

        //添加移入移出
        $(".likebox").mouseenter(function(){
            clearInterval(timer);
        })
        $(".likebox  .like_prev").mouseenter(function(){
            clearInterval(timer);
            $(".like_prev .iconfont").css({
                "color": "red"
            })
        })
        $(".likebox .like_prev").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
            $(".like_prev .iconfont").css({
                "color": "#bbb"
            })
        })

        $(".likebox  .like_next").mouseenter(function(){
            clearInterval(timer);
            $(".like_next .iconfont").css({
                "color": "red"
            })
        })
        $(".likebox .like_next").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
            $(".like_next .iconfont").css({
                "color": "#bbb"
            })
        })

        $(".likebox .like_list").on("mouseenter","a",function(){
            $(this).css({
                "backgroundColor": "#fff",
                "box-shadow": "2px 2px 3px 2px #818182"
            })
        })

        $(".likebox .like_list").on("mouseleave","a",function(){
            $(this).css({
                "backgroundColor": "#f2f2f2",
                "box-shadow": "0 0 0 0 #f2f2f2"
            })
        })

        //给左右按钮添加点击函数
        $(".like_prev , .like_next").click(function(){
            if(this.className == ".like_prev"){
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
        like: like,
        footer: footer,
        center: center,
        scroll: scroll,
        like_banner: like_banner,
        Cookie: Cookie,
        Add: Add,
        Delete: Delete,
        /* Click: Click */
    }
})