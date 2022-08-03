import Note from "./components/Note";
import {useState} from "react";
import { nanoid } from "nanoid";

function App() {

  const [notes, setNotes] = useState([]);

  function addNote() {
    setNotes(prevNotes => [
      ...prevNotes,
      {
        id: nanoid(),
        noteTitle: "",
        noteBody: ""
      }
    ]);
  }

  function updateNote(e, id) {
    const {name, value} = e.target;
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id
          ? { ...note, [name]: value }
          : note
    }));
  }

  const notesList = notes.map(note => 
    <Note 
      key={note.id} 
      id={note.id} 
      title={note.noteTitle} 
      body={note.noteBody}
      updateNote={updateNote} 
  />);

  console.log(notes);

  return (
    <main>
      <h1>Sticky</h1>
      <input 
        type="text" 
        placeholder="Type here to search..."
        // value={name}
        // onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addNote}>ADD NOTE</button>
      <div className="notes-list">
        {notesList}
      </div>
    </main>
  );
}

export default App;
