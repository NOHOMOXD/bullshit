const Router = require('express');
const FilePathService = require('../services/FilePathService');
const xml = require('fast-xml-parser');
const fs = require('fs');
const path   = require('path')
const router = Router();

router.get('/search', (req, res, next) => {
  const xmlData = fs.readFileSync(path.join(FilePathService.getFrontPath(), '/catalog/catalog.xml'));
  const parser = new xml.XMLParser();
  let jsonData = parser.parse(xmlData);
  const {treasure, text, sorting} = req.query;
  if (treasure) {
    jsonData = jsonData.catalog[treasure] || [];
  }
  else {
    let tmpJsonData = [];
    for (const key in jsonData.catalog) {
      tmpJsonData = [...tmpJsonData, ...jsonData.catalog[key]];
    }
    jsonData = tmpJsonData;
  }
  if (text) {
    jsonData = jsonData.filter(item => item.name.includes(text));
  }
  if (sorting == 'price_d') {
    jsonData = jsonData.sort((a, b) => a.coast - b.coast);
  }
  else if (sorting == 'price_u') {
    jsonData = jsonData.sort((a, b) => b.coast - a.coast);
  }
  res.send(jsonData);
});

router.post('/signup', (req, res, next) => {
  // Read the XML file
  const xmlFilePath = path.join(FilePathService.getFrontPath(), '/auth/users.xml');
  const xmlData = fs.readFileSync(xmlFilePath, 'utf8');

  // Parse the XML data
  const parser = new xml.XMLParser();
  const jsonData = parser.parse(xmlData);

  // Add the new user to the parsed data
  const formUser = req.body;
  jsonData.users.user.push(formUser);

  // Convert the modified JSON data back to XML
  const builder = new xml.XMLBuilder();
  const newXmlData = builder.build(jsonData);

  // Save the updated XML data back to the file
  fs.writeFileSync(xmlFilePath, newXmlData, 'utf8');

  // Send a JSON response indicating success
  return res.json({
    result: true
  });
});

router.post('/existings', (req, res, next) => {
  const xmlUsers = fs.readFileSync(path.join(FilePathService.getFrontPath(), '/auth/users.xml'));
  const parser = new xml.XMLParser();
  let {users} = parser.parse(xmlUsers);
  users = users.user;
  const formUser = req.body;
  const result = users.find(user => user.email == formUser.email);
  if (!result) {
    return res.json({
      result: false
    })
  }

  return res.json({
    result: 'Пользователь с такой почтой уже существует',
  })
});

module.exports = router;
