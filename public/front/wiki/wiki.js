var btn1 = document.getElementsByClassName("more")[0], sub1=document.getElementsByClassName("supersub")[0];
/*Анимация скрывающегося и появляющегося блока*/
btn1.addEventListener( "click" , function() {
    if (btn1.innerHTML == "-"){
        btn1.innerHTML = "+"
        sub1.style = "display: none";

    }else{
        btn1.innerHTML = "-";
        sub1.style = "display: block;animation: go-down 0.5s;";
    }
   
});
var btn2 = document.getElementsByClassName("more")[1], sub2=document.getElementsByClassName("supersub")[1];
/*Анимация скрывающегося и появляющегося блока*/
btn2.addEventListener( "click" , function() {
    if (btn2.innerHTML == "-"){
        btn2.innerHTML = "+"
        sub2.style = "display: none";

    }else{
        btn2.innerHTML = "-";
        sub2.style = "display: block;animation: go-down 0.5s;";
    }
   
});

