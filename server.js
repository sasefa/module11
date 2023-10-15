const path = require('path');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
app.use(express.static('public'));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));

const fs = require('fs');
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { v4: uuidv4 } = require('uuid');
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            const newNote = req.body;
            // Add a unique id to the new note using uuid
            newNote.id = uuidv4();
            notes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
                if (err) throw err;
                res.status(200).json(notes);
            });
        }
    });
});


