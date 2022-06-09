import classNames from 'classnames';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CharacterData } from '../../types';
import Description from '../description/description';
import './card.css';

interface Props {
  data: CharacterData;
  className?: string;
}

function Card(props: Props) {
  const getId = useCallback((url: string) => {
    const arr = url.split('/');
    return arr[arr.length - 2];
  }, []);

  return (
    <Link key={props.data.name} to={`/characters/${getId(props.data.url)}`}>
      <div className={classNames("card", props.className)}>
        <dl>
          <Description term="Name" definition={props.data.name} />
          <Description term="Gender" definition={props.data.gender} />
        </dl>
      </div>
    </Link>
  );
}

export default Card;
