//create the controller object
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');


const notesLocation = path.join(__dirname, '../data/dataBase.json');
const notesFile = JSON.parse(fs.readFileSync(notesLocation, 'utf-8'));

const mainController = {
    index: (req,res)=>{
        res.render('indexNotey', {notesFile:notesFile});
    },
    newNote: (req,res)=>{
        const newNote = {
            noteNumber: notesFile.length + 1,
            content: req.body.textarea1,
            bckgColor: "rgb(179, 194, 147)"
        }

        const errors = validationResult(req);
        if(errors.isEmpty()){
            notesFile.push(newNote);

            fs.writeFileSync(notesLocation, JSON.stringify(notesFile, null, " "));
            res.redirect('/');
        }
        else{
            console.log('SHOULD DISPLAY ERROR', errors.mapped());
            res.render('indexNotey', {notesFile:notesFile, errors:errors.mapped() /*, old:req.body*/});
        }
        
    },
    edit: (req,res)=>{
        const id = req.params.id;
        const note = notesFile.find(note =>{
            return note.noteNumber == id;
        })
        res.render('editForm', {note});
    },

    editSave: (req,res)=>{
        const id = req.params.id;
        let noteToEdit = notesFile.find(note => {
            return note.noteNumber == id;
        });
        console.log(id);

        noteToEdit = {
            noteNumber: noteToEdit.noteNumber,
            content: req.body.textarea1,
            bckgColor: noteToEdit.bckgColor
        }

        let updatedNote = notesFile;
        updatedNote[id-1] = noteToEdit;

        fs.writeFileSync(notesLocation, JSON.stringify(updatedNote, null, " "));
        res.redirect('/');
    }

    
}

module.exports = mainController;

///Users/user/OneDrive/Programming/JS/note_taker2/src/views/indexNotey.html