const Router = require('express');
const FilePathService = require('../services/FilePathService');
const xml = require('fast-xml-parser');
const fs = require('fs');
const path   = require('path')
const router = Router();

router.post('/login', (req, res, next) => {
  const xmlUsers = fs.readFileSync(path.join(FilePathService.getFrontPath(), '/auth/users.xml'));
  const parser = new xml.XMLParser();
  const {users} = parser.parse(xmlUsers);
  const formUser = req.body;
  const result = users.user.find(user => user.email == formUser.email && user.password == formUser.password);
  res.cookie('email', result.email);
  if (!result) {
    return res.json({
      result: false
    })
  }
  return res.json({
    result: true,
    name: result.name,
    lastname: result.lastname,
  })
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

router.post('/logout', (req, res, next) => {
  res.cookie('email', '');
  return res.json({
    result: true
  })
});

module.exports = router;
