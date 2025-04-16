const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();


app.get('/public', (req, res) => {
    res.send('public');
})

const customAuth = (req, res, next) => {
    const { username, password } = req.query;

    if (username === 'zli' && password === 'zli1234') {
        return next();
    }

    res.status(401).send('Access denied.');
};


app.get('/private', customAuth, (req, res) => {
    res.send('private, access allowed!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server runs on ${port}`));