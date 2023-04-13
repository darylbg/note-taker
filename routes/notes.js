const notesRouter = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { customMiddleware } = require('../middleware/middleware');

// Custom middleware
notesRouter.use(customMiddleware);

// GET route retrives all data from db.json
notesRouter.get('/', (req, res) => {
    fs.promises.readFile('./db/db.json')
        .then(data => res.json(JSON.parse(data)))
        .catch(error => {
        console.error(error);
        return res.status(500).json({ message: 'Error reading data from file' });
        });
});

// POST route for adding content to the database
notesRouter.post('/', (req, res) => {
    // Decontructs the .json 
    const { title, text } = req.body;
    // If there is a tile and text, new note created with unique id
    if (title && text) {
        const note = {
            title,
            text,
            id: uuidv4()
        };
        // .json file is read and new note is pushed to the json array
        fs.readFile('./db/db.json', (error, data) => {
            if (error) {
                throw error
            } else {
                var notes = JSON.parse(data);
                notes.push(note);
                // The new array with the added note is written to overide the old .json file 
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

// DELETE route do handle removing content from the database
notesRouter.delete('/:id', (req, res) => {
    // The id of the selected note is set to a variable
    const noteId = req.params.id.toString();
    // .json file is read
    fs.readFile('./db/db.json', (error, data) => {
        if (error) {
            throw error;
        } else {
            // .json file is filterred to only include id's not matching the selected id
            var notes = JSON.parse(data);  
            const updatedNotes = notes.filter((note) => note.id !== noteId);
            // The remaining array of notes are written back over the .json file
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