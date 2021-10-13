const express = require('express'); //Require express
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');//import session to create user session
const cookieParser = require('cookie-parser');
const rememberMiddleware = require('./middlewares/cookieAuthMiddleware')

const port = process.env.PORT || 3000; //Set up port for heroku


//Define the public constant as the path for static files for express
const public = path.resolve(__dirname, "../public");
app.use(express.static(public));

//To be able to read the body (info that comes through forms)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//To be able to put and delete
app.use(methodOverride('_method'));

//middleware for session data
app.use(session({secret: "mensajesecreto"}));
app.use(cookieParser());
app.use(rememberMiddleware);

// We set Ejs variavles and refer to /views folder for the module to find it
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.listen(port, ()=>{
    console.log('Server init at port or http://localhost:3000');
});

const mainRouters = require('./routers/main');

app.use('/', mainRouters);
// app.get('/', (req,res)=>{
//     res.sendFile(path.resolve('./views/indexNotey.html'));
// });