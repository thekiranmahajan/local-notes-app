const btn = document.getElementById("btn");
const noteContainer = document.querySelector(".notes-container");

function createNoteEl(id, content) {
  const textArea = document.createElement("textarea");
  textArea.classList.add("note-card");
  textArea.placeholder = "Empty note";
  textArea.value = content;

  const deleteNote = () => {};
  const updateNote = () => {};
  textArea.addEventListener("dblclick", (e) => {
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
  const noteObject = {
    id: Math.floor(Math.random() * 1000),
    content: "",
  };
  const noteEl = createNoteEl(noteObject.id, noteObject.content);
  noteContainer.insertBefore(noteEl, btn);
}

btn.addEventListener("click", addNote);
