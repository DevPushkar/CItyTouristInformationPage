var express = require('express');
var router = express.Router();
var mySQLDB = require('./../Models/my-sql-db');
/* GET home page. */
// router.get('/', function(req, res, next) {
// router.get('/', function(req, res, next) {
//     res.render('template', { title: 'WebApp', page_name  : 'events.ejs' });
// });


router.use('/', function (req, res) {
    mySQLDB.connection.query('SELECT * FROM Events', (err, rows) => {
        if (err)
        {
            console.log('Exception occour in database connection!');
            res.render('error',{message: "Network firewall blocked the MySQL connection!", error:{status: "DB Exception", stack: err}});
        }
        else {
            //res.render('events', {data: rows})
            res.render('template', { title: 'WebApp', page_name  : 'events.ejs' , data: rows});
        }

    });
});
router.get('/Detail', function(req, res, next) {
    console.log('Hi hi hi');
// res.send('sfssfsdfsd afasfs');
    res.render('template', { title: 'WebApp', page_name  : 'events.ejs' });
});


module.exports = router;