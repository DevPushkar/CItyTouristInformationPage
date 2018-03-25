var express = require('express');
var router = express.Router();
var mySQLDB = require('./../Models/my-sql-db');

router.use('/', function (req, res) {
    mySQLDB.connection.query('SELECT * FROM FamousPlaces', (err, rows) => {
        if (err)
        {
            console.log('Exception occour in database connection!');
            res.render('error',{message: "Network firewall blocked the MySQL connection!", error:{status: "DB Exception", stack: err}});
        }
        else {
            res.render('template', { title: 'WebApp', page_name  : 'famousplaces.ejs' , data: rows});
        }

    });
});

router.get('/detailplaces', function(req, res, next) {
    console.log('Hi hi hi');
    res.send('sfssfsdfsd afasfs');
    res.render('template', { title: 'WebApp', page_name  : 'famousplaces.ejs' });
});


module.exports = router;
