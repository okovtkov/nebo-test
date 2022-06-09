import { useContext, useEffect, useState } from 'react';
import { characters } from './api/api';
import { Routes, Route } from 'react-router-dom';
import Card from './components/card/card';
import './App.css';
import CharacterPage from './pages/characters/[id]';
import Search from './components/search/search';
import { CharacterData } from './types';
import Slider from './components/slider/slider';
import HistoryContext from './context';

function App() {
  const [data, setData] = useState<CharacterData[] | []>([]);
  const {checkedCharacters} = useContext(HistoryContext);

  useEffect(() => {
    characters.get().then((resp) => setData(resp));
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <Search />
      </header>
      <Routes>
        <Route path='/' element={
          <div className="app__container">
            <div className="app__cards">
              {data.length !== 0 && data.map((item: CharacterData) => (
                <Card key={item.name} data={item} className="app__card" />
              ))}
            </div>
            {checkedCharacters.length !== 0 && (
              <Slider />
            )}
          </div>
        } />
        <Route path='/characters/:id' element={<CharacterPage />} />
      </Routes>
    </div>
  );
}

export default App;
