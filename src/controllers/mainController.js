//create the controller object
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const notesLocation = path.join(__dirname, '../data/dataBase.json');
const notesFile = JSON.parse(fs.readFileSync(notesLocation, 'utf-8'));

const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

const mainController = {
    index: (req,res)=>{
        res.render('indexNotey', {notesFile:notesFile});
    },
    newNote: (req,res)=>{
        const newNote = {
            noteNumber: notesFile.length + 1,
            content: req.body.textarea1,
            bckgColor: req.body.noteColor ? req.body.noteColor : "rgb(179, 194, 147)"
        }

        const errors = validationResult(req);
        if(errors.isEmpty()){
            notesFile.push(newNote);
            fs.writeFileSync(notesLocation, JSON.stringify(notesFile, null, " "));
            res.redirect('/');
        }
        else{
            res.render('indexNotey', {notesFile:notesFile, errors:errors.mapped() /*, old:req.body*/});
        }
        
    },

    create: (req,res)=>{
        res.render('createUser');
    },
    createUser: (req,res)=>{
        newUser = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        users.push(newUser);
        console.log("new user created: ", newUser);
        fs.writeFileSync(usersLocation, JSON.stringify(users, null, " "));
        res.redirect('/');
    },

    login: (req,res)=>{
        res.render('login');
    },
    processLogin: (req,res)=>{
        let errors = validationResult(req);
        let userToLog = undefined;

        if(errors.isEmpty()){
            for(let i=0;i<users.length; i++){
                console.log('Vuelta 1 en file usuarios');
                if(users[i].username == req.body.username){
                    console.log("Username coincides");
                    if(bcrypt.compareSync(req.body.password, users[i].password)){
                        console.log('password checked', req.body.password, users[i].password);
                        userToLog = users[i];
                        break;
                    }
                }
            }

            console.log('User and pass coincide');

            if(userToLog == undefined){
                res.render('login', {errors: [
                    {msg: 'Check credentials'}
                ]})
            }

            req.session.userToLog = userToLog;

            if(req.body.remember != undefined){
                res.cookie('remember account', userToLog.username, {maxAge: 60000});
                console.log('remember account');
            }
            else{
                console.log('not checked');
            }
            res.redirect('/');
        }
        
        else{
            res.render('login', {errors: errors.mapped()});
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
            bckgColor: req.body.noteColor ? req.body.noteColor : noteToEdit.bckgColor
        }

        let updatedNote = notesFile;
        updatedNote[id-1] = noteToEdit;

        fs.writeFileSync(notesLocation, JSON.stringify(updatedNote, null, " "));
        res.redirect('/');
    },

    delete: (req,res)=>{
        let id = req.params.id;
        let notesAfterDelete = notesFile.filter(note=>{ return note.noteNumber != id});

        console.log("deleted note", id);
        console.log(notesAfterDelete);

        fs.writeFileSync(notesLocation, JSON.stringify(notesAfterDelete, null, " "));
        res.redirect('/');
    }

    
}

module.exports = mainController;

///Users/user/OneDrive/Programming/JS/note_taker2/src/views/indexNotey.html