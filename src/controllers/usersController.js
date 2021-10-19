const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/users.js');

const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

const usersController = {
    create: (req,res)=>{
        res.render('createUser');
    },
    createUser: (req,res)=>{
        newUser = {
            id: users.length,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        if(User.findByField('username', newUser.username)!=undefined){
            return res.render('createUser', {errors: {username: {msg: 'Username taken'}}
        });
        }

        users.push(newUser);
        console.log("new user created: ", newUser);
        fs.writeFileSync(usersLocation, JSON.stringify(users, null, " "));
        res.redirect('/login');
    },

    login: (req,res)=>{
        res.render('login');
    },
    processLogin: (req,res)=>{
        let errors = validationResult(req);
        let userToLog = undefined;

        if(errors.isEmpty()){
            for(let i=0;i<users.length; i++){
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
    }
}

module.exports = usersController;