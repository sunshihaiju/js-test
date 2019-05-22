<?php
	require "connect1.php";//引入数据库连接的文件
	
	
	//1.获取前端传来的做唯一匹配的值
	//判断是否传过来了
	//isset($_POST['submit']):为了提交表单数据到数据同时做检测.
	if(isset($_POST['Mobile']) || isset($_POST['submit'])){
		$Mobile=@$_POST['Mobile'];
	}else{
		exit('非法操作');
	}
	
	
	
	$query="select * from spbd where tel='$Mobile'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){//如果有值代表用户名存在。
		echo 'false';//有重复
	}else{
		echo 'true';//没有重复
	}
	
	//2.如果单击注册按钮,按钮的值为注册,将表单的值添加的数据库.
	if(isset($_POST['submit']) && $_POST['submit']=="注册"){
		$tel=$_POST['Mobile'];//username：表单的名称
		$pass=sha1($_POST['Pwd']);
		// $email=$_POST['email'];
		//添加语句
		$query="insert spbd(picid,tel,password,date) values(null,'$tel','$pass',NOW())";
		mysql_query($query);
		 header('location:http://localhost/projectname/src/login.html');//页面的跳转
	}
?>