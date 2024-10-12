import './App.css';
import { Label,Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { FaveNotes, ToggleTheme } from "./hooksExercise";
import React, { useState } from 'react';
import { ThemeContext, themes } from './themeContext'; // Import the ThemeProvider

function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  const [isDarkTheme, setIsDarkTheme] = useState(false); 

  const handleToggleFavorite = (noteId: number) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
  };

  const currentTheme = isDarkTheme ? themes.dark : themes.light;
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const handleUpdateNote = (field: keyof Note, value: string) => {
    const updatedNote = { ...selectedNote, [field]: value };
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
    setSelectedNote(updatedNote);
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <div 
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        padding: "20px",
      }}
    className='app-container'
    >
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input placeholder="Note Title"
          onChange={(event) =>
            setCreateNote({...createNote, title: event.target.value})}
          required>
          </input>
        </div>

        <div>
          <textarea
          placeholder="Note Content"
          onChange={(event) =>
            setCreateNote({...createNote, content: event.target.value})}
            required>
          </textarea>
          
        </div>
        <select 
          onChange={(event) =>
            setCreateNote({...createNote, label: event.target.value as Label})}
          id="labels" 
          required
        >
	        <option value={Label.personal}>Personal</option>
		<option value={Label.work}>Work</option>
		<option value={Label.study}>Study</option>
		<option value={Label.other}>Other</option>
	      </select>
        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item" style={{
              backgroundColor: currentTheme.card,
              color: currentTheme.text,
              border: `2px solid ${currentTheme.border}`,
            }}>
            <div className="notes-header">
              <button onClick={() => handleToggleFavorite(note.id)}>
                {note.isFavorite ? '❤️' : '🤍'}
              </button>
              <button>
                <button onClick={() => handleDeleteNote(note.id)}>x</button>
              </button>
            </div>
            <div className = "edit-text"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => handleUpdateNote('title', e.currentTarget.textContent || '')}
              onInput={(e) => handleUpdateNote('title', e.currentTarget.textContent || '')}
              style={{ cursor: 'text' }}
            >
              <h2> {note.title} </h2>
            </div>
            <div className = "edit-text"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => handleUpdateNote('content', e.currentTarget.textContent || '')}
              onInput={(e) => handleUpdateNote('content', e.currentTarget.textContent || '')}
              style={{ cursor: 'text' }}
            >
              <p>{note.content}</p>
            </div>
            <select className = "edit-text"
              onChange={(event) =>
                handleUpdateNote('label', event.target.value)
              }
              defaultValue={note.label}
              style={{ cursor: 'pointer' }}
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.work}>Work</option>
              <option value={Label.study}>Study</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>
        ))}
      </div>	
      <nav>
        <button className="mode" onClick={() => setIsDarkTheme(prev => !prev)} style={{ 
          backgroundColor: currentTheme.card,
          color: currentTheme.text,
          border: `2px solid ${currentTheme.border}`,
        }}>
          {isDarkTheme ? 'Light' : 'Dark'} 
        </button>
        <FaveNotes notes={notes}/> 
      </nav>
    </div>
  );
}

export default App;

