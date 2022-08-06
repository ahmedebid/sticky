import Note from "./components/Note";
import logoIcon from "./images/logo.png";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {

  /* Initialize the notes state with the array stored in local storage.
   * If there is noting in the local storage, initialize with an empty array.
   */
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);

  // State to hold the search input
  const [searchInput, setSearchInput] = useState("");

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

  /* Filtering the notes based on the value in the searchInput state*/
  const filteredNotes = notes.filter(note => {
    return note.noteTitle.toLowerCase().includes(searchInput.toLowerCase()) || note.noteBody.toLowerCase().includes(searchInput.toLowerCase());
  });

  /* Mapping over the filtered notes to output a Note component for each of them.*/
  const notesList = filteredNotes.map(note => 
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
      <div className="logo">
        <img className="logo-icon" src={logoIcon} alt="logo" />
        <h1>Sticky</h1>
      </div>
      <input 
        type="text" 
        placeholder="Type here to search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={addNote}>ADD NOTE</button>
      <div className="notes-list">
        {notesList}
      </div>
    </main>
  );
}

export default App;