const Router = require('express');
const FilePathService = require('../services/FilePathService');
const path   = require('path');
const router = Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/index.html'));
});

router.get('/wiki', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/wiki/wiki.html'));
});

router.get('/news', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/news/news.html'));
});

router.get('/contacts', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/contacts/contacts.html'));
});

router.get('/feedback', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/feedback/feedback.html'));
});

router.get('/busket', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/busket/busket.html'));
});

router.get('/catalog', (req, res, next) => {
  res.sendFile(path.join(FilePathService.getFrontPath(), '/catalog/catalog.html'));
});


module.exports = router;
