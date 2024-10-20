import './App.css';
import { Label, Note } from "./types"; 
import { useNotes } from './hooksExercise'; // Import useNotes custom hook
import { useTheme } from './hooksExercise'; // Import useTheme custom hook
import { FaveNotes } from "./hooksExercise"; // Import FaveNotes component
import { themes } from "./themeContext";
import React from 'react';

export const StickyNotes = () => {
    const { notes, handleToggleFavorite, createNote, updateNote, deleteNote } = useNotes(); // Use notes hook
    const { currentTheme, toggleTheme } = useTheme(); // Use theme hook

    const initialNote: Note = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        isFavorite: false,
    };

    const [createNoteState, setCreateNoteState] = React.useState(initialNote);

    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        createNote({ ...createNoteState, id: notes.length + 1 });
        setCreateNoteState(initialNote); // Reset form state after submission
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
            <input 
                placeholder="Note Title"
                value={createNoteState.title} // Use controlled input
                onChange={(event) => 
                    setCreateNoteState({ ...createNoteState, title: event.target.value })
                }
                required
            />
        </div>
        <div>
            <textarea
                placeholder="Note Content"
                value={createNoteState.content} // Use controlled input
                onChange={(event) => 
                setCreateNoteState({ ...createNoteState, content: event.target.value })
                }
                required
            />
        </div>
        <select 
            onChange={(event) => 
                setCreateNoteState({ ...createNoteState, label: event.target.value as Label })
            }
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
                    className="note-item" 
                    style={{
                        backgroundColor: currentTheme.card,
                        color: currentTheme.text,
                        border: `2px solid ${currentTheme.border}`,
                    }}
                >
                <div className="notes-header">
                    <button onClick={() => handleToggleFavorite(note.id)}>
                        {note.isFavorite ? '❤️' : '🤍'}
                    </button>
                    <button onClick={() => deleteNote(note.id)}>x</button>
                </div>
                <div 
                    className="edit-text"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => updateNote({ ...note, title: e.currentTarget.textContent || '' })}
                    style={{ cursor: 'text' }}
                >
                    <h2>{note.title}</h2>
                </div>
                <div 
                    className="edit-text"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => updateNote({ ...note, content: e.currentTarget.textContent || '' })}
                    style={{ cursor: 'text' }}
                >
                    <p>{note.content}</p>
                </div>
                <select 
                    className="edit-text"
                    onChange={(event) => updateNote({ ...note, label: event.target.value as Label })}
                    value={note.label} // Use controlled select
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
        <div className="footer">
            <button 
                className="mode" 
                onClick={toggleTheme} // Use toggleTheme from the custom hook
                style={{ 
                backgroundColor: currentTheme.card,
                color: currentTheme.text,
                border: `2px solid ${currentTheme.border}`,
            }}
            >
                {currentTheme === themes.dark ? 'Light' : 'Dark'} 
            </button>
            <FaveNotes notes={notes}/> 
        </div>
    </div>
  );
}