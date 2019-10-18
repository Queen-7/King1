$(function(){
    // var aInputs = $("input");
    $("#btn1").click(function(){
        $.ajax({
            type: "post",
            url: "../register.php",
            data: {
                number: $("#txt1").val(),
                password:$("#pwd1").val(),
            },
            success: function(result){
                var obj = JSON.parse(result);
                /* if(obj.code){
                    alert("注册失败");
                }else{
                    alert("注册成功");
                } */
                alert(obj.message);
            },
            error: function(msg){
                alert(msg);
            }
        })
    })
    //手机号验证
    $("#txt1").blur(function(){
        var oTxt1 = $("#txt1").val();
        if(/^[1][3,5,7,8]\d{9}$/.test(oTxt1)){
            $("#username_p1").html("❗ 手机号输入正确");
        }else{
            $("#username_p1").html("❗ 手机号输入不正确");
        }
    }) 


    //验证码
    $("#txt2").blur(function(){
        var oTxt2 = $("#txt2").val();
        var te = $("#div").html();
        // oTxt.toLowerCase() == te.toLowerCase();
        if(oTxt2.toLowerCase() == te.toLowerCase()){
            $("#username_p2").html("❗ 验证码正确");
        }else{
            $("#username_p2").html("❗ 验证码不正确");
        } 
    }) 

    //变换验证码
    $("#div").html(testCode(6))  ;
    $("#div").click(function(){
        $("#div").html(testCode(6)) ;
    })

    $('#sub').click(function(){
        $('#SMS').val(testCodeNum(4));
    })

    //密码验证
    $("#pwd1").keyup(function(){
        var oValue = this.value;
        //每次触发之前，都要将上一次样式全部清空
        for(var i = 0;i < $(".testCode").length;i++){
            $(".testCode")[i].style.backgroundColor = "#bbb";
        }

        if(oValue.length >= 6 && oValue.length <= 16){
            //开始密码强度验证
            if(/^\d+$/.test(oValue) || /^[a-z]+$/.test(oValue) || /^[A-Z]+$/.test(oValue)){
                $(".testCode")[0].style.backgroundColor = "skyblue";
            }else if(/\d/.test(oValue) && /[a-z]/.test(oValue) && /[A-Z]/.test(oValue)){
                $(".testCode")[2].style.backgroundColor = "#3678e2";
            }else{
                $(".testCode")[1].style.backgroundColor = "#5d8ede";
            }
        }
    }) 

    //确认密码
    $("#pwd2").blur(function(){
        var oPwd1 = $("#pwd1").value;
        var oPwd2 = $("#pwd2").value;
        if(oPwd1 == oPwd2){
            $("#username_p4").html( "❗密码正确");
        }else{
            $("#username_p4").html("❗密码不符");
        }
    })
})

//验证码
function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 123);
		if(tmp >= 0 && tmp <= 9){
			arr.push(tmp);
		}else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
			arr.push(String.fromCharCode(tmp));
		}else{
			//随机到别的不在范围内的数
			i--;
		}
	}
	return arr.join("");
}

function testCodeNum(n){
	//n生成n位的验证码
	var arr = [];
	for(var i = 0; i < n; i++){
		var tmp = parseInt(Math.random() * 10);
		arr.push(tmp);
	}
	return arr.join("");
} 