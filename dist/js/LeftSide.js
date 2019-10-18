define(["jquery"],function($){
    //左侧三个数据加载
    function leftside(){
        $.ajax({
            type: "get",
            url: "../data/LeftSide.json",
            success: function(data){
                //alert(data);
                //1.取出主页面数据
                var arr = data;
                // alert(arr.length)
                //2.遍历循环，创建节点添加到页面上
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<li class="Ali">
                                    <a href="" id="a1">${arr[i].a}<span class="iconfont">&#xe658;</span></a>
                                    <div class="div1">
                                    <ul class="leftside">
                                    </ul>
                                    <ul class="rightside">
                                        <img src="../images/${arr[i].img}" alt= "">
                                    </ul>
                                </div>
                    </li>`).appendTo(".side #leftList")

                    var arr1 = data[i].left;
                    for(var j = 1; j < arr1.length; j++){
                        var node1 = $(`<li class="ali2">
                                        <div class="hot1">
                                            <a href="">${arr1[j].title}</a>
                                        </div>
                                         <div class="hot2">
                                    </div>
                                </li>
                                `).appendTo(node.find(".div1").find(".leftside"))

                        var arr2 = arr1[j].right;
                        for(var k = 0; k < arr2.length; k++){
                            $(`
                            <a href="">${arr2[k]}</a>
                        `).appendTo(node1.find('.hot2'))
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //给Ali添加移入移出事件让div显示出来  事件委托
    function move(){
        $(".side #leftList").on("mouseenter",".Ali",function(){
            this.style.backgroundColor = "white";
            $(".div1").eq($(this).index()).show();
        })
        $(".side #leftList").on("mouseleave",".Ali",function(){
            this.style.backgroundColor = "#1c1d1f";
            $(".div1").eq($(this).index()).hide();
        })
    }

    /* //左侧内部数据头部
    function title(){
        $.ajax({
            type: "get",
            url: "../data/LeftSide.json",
            success: function(data){
                // alert(arr.length)
                //2.遍历循环，创建节点添加到页面上
                    var arr4 = data[0].left;
                    for(var  n = 0; n < arr4.length; n++){
                        $(`<li class="ali1">
                            <a href="">${arr4[n].name1}${arr4[n].url1}</a>
                            <a href="">${arr4[n].name2}${arr4[n].url2}</a>
                        </li>`).appendTo($(".side").find("#leftList").find(".Ali").find(".div1").find(".leftside"))
                    }
            },
            error: function(msg){
                console.log(msg);
            }
        })
        
    } */
    
    
    //对外暴露
    return {
        leftside: leftside,
        move: move,
        /* title: title */
    }
})