var mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: '6161',
    database: 'TESTDB',
});

module.exports = db;