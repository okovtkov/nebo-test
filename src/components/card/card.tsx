import { CharacterData } from '../../types';
import Description from '../description/description';
import './card.css';

interface Props {
  data: CharacterData;
}

function Card(props: Props) {
  return (
    <div className="card">
      <dl>
        <Description term="Name" definition={props.data.name} />
        <Description term="Gender" definition={props.data.gender} />
      </dl>
    </div>
  );
}

export default Card;
