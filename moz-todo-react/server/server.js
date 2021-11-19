const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');

// app.get('/', (req, res) => {
//     res.send('Server Response Success');
// })
// app.get('/hello', (req, res) => {
//     res.send({ hello : 'Hello react', goot : 'Good' });
// })
// app.listen(PORT, () => {
//   console.log(`Server On : http://localhost:${PORT}/`);
// })

app.get('/hello', (req, res) => {
    db.query("SELECT * FROM schedular", (err, data) => {
        if(!err) res.send({ products : data });
        else res.send(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

