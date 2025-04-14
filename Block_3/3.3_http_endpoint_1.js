import fs from 'fs';
import path from 'path';
import express from 'express'

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]):/, '$1:');


const names = [
    "Max", "Anna", "John", "Marie", "Paul", "Eva", "Sophia", "Lukas", "Mia", "Tom",
    "Laura", "David", "Sarah", "James", "Nina", "Michael", "Isabel", "Simon", "Lisa", "Peter", "Julia"
]

app.get('/now', (req, res) => {
    const currentTime = new Date().toISOString();
    res.json({ time: currentTime });
});

app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});

app.get('/name', (req, res) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    res.json({ name: randomName });
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'image.png'));
});

app.get('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot");
});

app.get('/user-agent', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.json({ 'user-agent': userAgent });
});

app.get('/secret', (req, res) => {
    res.status(403).send('Forbidden');
});

app.get('/xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    fs.createReadStream(path.join(__dirname, 'data.xml')).pipe(res);
});

app.get('/me', (req, res) => {
    res.json({
        first_name: "Max",
        last_name: "Mustermann",
        age: 30,
        city: "Musterstadt",
        eye_color: "blue"
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
