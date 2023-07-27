import React, { useState } from "react";
import "./App.css";
import Note from "./components/note/Note";

export interface INote {
  id: number;
  text: string;
  title: string;
}

function App() {
  const [notesList, setNotesList] = useState<INote[]>([]);
  const [note, setNote] = useState({
    title: "",
    text: "",
    id: new Date().getTime(),
  });
  const [openAddNote, setOpenAddNote] = useState(false);

  const onTitleChangeHandler = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const onTextChangeHandler = (e) => {
    setNote({ ...note, text: e.target.value });
  };

  const addNoteHandler = () => {
    const newNote = {
      id: new Date().getTime(),
      title: note.title,
      text: note.text,
    };
    setNotesList([newNote, ...notesList]);
    setOpenAddNote(!openAddNote);
    setNote({
      title: "",
      text: "",
      id: new Date().getTime(),
    });
    console.log(notesList);
  };

  const onClickDelete = (id: number): void => {
    const updatedList = notesList.filter((el) => el.id !== id);
    setNotesList(updatedList);
  };

  const onClickOpen = () => {
    setOpenAddNote(!openAddNote);
  };

  return (
    <>
      <div className="app-bg">
        <div className="App">
          <h1>Sticky Wall</h1>
          {openAddNote ? (
            <div className="modal-bg">
              <div className="add-note-modal">
                <div className="modal-inputs">
                  <label>Title</label>
                  <input onChange={onTitleChangeHandler} value={note.title} />
                  <label>Text</label>
                  <textarea onChange={onTextChangeHandler} value={note.text} />
                </div>
                <button className="add-btn" onClick={addNoteHandler}>
                  Add
                </button>
                <button className="close-modal" onClick={onClickOpen}>
                  X
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="notes__container">
          {notesList.map((note) => (
            <Note note={note} onDelete={onClickDelete} />
          ))}
          <button className="add-note" onClick={onClickOpen}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
