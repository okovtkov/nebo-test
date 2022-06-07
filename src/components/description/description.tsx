import './description.css';

interface Props {
  term: string;
  definition: string;
}

function Description(props: Props) {
  return (
    <div className="description">
      <dt className="description__term">{props.term}:</dt>
      <dd className="description__definition">{props.definition}</dd>
    </div>
  );
}

export default Description;
