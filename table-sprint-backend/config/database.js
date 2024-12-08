const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sanjay@123',
  database: 'tablesprint'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Database connection success');
});

module.exports = connection;
