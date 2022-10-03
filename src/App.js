import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { SearchField } from './components/SearchComponent/Search';
import { ListComponent } from './components/ListComponent/List';

function App() {
 
  return (
    <>
    <div className="App" aria-label="main-container">
      <header className="app-header" aria-label="header-container">
        <h1 className="app-title" aria-label="pokedex-title">Pokedex
          <hr className="horizontal-line" aria-label="seperator"/>
          <span className="app-subtitle" aria-label="pokedex-subtitle"> Search for any Pokémon that exists on the planet</span>
        </h1>
      </header>
      <main aria-label="main-container">
        <SearchField />
        <ListComponent/>
      </main>
    </div>
    </>
  );
}

export default App;