import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import { Note } from './types';
import { dummyNotesList } from './constants';

export function FaveNotes({ notes }: { notes: Note[] }) {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    console.log("Favorite notes updated:", notes.filter(note => note.isFavorite));
  }, [notes]); // This will run every time the notes state updates.

  return (
    <div>
      <h2>List of favorites:</h2>
      <ol className="no-indent">
          {notes.filter(note => note.isFavorite).map(note => (
            <li key={note.id}>{note.title}</li>
          ))}
      </ol>
    </div>
  );
}
export function ToggleTheme() {
 const [currentTheme, setCurrentTheme] = useState(themes.light);

 const toggleTheme = () => {
   setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
 };

 return (
   <ThemeContext.Provider value={currentTheme}>
     <button onClick={toggleTheme}> Toggle Theme </button>
   </ThemeContext.Provider>
 );
}

