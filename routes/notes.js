const notesRouter = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// GET route retrives all data from db.json
notesRouter.get('/', (req, res) => {
    fs.promises.readFile('./db/db.json')
        .then(data => res.json(JSON.parse(data)))
        .catch(error => {
        console.error(error);
        return res.status(500).json({ message: 'Error reading data from file' });
        });
});

notesRouter.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const note = {
            title,
            text,
            id: uuidv4()
        };

        fs.readFile('./db/db.json', (error, data) => {
            if (error) {
                throw error
            } else {
                var notes = JSON.parse(data);
                notes.push(note);

                fs.writeFile('./db/db.json', JSON.stringify(notes), (error) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log('successfully saved note to db.json');
                    }
                });
            }
        })
        const response = {
            status: 'success',
            body: note
        };

        res.json(response);
    } else {
        res.json('Error in creating note')
    }

});

notesRouter.delete('/:id', (req, res) => {
    const noteId = req.params.id.toString();
    console.info(noteId);

    fs.readFile('./db/db.json', (error, data) => {
        if (error) {
            throw error;
        } else {
            var notes = JSON.parse(data);
            
            const updatedNotes = notes.filter((note) => note.id !== noteId);
            console.info(updatedNotes);
            fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (error) => {
                if (error) {
                    throw error
                } else {
                    console.log('successfully deleted note');
                    res.send(`note id: ${noteId} deleted`);
                }
            });
        }
    });
});

module.exports = notesRouter;