const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getSchedular', (req, res) => {
    db.query('SELECT * FROM schedular', (err, data) => {
        if (!err) res.send({ schedular: data });
        else res.send(err);
    });
});

app.post('/setSchedular', function (req, res) {
    const body = req.body;
    db.query(
        'insert into schedular (title, comment, completed, reg_date) value(?,?,?,?);',
        [body.title, body.comment, body.completed, body.reg_date],
        function () {
            res.redirect('/');
        }
    );
});

app.post('/updSchedular', function (req, res) {
    const body = req.body;
    var query = '';
    const param = [];
    if (body.completed === undefined) {
        param.push(body.title);
        param.push(body.comment);
        param.push(body.no);
        query = 'update schedular set title=?, comment=?  where no=?;';
    } else {
        param.push(body.completed);
        param.push(body.no);
        query = 'update schedular set completed=?  where no=?;';
    }

    db.query(query, param, function () {
        res.redirect('/');
    });
});

app.post('/delSchedular', function (req, res) {
    const body = req.body;
    console.log(body);
    db.query('delete from schedular where no=?;', [body.no], function () {
        res.redirect('/');
    });
});

// app.get('/delSchedular', (req, res) => {
//     db.query("SELECT * FROM schedular", (err, data) => {
//         if(!err) res.send({ schedular : data });
//         else res.send(err);
//     })
// })

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});