const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/contact-us', function(req, res, next) {
  res.render('contact-us', { title: 'Express' });
});

module.exports = router;