
var images = [
'./slides/Russia.jpg', 
'./slides/slid.jpg', 
'./slides/Miliy.jpg', 
'./slides/9may.jpg', 
'./slides/bestprice.jpg', 
];
/*var num = 0;
function next(){
var	slider = document.getElementById('page');
  num++;
  if (num>=images.length){
      num = 0;
  }
  $('#slider').fadeToggle("slow");
  slider.src = images[num];
}
function prev(){
var slider = document.getElementById('page');
num--;
if (num < 0) {
num = images.length-1;
}
slider.src = images[num];
}
    $('#page').on('load', function () {
        alert($('#page').attr('src'));
       });
    
for (let i=images.length-1; i>=0;i--){
    img = slider.appendChild(document.createElement('img'));
    img.src = images[i];
}
    if (document.getElementById('page')==images[0]){
        num=1;
    }
         b=1;
    if (o==1){
        j=i;
        o=0;
        if((o==1)&&(b==1)){
            j=i-2;
    }
    }
    aute = 1;
    if ($("#page").attr('src')==images[0]){
        j=4;
    }
*/


$("#slider").hover(function(){
   // $(".arrows").css({display: 'inline-block'});
    $(".arrows").animate({opacity:'1'},200);
},function(){
   // $(".arrows").css({display: 'none'});
   $(".arrows").animate({opacity:'0'},200);
})
var num=0,img=$("#page").attr('src'),o=b=0;
$("#next").on("click",function(){
    aute = 1;
    num++;
    if (num>=images.length){
        num=0;
    }
    $("#page").attr('src',images[num]);
    $('#page').hide().fadeIn(500);
});
$("#prev").on("click",function(){
    aute = 1;
    num--;
    if (num<0){
        num=images.length-1;
    }
    $("#page").attr('src',images[num]);
    $('#page').hide().fadeIn(500);
});
var aute=0;
setTimeout(slide_page,3000);
 function slide_page(){
    if (aute==0){
    if (document.getElementById('page')==images[0]){
        i=1;
    }
    num++;
    if (num>=images.length){
        num=0;
    }
    $("#page").attr('src',images[num]);
    $('#page').hide().fadeIn(500);
    setTimeout(slide_page,3000);
}
};
var t;
setInterval(function(){
    aute=0;
},10000);

$('#page').on('click', () => {
    window.location = 'News/news.html'
})


