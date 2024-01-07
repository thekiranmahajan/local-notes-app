const btn = document.getElementById("btn");
const noteContainer = document.querySelector(".notes-container");
const deleteAll = document.getElementById("delete-all");
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  noteContainer.insertBefore(noteEl, btn);
});

function createNoteEl(id, content) {
  const textArea = document.createElement("textarea");
  textArea.classList.add("note-card");
  textArea.placeholder = "Empty Note";
  textArea.value = content;
  textArea.id = id;

  const deleteNote = (id, textArea) => {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNotes(notes);
    noteContainer.removeChild(textArea);
  };
  const updateNote = (id, content) => {
    const notes = getNotes();
    const targetedNote = notes.filter((note) => note.id == id)[0];
    targetedNote.content = content;
    saveNotes(notes);
  };

  textArea.addEventListener("dblclick", () => {
    const warning = confirm("Do you really want to delete this Note?");
    if (warning) {
      deleteNote(id, textArea);
    }
  });
  textArea.addEventListener("input", () => {
    updateNote(id, textArea.value);
  });
  return textArea;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObject.id, noteObject.content);
  noteContainer.insertBefore(noteEl, btn);
  notes.push(noteObject);
  saveNotes(notes);
}
function saveNotes(notes) {
  localStorage.setItem("note-dashboard", JSON.stringify(notes));
}
function getNotes() {
  return JSON.parse(localStorage.getItem("note-dashboard") || "[]");
}

btn.addEventListener("click", addNote);

const deleteAllNotes = () => {
  document.querySelectorAll(".note-card").forEach((note) => {
    noteContainer.removeChild(note);
    console.log(note);
  });
  localStorage.clear();
};

deleteAll.addEventListener("click", deleteAllNotes);
