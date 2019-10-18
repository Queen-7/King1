$(function(){
    $("#login").click(function(){
        $.ajax({
            type: "post",
            url: "../login.php",
            data: {
                number: $("#number").val(),
                password:$("#password").val(),
            },
            success: function(result){
                var obj = JSON.parse(result);
                if(obj.code){
                    alert(obj.message);
                }else{
                    location.href = "http://localhost:3838/index.html";
                }
            },
            error: function(msg){
                alert(msg);
            }
        })
    })
})