<?php
require "connect1.php";

if(isset($_POST['name'])){//前端ajax传输过来的额
	$username=$_POST['name'];
	$password=sha1($_POST['pass']);
}else{
	exit('非法操作');
}

$query="select * from spbd where tel='$username' and password='$password'";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}






	
	
