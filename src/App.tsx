import { useCallback, useEffect, useState } from 'react';
import { characters } from './api/api';
import { Routes, Route } from 'react-router-dom';
import Card from './components/card/card';
import './App.css';
import Character from './pages/characters/[id]';
import Search from './components/search/search';
import { CharacterData } from './types';
import { Link } from 'react-router-dom';
import Slider from './components/slider/slider';

function App() {
  const [data, setData] = useState<CharacterData[] | []>([]);

  const getId = useCallback((url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  }, []);

  useEffect(() => {
    characters.get().then((resp) => setData(resp))
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
                <Link key={item.name} to={`/characters/${getId(item.url)}`}>
                  <Card data={item} />
                </Link>
              ))}
            </div>
            <Slider />
          </div>
        } />
        <Route path='/characters/:id' element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
