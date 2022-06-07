import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Data } from '../../types';
import './card.css';

interface Props {
  data: Data;
}

function Card(props: Props) {
  return (
    <div className="card">
      <dl>
        <div className="card__list">
          <dt className="card__dl">Name:</dt>
          <dd className="card__dd">{props.data.name}</dd>
        </div>
        <div className="card__list">
          <dt className="card__dl">Gender:</dt>
          <dd className="card__dd">{props.data.gender}</dd>
        </div>
      </dl>
    </div>
  );
}

export default Card;
