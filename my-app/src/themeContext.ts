// ThemeContext.ts
import React from 'react';

export const themes = {
  light: {
    primary: 'rgb(255, 185, 151)',
    background: 'rgb(255, 185, 151)',
    card: 'rgb(246, 126, 125)',
    text: 'rgb(11, 3, 45)',
    border: 'rgb(132, 59, 98)',
  },
  dark: {
    primary: 'rgb(132, 59, 98)',
    background: 'rgb(11, 3, 45)',
    card: 'rgb(132, 59, 98)',
    text: 'rgb(255, 185, 151)',
    border: 'rgb(132, 59, 98)',
  }
};

export const ThemeContext = React.createContext(themes.light);


