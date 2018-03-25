var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.session = req.session;
    res.render('template', { title: 'WebApp', page_name  : 'home.ejs'});
});

router.get('/about', function(req, res, next) {
    res.render('template', { title: 'About Us', page_name  : 'about.ejs' });
});

module.exports = router;
