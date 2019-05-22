<?php  
	
	include "connect.php";
	
	$id=$_GET['sid'];
	
	$result=mysql_query("select * from piclist where picid=$id ");
	
	$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($wronglist);

?>