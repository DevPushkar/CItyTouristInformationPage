const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11201991',
    password: '6ixHdPXI1e',
    database: 'sql11201991'
});
var connect =function () {
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });
}
var close = function () {
    connection.end(function (err) {
        if (err) {
            console.log('Connection not closed');
            return;
        }
        console.log('Connection closed');
    });

};


exports.openDB = connect;
exports.closeDB = close;
