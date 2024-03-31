const Router = require('express');
const FilePathService = require('../services/FilePathService');
const fs = require('fs');
const path   = require('path')
const router = Router();

router.get('', (req, res, next) => {
  const reviews = fs.readFileSync(path.join(FilePathService.getFrontPath(), '/feedback/feedback.json'));
  return res.json(JSON.parse(reviews));
});

router.post('', (req, res, next) => {
  const feedbackPath = path.join(FilePathService.getFrontPath(), '/feedback/feedback.json');
  const reviews = fs.readFileSync(feedbackPath);
  const formFeedback = req.body;
  const reviewsJson = JSON.parse(reviews);
  reviewsJson.push(formFeedback);

  fs.writeFileSync(feedbackPath, JSON.stringify(reviewsJson), 'utf8');

  return res.json({
    result: true
  });
});

module.exports = router;
