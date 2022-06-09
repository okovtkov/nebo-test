import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import HistoryContext from './context';
import { CharacterData } from './types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Main() {
  const [checkedCharacters, setCheckedCharacters] = useState<CharacterData[]>(() => {
    const json = sessionStorage.getItem('characters') || '[]';
    return JSON.parse(json);
  });

  const setCharactersAndSave = useCallback((characters: CharacterData[]) => {
    setCheckedCharacters(characters);
    sessionStorage.setItem('characters', JSON.stringify(characters));
  }, []);

  return (
    <React.StrictMode>
      <HashRouter>
        <HistoryContext.Provider value={{checkedCharacters, setCheckedCharacters: setCharactersAndSave}}>
          <App />
        </HistoryContext.Provider>
      </HashRouter>
    </React.StrictMode>
  )
}

root.render(
  <Main />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
