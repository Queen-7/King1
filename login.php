<?php
    header("Content-type:text/html;charset=utf-8");
    //同意返回格式
    $responseData = array("code" => 0,"message" => "");
    //取出传过来的数据
	$number = $_POST["number"];
    $password = $_POST['password'];
    //简单的验证
    if(!$number){
        $responseData["code"] = 1;
        $responseData["message"] = "手机号码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    //链接数据库
    $link = mysql_connect("localhost","root","123456");

    //判断是否连接成功
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "数据库连接失败";
        echo json_encode($responseData);
        exit;
    }

    //设置字段集
    mysql_set_charset("utf-8");
    //选择数据库
    mysql_select_db("7000Mall");
    //登录
    $str = md5(md5(md5($password)."zwq")."yyt");
    $sql = "select * from register where number='{$number}' and password='{$str}'";

    $res = mysql_query($sql);
    /* var_dump($res); */

    //取出第一行数据
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码不正确";
        echo json_encode($responseData);
    }else{
        $responseData["message"] = "登录成功";
        echo json_encode($responseData);
    }

    mysql_close($link);
?>