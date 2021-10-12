// const path = require('path');
// const fs = require('fs');

// const notesLocation = path.join(__dirname, '../data/dataBase.json');
// const notesFile = JSON.parse(fs.readFileSync(notesLocation, 'utf-8'));

// const colorList =  {
//     a: "rgb(179, 194, 147)",
//     b: "rgb(147, 160, 194)",
//     c: "rgb(194, 147, 161)",
//     d: "rgb(147, 194, 186)"
// }

// let btn_color1 = document.querySelector("#colorBt1" + notesFile[0].noteNumber);
// let btn_color2 = document.querySelector("#colorBt2" + notesFile[0].noteNumber);
// let btn_color3 = document.querySelector("#colorBt3" + notesFile[0].noteNumber);

// btn_color1.addEventListener('click', () => {
//     notesFile.bckgColor = colorList.b;
//     console.log('Something happened');
// });
// btn_color2.addEventListener('click', () => {
//     notes.bckgColor = colorList.c;
// });
// btn_color3.addEventListener('click', () => {
//     notes.bckgColor = colorList.d;
// });
