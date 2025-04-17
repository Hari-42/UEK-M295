let books = [
    {
        "isbn": "978-3-16-148410-0",
        "title": "Der Prozess",
        "year": 1925,
        "author": "Franz Kafka"
    },
    {
        "isbn": "978-0-14-028333-4",
        "title": "1984",
        "year": 1949,
        "author": "George Orwell"
    },
    {
        "isbn": "978-3-598-21500-4",
        "title": "Der Herr der Ringe",
        "year": 1954,
        "author": "J.R.R. Tolkien"
    },
    {
        "isbn": "978-0-06-112008-4",
        "title": "To Kill a Mockingbird",
        "year": 1960,
        "author": "Harper Lee"
    }
];

const express = require('express');
const session = require('express-session');
const app = express();
const port = 3006;

app.use(express.json());

app.use(session({
    secret: 'geheimnis',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const validEmail = "desk@library.example";
    const validPassword = "m295";

    if (email === validEmail && password === validPassword) {
        req.session.authenticated = true;
        req.session.user = { email };
        res.status(201).json({ email });
    } else {
        res.status(401).send("Ungültige Anmeldedaten");
    }
});


app.get('/verify', (req, res) => {
    if (req.session.authenticated) {
        res.status(200).send(req.session.user);
    } else {
        res.status(401).send("Nuh uh");
    }
});

app.delete('/logout', (req, res) => {
    req.session.authenticated = false;
    res.send('Name wurde aus der Session gelöscht.');
})

function validateBook(book) {
    return !(!book.isbn || !book.title || !book.year || !book.author);
}

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let book = books.find(x => x.isbn === isbn);
    res.send(book);
});

app.post('/books', (req, res) => {
    let newBook = req.body;
    if (!validateBook(newBook)) {
        return res.status(422).json({message: "All fields must be provided (isbn, title, year, author)"});
    }
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let updatedBook = req.body;

    if (!validateBook(updatedBook)) {
        return res.status(422).json({message: "All fields must be provided (isbn, title, year, author)"});
    }

    let bookIndex = books.findIndex(book => book.isbn === isbn);
    if (bookIndex === -1) {
        return res.status(404).json({message: "Book not found"});
    }

    books[bookIndex] = {...updatedBook};
    res.status(200).json(books[bookIndex]);
});

app.delete('/books/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let index = books.findIndex(x => x.isbn === isbn);
    if (index === -1) {
        return res.status(404).json({message: "Book not found"});
    }
    books.splice(index, 1);
    res.status(204).send();
});

app.patch('/books/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let updatedFields = req.body;

    for (let field in updatedFields) {
        if (!updatedFields[field]) {
            return res.status(422).json({message: `Field ${field} cannot be empty`});
        }
    }

    let bookIndex = books.findIndex(book => book.isbn === isbn);

    books[bookIndex] = {...books[bookIndex], ...updatedFields};
    res.status(200).json(books[bookIndex]);
});


app.listen(port, () => {
    console.log(`Server läuft auf Port`);
});