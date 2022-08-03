import Note from "./components/Note";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {

  /* Initialize the notes state with the array stored in local storage.
   * If there is noting in the local storage, initialize with an empty array.
   */
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);

  // Save notes to local storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // A function to add a new note
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

  // A function to delete an existing note
  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id ));
  }

  // A function to update an existing note
  function updateNote(e, id) {
    const {name, value} = e.target;
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id
          ? { ...note, [name]: value }
          : note
    }));
  }

  /* Mapping over the notes state array to create a Note component for
   *  each element in the array. The resultant array will be used to render 
   * the Note components on the screen */
  const notesList = notes.map(note => 
    <Note 
      key={note.id} 
      id={note.id} 
      title={note.noteTitle} 
      body={note.noteBody}
      updateNote={updateNote} 
      deleteNote={deleteNote}
  />);

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
