import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { characters } from '../../api/api';
import Description from '../../components/description/description';
import { Data } from '../../types';

function Character() {
  const [data, setData] = useState<Data | null>(null);
  const params = useParams();

  useEffect(() => {
    characters.getCharacterById(params.id).then((resp) => setData(resp));
  }, [params.id]);

  if (data === null) return null;

  return (
    <div className="character">
      <Description term="Birth year" definition={data.birth_year} />
      <Description term="Height" definition={data.height} />
      <Description term="Mass" definition={data.mass} />
      <Description term="Hair color" definition={data.hair_color} />
      <Description term="Skin color" definition={data.skin_color} />
      <Description term="Gender" definition={data.gender} />
    </div>
  );
}

export default Character;
