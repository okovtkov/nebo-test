import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { characters } from '../../api/api';
import { Data } from '../../types';

function Character() {
  const [data, setData] = useState<Data | null>(null);
  const params = useParams();

  useEffect(() => {
    characters.getCharacterById(params.id).then((resp) => {
      setData(resp);
      console.log(resp)
    });
  }, [params.id]);

  if (data === null) return null

  return (
    <div className="character">
      
    </div>
  );
}

export default Character;
