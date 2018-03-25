var express = require('express');
const mysql = require('mysql');
var router = express.Router();
var mySQLDB = require('./../Models/my-sql-db');
var session = require('express-session')
mySQLDB.openDB();


/* GET users listing. */
router.post('/signup', function(req, res, next) {
  console.log('signup route');
    var Email = req.body.Email;
    var Password = req.body.Password;
    var PasswordConfirm = req.body.PasswordConfirm;
    var F_Name = req.body.F_Name;
    var L_Name = req.body.L_Name;


    console.log(Email, Password, PasswordConfirm);

    mySQLDB.connection.query('SELECT * FROM User WHERE Email='+mysql.escape(Email), (err, rows) => {
        if (err)
        {
            console.log('Exception occour in database connection!');
            res.render('error',{message: "May be Network firewall blocked  MySQL connection!", error:{status: "DB Exception", stack: err}});
        }
        else {
          if(rows.length>0){
              console.log('This email already registered');
              res.render('error',{message: 'This email already registered', error:{status: "", stack: err}});
          }
          else
          {
              var sql = "INSERT INTO User (Email, Password,F_Name,L_Name) VALUES ("+ mysql.escape(Email) +","+ mysql.escape(Password)+","+mysql.escape(F_Name)+","+mysql.escape(L_Name) +")";
              console.log('SQL Statement: '+ sql);
              mySQLDB.connection.query(sql, function (err, result) {
                  if (err) {
                      res.render('error',{message: 'Error while inserting new record '+err, error:{status: "DB Exception", stack: err}});
                      console.log('error occur while inserting new record');
                      throw err;
                  }
                  else {
                      console.log("1 record inserted");
                      res.render('template', { title: 'WebApp', page_name  : 'home.ejs', F_Name:F_Name});
                  }
              });
              console.log('new user created');
              res.render('events', {data: rows})
          }

        }

    });
});
router.post('/signin', function(req, res, next){
    console.log('signin route');
    var password = req.body.password;
    var email = req.body.email;
    console.log(email, password);
    mySQLDB.connection.query('SELECT * FROM User WHERE Email='+mysql.escape(email), (err, rows) => {
        if (err) {
            console.log('Exception occour in database connection!');
            res.render('error', { message: "May be Network firewall blocked  MySQL connection!", error: {status: "DB Exception", stack: err}
            });
        }
        else {
            if (rows.length > 0) {
                console.log('This email already registered');


                req.session.authenticated = true;
                req.session.F_Name = rows[0].F_Name;
                res.locals.session = req.session;
                res.render('template', { title: 'WebApp', page_name  : 'home.ejs'});
            }else{
                res.render('error', { message: "No user registered with this email", error: {status: "", stack: err}});
            }
        }
    });


});
router.get('/signout', function(req, res, next){
    req.session.authenticated = null;
    req.session.F_Name = null;
    res.locals.session = req.session;
    res.render('template', { title: 'WebApp', page_name  : 'home.ejs'});
});

module.exports = router;
