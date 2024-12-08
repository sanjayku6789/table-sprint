const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');

const register = (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  connection.query(query, [username, email, hashedPassword], (err) => {
    if (err) return res.status(500).send('Error registering user');
    res.status(201).send('User registered');
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;

  connection.query(query, [email], (err, results) => {
    if (err) return res.status(500).send('Error logging in');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user.id }, 'tablesprint_access_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
};

module.exports = { register, login };
