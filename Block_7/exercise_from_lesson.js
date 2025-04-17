const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors());

let books = [
    {id: 1, title: 'diary of a wimpy kid I', author: 'Jeff Kinney', year: 2005},
    {id: 2, title: 'diary of a wimpy kid II', author: 'Jeff Kinney', year: 2008}
];

let bookid = books[books.length - 1];

app.get('/books', (req, res) => {
    res.json(books);
})

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let book = books.find(b => b.id === id);
    res.status(200).json(book)
})

app.post("/books", (req, res) => {
    const newBook = req.body

    books.push(newBook);
    res.json(newBook);
})

app.listen(3000,"0.0.0.0",() => {
    console.log(`Server läuft auf Port 3000`);
});