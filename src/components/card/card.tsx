import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CharacterData } from '../../types';
import { getId } from '../../utils/get-id';
import Description from '../description/description';
import './card.css';

interface Props {
  data: CharacterData;
  className?: string;
}

function Card(props: Props) {
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
