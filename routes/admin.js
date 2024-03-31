const Router = require('express');
const FilePathService = require('../services/FilePathService');
const fs = require('fs');
const path = require('path');
const router = Router();

router.get('/orders', (req, res, next) => {
  if (req.cookies?.email !== 'admin') {
    res.set('Content-Type', 'text/html');
    return res.status(500).send('<center> <h1 style="color:red;">Вы не админ<h1/>  <center/>');
  }
  const directoryPath = path.join(process.cwd(), 'files', 'orders');
  // Read the contents of the directory
  var trsItems = '';
  const files = fs.readdirSync(directoryPath);
  files.forEach((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    let li = '';
    jsonData.items.forEach((item) => {
      li += `<li>Артикул: ${item.article}, Кол-во: ${item.amount} шт.</li>`;
    })
    const dateString = new Date(jsonData.timeStamp).toLocaleString();
    const trItem = `
      <tr>
        <td>${jsonData.user}</td>
        <td>${dateString}</td>
        <td>
            <ul>
                ${li}
            </ul>
        </td>
      </tr>`;
    trsItems += trItem;
  });

  res.set('Content-Type', 'text/html');
  let html = `<!DOCTYPE html>
  <html lang="ru">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Просмотр заказов</title>
      <style>
        main {
          display: flex;
          justify-content: center;
        }
        table {
          border: 1px solid black; /* Set all borders to 1px solid black */
          border-collapse: collapse; /* Collapse the borders into a single border */
        }
        table tr td {
          border: 1px solid black; /* Set all borders to 1px solid black */
          border-collapse: collapse; /* Collapse the borders into a single border */
        }

        th {
          border: 1px solid black; /* Set all borders to 1px solid black */
          padding: .5em;
          font-weight: bold; /* Make the headers bold */
        }
        td {
          padding: .5em;
        }
      </style>
  </head>
  <body>
      <main>
          <table>
          <caption><h1>Просмотр заказов</h1></caption>
              <thead>
                  <tr>
                      <th>Пользователь</th>
                      <th>Дата время заказа</th>
                      <th>Товары</th>
                  </tr>
              </thead>
              <tbody>
                ${trsItems}
              </tbody>
          </table>
      </main>
  </body>
  </html>`;
  res.send(html);
});

router.get('/routes', (req, res, next) => {
  if (req.cookies?.email !== 'admin') {
    res.set('Content-Type', 'text/html');
    return res.status(500).send('<center> <h1 style="color:red;">Вы не админ<h1/>  <center/>');
  }
  // Read the file all at once synchronously
  const logPath = path.join(process.cwd(), 'files', 'log', 'logfile.log');
  const fileContents = fs.readFileSync(logPath, 'utf8');
  // Process the file contents line by line
  const lines = fileContents.split('\n');
  let trsItems = '';
  lines.forEach((line) => {
    // Process each line (in this example, each line is a JSON object)
    try {
      const data = JSON.parse(line);
      trsItems += `
      <tr>
        <td>${data.method}</td>
        <td>${data.url}</td>
        <td>${data.status}</td>
        <td>${data.responseTime}</td>
      </tr>`;
    } catch (error) { }
    // Perform operations with the data from each line
  });

  res.set('Content-Type', 'text/html');
  let html = `<!DOCTYPE html>
  <html lang="ru">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Просмотр логов маршрутизации</title>
      <style>
        main {
          display: flex;
          justify-content: center;
        }
        table {
          border: 1px solid black; /* Set all borders to 1px solid black */
          border-collapse: collapse; /* Collapse the borders into a single border */
        }
        table tr td {
          border: 1px solid black; /* Set all borders to 1px solid black */
          border-collapse: collapse; /* Collapse the borders into a single border */
        }

        th {
          border: 1px solid black; /* Set all borders to 1px solid black */
          padding: .5em;
          font-weight: bold; /* Make the headers bold */
        }
        td {
          padding: .5em;
        }
      </style>
  </head>
  <body>
      <main>
          <table>
          <caption><h1>Просмотр логов маршрутизации</h1></caption>
              <thead>
                  <tr>
                      <th>Метод</th>
                      <th>REST путь</th>
                      <th>Статус</th>
                      <th>Время ответа</th>
                  </tr>
              </thead>
              <tbody>
                ${trsItems}
              </tbody>
          </table>
      </main>
  </body>
  </html>`;
  res.send(html);
});


module.exports = router;
