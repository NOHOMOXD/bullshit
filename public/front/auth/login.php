<?php 
$xml = simplexml_load_file('users.xml');
$json = json_encode($xml);
$array = json_decode($json,TRUE);
$users = $array['user'];
if (isset($_POST['email']) and isset($_POST['password'])){
    //echo 'POST: Your email is ' . $_POST['email']."\nYour password is " . $_POST['password'];
    foreach ($users as $key => $user) { 
    if (($user['email']==$_POST['email']) and ($user['password']==$_POST['password'])) {
        echo "true ".$user['name'] . " ".$user['lastname'];
    }  
   //print_r($user);
    }
}
/*foreach ($array as $key => $user) {
    if (($user['email']==$_POST['email']) and ($user['password']==$_POST['password']) ){
       ('You are an admin');
    }
    //print_r($user);}*/

?>