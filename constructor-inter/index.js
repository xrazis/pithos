const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'constructor_db'
});

db.connect();

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users;';

    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

app.post('/users', (req, res) => {
    const {firstname, lastname, email, telephone, category} = req.body;
    const id = crypto.randomBytes(4).toString('hex');

    const newUser = [id, firstname, lastname, email, telephone, category];
    const sql = 'INSERT INTO users (id, firstname, lastname, email, telephone, category) VALUES (?, ?, ?, ?, ?, ?);';

    db.query(sql, newUser, (err, result) => {
        if (err) console.log(err);

        res.redirect('/users/' + id);
    });

});

app.get('/users/new', (req, res) => {
    res.render('signup');
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM users WHERE users.id = ?;';

    db.query(sql, id, (err, result) => {
        if (err) console.log(err);

        res.json(result);
    });
});

app.get('/users/:id/edit', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM users WHERE users.id = ?;';

    db.query(sql, id, (err, result) => {
        if (err) console.log(err);

        res.render('edit', {
            user: result,
            user_id: id
        });
    });
});

app.put('/users/:id', (req, res) => {
    const {firstname, lastname, email, telephone, category} = req.body;
    const id = req.params.id;
    const updateUser = [firstname, lastname, email, telephone, category, id];
    const sql = 'UPDATE users SET firstname = ?, lastname=?, email = ?, telephone = ?, category = ? WHERE id = ?;';

    db.query(sql, updateUser, (err, result) => {
        if (err) console.log(err);

        res.redirect('/users/' + id);
    });
});

app.listen(3000, () => {
    console.log('Constructor-interview running on http://localhost:3000');
});