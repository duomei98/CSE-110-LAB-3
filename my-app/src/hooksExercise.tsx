import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import { Note } from './types';
import { dummyNotesList } from './constants';

// Function that favorites notes
export function FaveNotes({ notes }: { notes: Note[] }) {
  // use theme defined in ThemeContext
  const theme = useContext(ThemeContext);
  // every time the notes state updates, log it in console
  useEffect(() => {
    console.log("Favorite notes updated:", notes.filter(note => note.isFavorite));
  }, [notes]); 

  // filter notes for all favorited notes, then map each favorited note to a list item
  // containing the notes title; sets its key prop to note.id so React can tell which 
  // items changed
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
// function that switches between light and dark mode
export const useTheme = () => {
  // starts with light mode 
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const toggleTheme = () => {
    // on button click, switches the value of the isDarkTheme state, with setter
    // function setIsDarkTheme
    setIsDarkTheme(prev => !prev);
  };

  const currentTheme = isDarkTheme ? themes.dark : themes.light;

  return { currentTheme, toggleTheme };
};

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  const handleToggleFavorite = (noteId: number) => {
    // creates new list of notes with the note with id matching argument switching 
    // its favorited status
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
  };

  const createNote = (newNote: Note) => {
    // adds newNote into the list of notes with setter function setNotes
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const updateNote = (updatedNote: Note) => {
    // updates the note with id matching argument
    setNotes(prevNotes => 
      prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (noteId: number) => {
    // updates notes with all notes except the one that matches argument id
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  return { notes, handleToggleFavorite, createNote, updateNote, deleteNote };
};

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

