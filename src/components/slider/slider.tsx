import Card from '../card/card';
import { CharacterData } from '../../types';
import './slider.css';
import HistoryContext from '../../context';
import { useCallback, useContext, useRef, useState } from 'react';

interface Props {
  data: CharacterData[] | [];
}

function Slider(props: Props) {
  const [counter, setCounter] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const {checkedCharacters} = useContext(HistoryContext);

  const onClick = useCallback((button: string) => {
    if (!container.current) return;
    const maxCounter = -checkedCharacters.length + 1;
    if ((counter === 0 && button === 'prev') || (counter <= maxCounter && button === 'next')) return;

    if (button === 'prev') {
      container.current.style.left = 310 * (counter + 1) + 'px';
      setCounter(counter + 1);
    } else {
      container.current.style.left = 310 * (counter - 1) + 'px';
      setCounter(counter - 1);
    }
  }, [checkedCharacters.length, counter]);

  return (
    <article className="slider">
      <h1 className="slider__title">Вы смотрели</h1>
      <div className="slider__container">
        <button className="slider__button slider__button--prev" onClick={() => onClick('prev')} />
        <ul className="slider__list">
          <div className="slider__list-container" ref={container}>
            {checkedCharacters.map((item) => (
              <li key={item.name}>
                <Card data={item} />
              </li>
            ))}
          </div>
        </ul>
        <button className="slider__button slider__button--next" onClick={() => onClick('next')} />
      </div>
    </article>
  );
}

export default Slider;
