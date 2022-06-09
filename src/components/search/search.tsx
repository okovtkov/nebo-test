import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { characters } from '../../api/api';
import { CharacterData } from '../../types';
import { getId } from '../../utils/get-id';
import './search.css';

function Search() {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<CharacterData[]>([]);

  useEffect(() => {
    if (value === '') {
      setData([]);
      return;
    }
    characters.searchCharacterByName(value).then((resp) => setData(resp));
  }, [value]);

  const onClick = (e: MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('.search__list') ||
      (e.target as HTMLElement).closest('.search__hint') ||
      (e.target as HTMLElement).closest('.search__input')
    ) setIsOpen(true);
    else setIsOpen(false);
    if ((e.target as HTMLElement).closest('a')) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="search">
      <input
        type="search"
        className="search__input"
        placeholder="Поиск..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {data.length && value ? (
        <ul className={classNames("search__list", {
          "search__list--opened": isOpen,
        })}>
          {data.map((item) => (
            <Link key={item.name} to={`characters/${getId(item.url)}`} className="search__link">
              <li className="search__item">{item.name}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className={classNames("search__hint", {
          "search__hint--opened": isOpen,
        })}>{!value ? 'Введите имя' : 'Ничего не найдено'}</div>
      )}
    </div>
  );
}

export default Search;
