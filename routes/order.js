const Router = require('express');
const FilePathService = require('../services/FilePathService');
const xml = require('fast-xml-parser');
const fs = require('fs');
const path   = require('path')
const router = Router();

router.post('/', (req, res, next) => {
  const xmlData = fs.readFileSync(path.join(FilePathService.getFrontPath(), '/catalog/catalog.xml'));
  const parser = new xml.XMLParser();
  let jsonData = parser.parse(xmlData);
  let tmpJsonData = [];
  for (const key in jsonData.catalog) {
    tmpJsonData = [...tmpJsonData, ...jsonData.catalog[key]];
  }
  jsonData = tmpJsonData;
  if (!req.cookies?.email) {
    res.set('Content-Type', 'text/html');
    return res.send('<center> <h1 style="color:red;">Пользователь не вошел<h1/>  <center/>');
  }

  const {article, amount} = req.body;
  let resultReq = [], li = '';
  article.forEach((articleId, index) => {
    let tmpobj = jsonData.find(tmp => tmp.id == articleId)
    tmpobj.amount = amount[index];
    li +=
    "<li>"+"<span class='articul'>Артикул: <span>"+tmpobj.id+"</span></span>"+"<span class='forone articul'>Цена за ед. = "+tmpobj.coast+"&#8381;</span>"+"<br>"+
    "<div class='title' >"+
    `<input type="hidden" name="article[]" class="article" value="${tmpobj.id}" />
    <input type="hidden" name="amount[]"  class="amount" value="${tmpobj.amount}" />`+
            "<span class='coast'>"+ tmpobj.amount*tmpobj.coast+"&#8381; </span>"+
                "<span class='amount'>" + tmpobj.amount + "шт.</span>"+
    "</div>"+ "<div class='sp'>" +
    "<img src =../catalog/"+tmpobj.image +"></img>"+  
     "<span class='name'>"+tmpobj.name+"</span>"+"</div>"+         
 "</li>";
    resultReq.push(tmpobj);
  });
  let file = fs.readFileSync(path.join(FilePathService.getFrontPath(), '/order/order.html'));
  file = file.toString().replace(/{{list_content}}/g, li);
  res.set('Content-Type', 'text/html');
  res.send(file);
});

router.post('/confirm', (req, res, next) => {
  const user = req.cookies?.email;
  if (!user) {
    res.set('Content-Type', 'text/html');
    return res.send('<center> <h1 style="color:red;">Пользователь не вошел<h1/>  <center/>');
  }

  const {article, amount} = req.body;
  let timeStamp = new Date().getTime();
  let order = {
    user: user,
    timeStamp: timeStamp,
    items: []
  }
  article.forEach((articleId, index) => {
    order.items.push({
      article: articleId,
      amount: amount[index],
    });
  });
  // Преобразование данных в формат JSON
  const resultData = JSON.stringify(order);
  const filePath = path.join('files', 'orders', `order_${timeStamp}.json`);

  // Сохранение данных в файл
  fs.writeFile(filePath, resultData, 'utf8', (err) => {
    if (err) {
      // Обработка ошибки сохранения файла
      res.status(500).send('Ошибка оформления заказа');
    } else {
      res.send('Заказ успешно оформлен!');
    }
  });
});

module.exports = router;
