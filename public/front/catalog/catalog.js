
window.addEventListener("load", goods, false);
window.addEventListener("hashchange", goods, false);
let jsonDB = '';
function removeChildren(elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
}
var NameOfGoods = {
    acoustic_guitar: 'acoustic',
    bass_guitar: 'bass',
    electro_guitar: 'electro',
    ukelele: 'ukulele'
};
var CotOfNames = {
    acoustic: 'Акустические гитары',
    bass: 'Басс гитары',
    electro: 'Электро-гитары',
    ukulele: 'Укулеле'
}
var searchText = '', sort = '';
function goods() {
    //Создаем Ajax запрос 
    var xhr = new XMLHttpRequest();
    //Находим значение хэша
    var hashname = window.location.hash.slice(1);
    var treasure = "";
    var cot = document.getElementById("id_Cot");
    var ul = document.getElementById("list");
    //если элементы были созданы то очищаем страницу
    removeChildren(ul);
    //находим значение сокровища
    if (hashname in NameOfGoods) {
        treasure = NameOfGoods[hashname];
    }
    //переименовываем каталог
    if (treasure in CotOfNames) {
        cot.innerHTML = CotOfNames[treasure];
    } else {
        cot.innerHTML = "Все товары";
    }
    //Формируем наш запрос для сервера
    try {
        xhr.open('GET', `/catalog/search?treasure=${treasure}&text=${searchText}&sorting=${sort}`, true);
        //Проверяем доступность сервера
        xhr.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                xmlFunc(xhr);
            };
        };
        xhr.send();
    } catch (error) {
        alert("ОШИБКА: СЕРВЕР НЕ ДОСТУПЕН! ПОЖАЛУЙСТА, ПРОВЕРЬТЕ СВОЕ ИНТЕРНЕТ СОЕДИНЕНИЕ");
    }
    //функия с помощью которой мы рисуем список товаров
    function xmlFunc(jsonRes) {
        if (!jsonRes.responseText) {
            return;
        } 

        jsonDB = JSON.parse(jsonRes.responseText); let li = "";
        console.log(jsonDB);
        jsonDB.forEach(item => {
            li += "<li>" + "<span class='articul'>Артикул: <span>" + item.id + "</span></span>" + "<br>"
            + "<span>" + item.name + "</span>" + "<br>"
            + "<img onclick='info(this)' src =" + item.image + "></img>" + "<br>"
            + "Цена: <span class='coast'> " + item.coast + "</span>" + "<br>"
            + "<span class='more' onclick='info(this)'>Подробнее</span>" + "<span class='buy' onclick='parent(this.parentNode);'>Купить</span>" +
            "</li>";
        });
        document.getElementsByClassName("main")[0].classList.remove('spinner');
        document.getElementById("list").innerHTML = li;
    }
};
//добавелние в корзину
var all_Busket = 0, busk = document.getElementById("busket");
function parent(x) {
    let art_id = x.getElementsByTagName('span')[1];
    localStorage.setItem(art_id.innerHTML, parseInt(localStorage.getItem(art_id.innerHTML)) + 1);
    if (localStorage.getItem(art_id.innerHTML) == "NaN") {
        var amount_Busket = parseInt(document.getElementById("busket").innerHTML) + 1;
        localStorage.setItem(art_id.innerHTML, 1);
        localStorage.setItem('amount_Busket', amount_Busket);
        alert('Товар добавлен в корзину')
    }
    document.getElementById("busket").innerHTML = localStorage.getItem('amount_Busket');
}
var img123 = null;
//Кнопка "подробнее"
const info = (e) => {
    const id = e.parentNode.querySelectorAll('span')[1].innerHTML;
    const idinfo = jsonDB.find(item => item.id == id);
    idinfo.specifications = idinfo.specifications.replace(/\/;\//g, '<br/>')
    img123 = idinfo.image;
    document.querySelectorAll('div.image')[0].style.backgroundImage = `url(${idinfo.image})`;
    document.querySelectorAll('p.infotext')[0].innerHTML = idinfo.about;
    document.querySelectorAll('p.textspecs')[0].innerHTML = idinfo.specifications;
    document.querySelectorAll('p.articul span')[0].innerHTML = idinfo.id;
    document.querySelectorAll('p.infoname')[0].innerHTML = idinfo.name;
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let itemCoords = e.parentNode.getBoundingClientRect();
    document.body.style.overflow = 'visible';
    document.querySelectorAll("div.modal_lgn_sgn")[0].style = `display:block;height:200vh;top:${scrolled - 100}px;`;
    document.querySelectorAll("div.infomodal")[0].style = `display:block;top:${scrolled - 50}px;`;
}
const infoclose = (e) => {
    document.body.style.overflow = 'visible;';
    document.querySelectorAll("div.modal_lgn_sgn")[0].style = "display:none;height:0vh;";
    document.querySelectorAll("div.infomodal")[0].style = 'display:none';
}
document.querySelectorAll("span.info_btn_close")[0].addEventListener('click', infoclose);
document.querySelectorAll("div.modal_lgn_sgn")[0].addEventListener('click', infoclose);
const imgloop = (e) => {
    let looped = document.querySelectorAll('div.image')[0], loopedcenter, loopedtop;
    let coords = looped.getBoundingClientRect();
    looped.style = `background-position-x:${window.event.clientX - coords.left - (coords.right - coords.left) / 1.3}px; 
                    background-position-y: ${window.event.clientY - coords.top - coords.bottom + 100}px;
                    background-size: 300px;`;
    document.querySelectorAll('div.image')[0].style.backgroundImage = `url(${img123})`;
    // console.log((coords.top/coords.bottom)*window.event.clientY-(coords.top+coords.bottom)*(coords.top/coords.bottom)+400);
    // console.log(window.event.clientY);
    // console.log(window.event.clientY-coords.top-coords.bottom+250);
}
const imgdefault = (e) => {
    let looped = document.querySelectorAll('div.image')[0], loopedcenter, loopedtop;
    looped.style = `background-position-x:0px; 
    background-position-y: 0px;
    background-size: cover;`;
    document.querySelectorAll('div.image')[0].style = `background-image:url(${img123});background-size: contain;`;
}
document.querySelectorAll('div.image')[0].addEventListener('mousemove', imgloop);
document.querySelectorAll('div.image')[0].addEventListener('mouseleave', imgdefault);

const searchTextInput = document.getElementById('searchText');
searchTextInput.addEventListener('change', updateSearchInput)
searchTextInput.addEventListener('keyup', updateSearchInput)

function updateSearchInput(e) {
    searchText = this.value;
    console.log(searchText);
}

const sortInput = document.getElementById('sort');
sortInput.addEventListener('change', updateSortInput)
function updateSortInput(e) {
    sort = sortInput.options[sortInput.selectedIndex].value || '';
}

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', goods)
