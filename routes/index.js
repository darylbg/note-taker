const express = require('express');
const notesRouter = require('./notes.js');

const app = express();
// All routes including /notes will refer to the routes set in notes.js
app.use('/notes', notesRouter);

module.exports = app;