const fs = require('fs');
const path = require('path');

const notesLocation = path.join(__dirname, '../data/dataBase.json');
const notesFile = JSON.parse(fs.readFileSync(notesLocation, 'utf-8'));
const User = require('../models/users.js');

const Note = {
    findAll: function (){
        return notesFile;
    },

    notesByUser: function (user){
        let noteCount = 0;
        for(let i=0;i<notesFile.length;i++){
            if(notesFile[i].owner == user){
                noteCount ++;
            }
        }
        return noteCount;
    }
}

module.exports = Note;