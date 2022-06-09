import Card from '../card/card';
import './slider.css';
import HistoryContext from '../../context';
import { useCallback, useContext, useState } from 'react';

function Slider() {
  const [counter, setCounter] = useState(0);
  const {checkedCharacters} = useContext(HistoryContext);

  const onClickPrev = useCallback(() => {
    if (counter === 0) return;
    setCounter(counter + 1);
  }, [counter]);

  const onClickNext = useCallback(() => {
    const maxCounter = -checkedCharacters.length + 1;
    if (counter <= maxCounter) return;
    setCounter(counter - 1);
  }, [checkedCharacters.length, counter]);

  return (
    <article className="slider">
      <h1 className="slider__title">Вы смотрели</h1>
      <div className="slider__container">
        <button className="slider__button slider__button--prev" onClick={onClickPrev}>
          ◀
        </button>
        <ul className="slider__list">
          {checkedCharacters.map((item, i) => (
            <li
              style={i === 0 ? {'marginLeft': 310 * counter + 'px'} : {}}
              key={item.name}
              className="slider__item"
            >
              <Card data={item} />
            </li>
          ))}
        </ul>
        <button className="slider__button slider__button--next" onClick={onClickNext}>
          ▶
        </button>
      </div>
    </article>
  );
}

export default Slider;
