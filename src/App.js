import Note from "./components/Note";

function App() {
  return (
    <main>
      <h1>Sticky</h1>
      <div className="notes-list">
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
    </main>
  );
}

export default App;
