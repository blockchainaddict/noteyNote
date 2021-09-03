let noteList = [];
let newNote = {};
countOfNotes = 0
let storedInput = localStorage.getItem('noteList');
var info = document.querySelector('#saved_notes');

let colorList =  { 
    a: "rgb(179, 194, 147)",
    b: "rgb(147, 160, 194)",
    c: "rgb(194, 147, 161)",
    d: "rgb(147, 194, 186)"
}

// Function to append a new object (new note)
function insertObject(arr, obj) {
    arr.push(obj);
}

var text_box = document.querySelector('#text2');

//Function to save to local storage
/*
function saveToLocalStorage() {
    localStorage.setItem('noteList', JSON.stringify(noteList));
}*/


// Add event listener to run function on enter
text_box.addEventListener('keydown', function(enterKey) {
    if (enterKey.key === 'Enter' && !enterKey.shiftKey) {
        enterKey.preventDefault();
        addNote();
    }
})

// Function to actually grab the input from the box
function addNote() {
    countOfNotes ++
    function play() {
        var audio = new Audio('uiSoundPop.mp3');
        audio.play();
    }
    play();


    var newNote = {
        noteNumber: countOfNotes,
        note: document.getElementById('text2').value,
        bckgColor: colorList.a
    }
    insertObject(noteList, newNote);

    // Take the input once appended to noteList and wrap
    // it around div



    let details = noteList.map(function(notes) {
        return '<div class="columns"> <div class="note_button_wrapper">' +
         '<h3 contenteditable="true">' +'Note ' + notes.noteNumber + '</h3>' + '<button ' +
          'id = "btnb' + notes.noteNumber + '">Edit Note</button>' +
           '<button class="color c1" id="colorBt1' + notes.noteNumber  + '"></button> <button class="color c2" id="colorBt2' + notes.noteNumber + '"></button> <button class="color c3" id="colorBt3' + notes.noteNumber + '"></button>  </div>' + '<div style= "background-color:' + notes.bckgColor + ';"' + ' class="note_itself" id="note' + notes.noteNumber +
            '" contenteditable="false">' + '<h4>'  + notes.note + '</h4> </div> </div>';
    });

    info.innerHTML = details.join('\n');

    /* Make Editable */

    text_box.value = "";

    noteList.map(function(notes) {
        var makeEditable = document.querySelector("#note" + notes.noteNumber);
        var btn = document.querySelector("#btnb" + notes.noteNumber);
        console.log(notes);

        /*function changeColor(colorCh = colorList.a) {
            notes.noteNumber.bckgColor = colorCh;
        }*/

        var note_itself_active = document.querySelector("#note" + notes.noteNumber);
        let h4_inNote = note_itself_active.firstChild;

        var btn_color1 = document.querySelector("#colorBt1" + notes.noteNumber);
        var btn_color2 = document.querySelector("#colorBt2" + notes.noteNumber);
        var btn_color3 = document.querySelector("#colorBt3" + notes.noteNumber);

        /* When I click the color button, I need to change the object. And then 
        the object will be read to define the note's color */

        btn_color1.addEventListener('click', () => {
            notes.bckgColor = colorList.b;
            console.log('changed in obj');
            note_itself_active.setAttribute("style", "background-color:" + notes.bckgColor + ';');
        });
        btn_color2.addEventListener('click', () => {
            notes.bckgColor = colorList.c;
            console.log('changed');
            note_itself_active.setAttribute("style", "background-color:" + notes.bckgColor + ';')
        });
        btn_color3.addEventListener('click', () => {
            notes.bckgColor = colorList.d;
            console.log('changed');
            note_itself_active.setAttribute("style", "background-color:" + notes.bckgColor + ';')
        });

        // The bckg color should be defined by the object's property

        btn.addEventListener('click', () => {
            if (makeEditable.getAttribute("contenteditable") == "false") {
                makeEditable.setAttribute("contenteditable", true);
                btn.innerHTML = 'Save';
                note_itself_active.classList.toggle('active');
                btn_color1.classList.toggle('visible');
                btn_color2.classList.toggle('visible');
                btn_color3.classList.toggle('visible');
            }
            else {
                makeEditable.setAttribute("contenteditable", false);
                btn.innerHTML = 'Edit Note';
                note_itself_active.classList.toggle('active');
                btn_color1.classList.toggle('visible');
                btn_color2.classList.toggle('visible');
                btn_color3.classList.toggle('visible');
                notes.note = h4_inNote.innerHTML;
            }
        })
    });

    saveToLocalStorage();
}