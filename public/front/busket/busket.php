<?php
$xml=simplexml_load_file("../catalog/catalog.xml") or die("Error: Cannot create object");
echo $xml->acoustic[1]->id . "<br>";
echo $xml->acoustic->name . "<br>";
echo $xml->acoustic->coast . "<br>";
echo $xml->acoustic[2]->image;
echo $xml->acoustic->id;
$li = "";
foreach ($xml->acoustic as $child)
{  if ($child->id == "100"){
    echo $child->id ."\n";
    $li .="<li>" ."<span class='articul'>Артикул: <span>" . $child->id ."</span></span>". "<br>"
    ."<span>" .$child->name."</span>" . "<br>"
    ."<img src =" .$child->image."></img>" . "<br>"
    ."Цена: <span class='coast'> " . $child->coast ."</span>"  ."<br>"
     . "<span class='more'>Подробнее</span>". "<span class='buy' onclick='parent(this.parentNode);'>Купить</span>".  
    "</li>";
}
}
echo $li;
?>