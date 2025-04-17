const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

let tasks = [
    {
        "id": 1,
        "title": "Hausaufgaben",
        "description": "Finanzaufgaben lösen",
        "Done": true,
        "DueDate": "24.04.2025"
    },
    {
        "id": 2,
        "title": "Projektarbeit",
        "description": "PowerPoint für Präsentation erstellen",
        "Done": false,
        "DueDate": "22.04.2025"
    },
    {
        "id": 3,
        "title": "Literaturrecherche",
        "description": "Quellen für Seminararbeit sammeln",
        "Done": false,
        "DueDate": "26.04.2025"
    },
    {
        "id": 4,
        "title": "Mathe lernen",
        "description": "Integralrechnung wiederholen",
        "Done": true,
        "DueDate": "20.04.2025"
    }
]

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
});

function validateTask(task) {
    return task.id && task.title && task.description && task.Done && task.DueDate;
}

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/:id', (req, res) => {
    let isbn = req.params.isbn;
    let task = tasks.find(x => x.isbn === isbn);
    if (!task) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(task);
});

app.post('/tasks', (req, res) => {
    let newtask = req.body;
    if (!validateTask(newtask)) {
        return res.status(422).json({ message: "All fields must be provided (isbn, title, year, author)" });
    }
    tasks.push(newtask);
    res.status(201).json(newtask);
});

app.put('/tasks/:id', (req, res) => {
    let isbn = req.params.isbn;
    let updatedTask = req.body;

    if (!validateTask(updatedTask)) {
        return res.status(422).json({ message: "All fields must be provided (isbn, title, year, author)" });
    }

    let taskindex = tasks.findIndex(task => task.id === id);
    if (taskindex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    tasks[taskIndex] = { ...updatedTask };
    res.status(200).json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    let id = req.params.isbn;
    let index = tasks.findIndex(x => x.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    tasks.splice(index, 1);
    res.status(204).send();
});

app.patch('/tasks/:id', (req, res) => {
    let id = req.params.isbn;
    let updatedFields = req.body;

    for (let field in updatedFields) {
        if (!updatedFields[field]) {
            return res.status(422).json({ message: `Field ${field} cannot be empty` });
        }
    }

    let taskIndex = tasks.findIndex(task => task.id === id);5
    if (taskIndex === -1) {
        return res.status(404).json({ message: "task not found" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedFields };
    res.status(200).json(tasks[taskIndex]);
});

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
