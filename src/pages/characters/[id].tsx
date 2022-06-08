import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { characters } from '../../api/api';
import Container from '../../components/container/container';
import Description from '../../components/description/description';
import HistoryContext from '../../context';
import { CharacterData } from '../../types';

function Character() {
  const [data, setData] = useState<CharacterData | null>(null);
  const params = useParams();
  const {checkedCharacters, setCheckedCharacters} = useContext(HistoryContext);

  useEffect(() => {
    characters.getCharacterById(params.id).then((resp) => {
      setData(resp);
      const characters = [...checkedCharacters];
      const founded = characters.find((item) => item.name === resp.name);
      if (!founded) {
        setCheckedCharacters([resp, ...characters]);
      } else {
        const index = characters.findIndex((item) => item.name === resp.name);
        characters.splice(index, 1);
        setCheckedCharacters([resp, ...characters]);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, setCheckedCharacters]);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  if (data === null) return null;

  return (
    <div className="character">
      <Container className="character__container" label="Character">
        <Description term="Name" definition={data.name} />
        <Description term="Birth year" definition={data.birth_year} />
        <Description term="Height" definition={data.height} />
        <Description term="Mass" definition={data.mass} />
        <Description term="Hair color" definition={data.hair_color} />
        <Description term="Eye color" definition={data.eye_color} />
        <Description term="Skin color" definition={data.skin_color} />
        <Description term="Gender" definition={data.gender} />
      </Container>
    </div>
  );
}

export default Character;
