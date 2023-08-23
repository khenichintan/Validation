const mysql = require('mysql2')

const db = mysql.createConnection({
    host: '127.0.0.1',
    database: 'task',
    user: 'root',
    password: 'Kheni@123'
});
module.exports = db;