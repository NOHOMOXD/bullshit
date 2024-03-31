<?php
$xml = simplexml_load_file('users.xml');
if (isset($_POST['email']) and isset($_POST['password'])){
    $user = $xml->addChild('user');
    $user->addChild('name', $_POST['name']);
    $user->addChild('lastname', $_POST['lastname']);
    $user->addChild('phonenumber', $_POST['phonenumber']);
    $user->addChild('adress', $_POST['adress']);
    $user->addChild('email', $_POST['email']);
    $user->addChild('password', $_POST['password']);
    echo "true ";
    $xml->asXML('users.xml');
}

    if (isset($_GET['email'])){
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);
        $users = $array['user'];
            foreach ($users as $key => $user_123) {
                if ($user_123['email']==$_GET['email']){
                    echo "Пользователь с такой почтой уже существует ";
                    $check=true;
                }
            }
            if ($check!=true){
                echo "false ";
            }
    }
?>