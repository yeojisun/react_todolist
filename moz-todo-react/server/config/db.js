var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    user : 'react_test',
    password : '1111',
    database : 'react_test'
});

module.exports = db;