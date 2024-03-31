/*Добавление события клик кнопкам. Изменение свойства дисплей у блоков с контактной информацией*/
var btn1 = document.getElementsByClassName("more")[0], adress_spb_lit=document.getElementById("sub_adress_spb_lit");
btn1.addEventListener( "click" , function() {
    if (btn1.innerHTML == "-"){
        btn1.innerHTML = "+"
        adress_spb_lit.style = "display: none";

    }else{
        btn1.innerHTML = "-";
        adress_spb_lit.style = "display: block;animation: go-down 0.5s;";
    }
   
});
var btn2 = document.getElementsByClassName("more")[1],adress_spb_zag=document.getElementsByClassName("sub_adress_spb_zag")[0];
btn2.addEventListener( "click" , function() {
    if (btn2.innerHTML == "-"){
        btn2.innerHTML = "+"
        adress_spb_zag.style = "display: none;";

    }else{
        btn2.innerHTML = "-";
        adress_spb_zag.style = "display: block;animation: go-down 0.5s;";
    }
});
var btn3 = document.getElementsByClassName("more")[2],adress_moskva=document.getElementsByClassName("sub_adress_spb_zag")[1];
btn3.addEventListener( "click" , function() {
    if (btn3.innerHTML == "-"){
        btn3.innerHTML = "+"
        adress_moskva.style = "display: none;";

    }else{
        btn3.innerHTML = "-";
        adress_moskva.style = "display: block;animation: go-down 0.5s;";
    }
});