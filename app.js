const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const public = path.resolve(__dirname, "./public");
app.use(express.static(public));

app.listen(port, ()=>{
    console.log('Server init at port or http://localhost:3000');
});

app.get('/', (req,res)=>{
    res.sendFile(path.resolve('./views/indexNotey.html'));
});