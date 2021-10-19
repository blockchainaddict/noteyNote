const fs = require('fs');
const path = require('path');

const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

const User = {
    findAll: function (){
        return users;
    },

    findByPk: function (id){
        let userFound = users.find(user=> user.id == id);
        return userFound;
    },

    findByField: function (field, input){
        let userFound = users.find(user => user[field] == input);
        return userFound;
    }
}

module.exports = User;