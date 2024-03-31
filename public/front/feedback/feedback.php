<?php
$fbJSON = file_get_contents('feedback.json');
if (isset($_POST['name']) and isset($_POST['date']) and isset($_POST['text'])){
    $json=json_decode($fbJSON,true);
    $user_array['name']= $_POST['name'];
    $user_array['date']= $_POST['date'];
    $user_array['text']= $_POST['text'];
    array_push($json, $user_array);
    $js=json_encode($json);
    file_put_contents('feedback.json',$js);
}

?>