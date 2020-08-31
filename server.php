<?php
if(isset($_POST['login']) && isset($_POST['password'])){
 
    $login=$_POST['login'];
    $password = $_POST['password'];
    echo "Ваш логин: $login и пароль: $password";
}   
    //$_POST = json_decode(file_get_contens("php://input"), true);
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

	print_r($data);
?>