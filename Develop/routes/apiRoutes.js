const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    let notes = JSON.parse(data);
    res.json(notes);
});

router.post('/notes', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    let notes = JSON.parse(data);
    let newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), 'utf8');
    res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
    let data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    let notes = JSON.parse(data);
    let updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes), 'utf8');
    res.json(updatedNotes);
});

module.exports = router;
