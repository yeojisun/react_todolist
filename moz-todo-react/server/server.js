const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');
const bodyParser = require("body-parser");

// app.get('/', (req, res) => {
//     res.send('Server Response Success');
// })
// app.get('/hello', (req, res) => {
//     res.send({ hello : 'Hello react', goot : 'Good' });
// })
// app.listen(PORT, () => {
//   console.log(`Server On : http://localhost:${PORT}/`);
// })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getSchedular', (req, res) => {
    db.query("SELECT * FROM schedular", (err, data) => {
        if(!err) res.send({ schedular : data });
        else res.send(err);
    })
})

app.post('/setSchedular', function (req, res) {
  const body = req.body;
  db.query('insert into schedular (title, comment, completed, reg_date) value(?,?,?,?);', [
    body.title,
    body.comment,
    body.completed,
    body.reg_date
  ], function() {
    res.redirect('/')
  })
})

app.post('/updSchedular', function (req, res) {
  const body = req.body;
	console.log(body);
  db.query('update schedular set title=?, comment=?, completed=?  where no=?;', [
    body.title,
    body.comment,
    body.completed,
    body.no
  ], function() {
    res.redirect('/')
  })
})

// app.get('/delSchedular', (req, res) => {
//     db.query("SELECT * FROM schedular", (err, data) => {
//         if(!err) res.send({ schedular : data });
//         else res.send(err);
//     })
// })


app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

