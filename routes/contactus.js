var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var mySQLDB = require('./../Models/my-sql-db');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.session = req.session;
    res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs'});
});

router.get('/contactuspage', function(req, res, next) {

    res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs' });
});





let transporter;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//
//     // create reusable transporter object using the default SMTP transport
//      transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: account.user, // generated ethereal user
//             pass: account.pass  // generated ethereal password
//         }
//     });
//
//
// });


transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'pushkaradhikari1991@gmail.com', // generated ethereal user
        pass: 'lunkhudeurali'  // generated ethereal password
    }
});

router.post('/contactuspage', function(req, res, next) {
    var textemail = req.body.textemail;
    var textmessage = req.body.textmessage;
    var radios = req.body.radios;
    var textsurname = req.body.textsurname;
    var textfirstname = req.body.textfirstname;
    var textstreet = req.body.textstreet;
    var textpostal = req.body.textpostal;
    var textphone = req.body.textphone;

    console.log("textmessage " + textmessage);
    console.log("textemail " + textemail);
    console.log("radios " + radios);
    console.log("textsurname " + textsurname);
    console.log("textfirstname " + textfirstname);
    console.log("textstreet " + textstreet);
    console.log("textpostal " + textpostal);
    console.log("textphone " + textphone);


    var sql = "INSERT INTO contactus (textemail, textmessage, radios, textsurname, textfirstname, textstreet, textpostal, textphone) VALUES ("+ mysql.escape(textemail) +","+ mysql.escape(textmessage)+","+mysql.escape(radios)+","+mysql.escape(textsurname)+","+mysql.escape(textfirstname)+","+mysql.escape(textstreet)+","+mysql.escape(textpostal)+","+mysql.escape(textphone)+")";
    // ("+ mysql.escape(textemail) +","+ mysql.escape(textmessage)+","+mysql.escape(radios)+","+mysql.escape(textsurname)+","+mysql.escape(textfirstname)+","+mysql.escape(textstreet)+","+mysql.escape(textpostal)+","+mysql.escape(textphone)+")";
    console.log('SQL Statement: '+ sql);
    console.log('SQL Statement: '+ sql);
    mySQLDB.connection.query(sql, function (err, result) {
        if (err) {
            res.render('error',{message: 'Error while inserting new record '+err, error:{status: "DB Exception", stack: err}});
            console.log('error occur while inserting new record');
            throw err;
        }
        else {
            console.log("1 record inserted");



            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Pushkar Adhikari 👻" <foo@blurdybloop.com>', // sender address
                to: textemail, // list of receivers
                subject: 'Welcome To Kiel', // Subject line
                text: textmessage, // plain text body
                html: 'Thank you very much for contacting us, We will contact you as soon as possible.' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (err) {
                    return console.log('Error while sending Email ', error);
                    res.render('error',{message: 'Error while inserting new record '+err, error:{status: "DB Exception", stack: err}});
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.render('template', { title: 'WebApp', page_name  : 'thanks.ejs', F_Name:textfirstname});
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });






        }
    });
    // console.log('new contactus created');
   // res.render('events', {data: rows})






    // res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs' });
});


module.exports = router;


