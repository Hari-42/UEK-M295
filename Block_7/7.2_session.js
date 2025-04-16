const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.post('/name', (req, res) => {
    const { name } = req.body;
    req.session.name = name;
    res.send(`name "${name}" was saved in the session.`);
});


app.get('/name', (req, res) => {
    const name = req.session.name;
    if (name) {
        res.send(`The name in the session is saved: ${name}`);
    } else {
        res.send('No name is saved in the session.');
    }
});


app.delete('/name', (req, res) => {
    delete req.session.name;
    res.send('The name was deleted from the session.');
});


app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});