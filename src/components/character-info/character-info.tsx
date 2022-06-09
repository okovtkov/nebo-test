import { useContext, useEffect, useState } from 'react';
import { characters, films, vehicles, starships, planet } from '../../api/api';
import Container from '../../components/container/container';
import Description from '../../components/description/description';
import { CharacterData, FilmData, PlanetData, StarshipData, VehicleData } from '../../types';
import { useParams } from 'react-router-dom';
import HistoryContext from '../../context';
import './character-info.css';

function Character() {
  const [planetData, setPlanetData] = useState<PlanetData | null>(null);
  const [filmsData, setFilmsData] = useState<FilmData[] | []>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[] | []>([]);
  const [starshipsData, setStarshipsData] = useState<StarshipData[] | []>([]);
  const [data, setData] = useState<CharacterData | null>(null);
  const params = useParams();
  const {checkedCharacters, setCheckedCharacters} = useContext(HistoryContext);

  useEffect(() => {
    if (!params.id) throw new Error('Stranger things..');
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
    if (data) {
      planet.getByCharacter(data).then((resp) => setPlanetData(resp));
      films.getByCharacter(data).then((films) => setFilmsData(films));
      vehicles.getByCharacter(data).then((vehicles) => setVehiclesData(vehicles));
      starships.getByCharacter(data).then((starships) => setStarshipsData(starships));
    };
  }, [checkedCharacters, data]);

  if (data === null) return null;

  return (
    <div className="character-info">
      <Container className="character-info__container" label="Character" tag="dl">
        <Description term="Name" definition={data.name} />
        <Description term="Birth year" definition={data.birth_year} />
        <Description term="Height" definition={data.height} />
        <Description term="Mass" definition={data.mass} />
        <Description term="Hair color" definition={data.hair_color} />
        <Description term="Eye color" definition={data.eye_color} />
        <Description term="Skin color" definition={data.skin_color} />
        <Description term="Gender" definition={data.gender} />
      </Container>
      {planetData && (
        <Container tag="dl" className="character-info__container" label="Homeworld">
          <Description term="Name" definition={planetData.name} />
          <Description term="Climate" definition={planetData.climate} />
          <Description term="Rotation period" definition={planetData.rotation_period} />
          <Description term="Diameter" definition={planetData.diameter} />
          <Description term="Orbital Period" definition={planetData.orbital_period} />
          <Description term="Gravity" definition={planetData.gravity} />
          <Description term="Terrain" definition={planetData.terrain} />
          <Description term="Population" definition={planetData.population} />
        </Container>
      )}
      {filmsData.length > 0 && (
        <Container tag="dl" className="character-info__container" label="Films">
          {filmsData.map((film, i) => (
            <div key={film.title}>
              <Description term="Title" definition={film.title} />
              <Description term="Episode" definition={film.episode_id?.toString()} />
              <Description term="Director" definition={film.director} />
              {filmsData.length - 1 !== i && (
                <hr />
              )}
            </div>
          ))}
        </Container>
      )}
      {vehiclesData.length > 0 && (
        <Container tag="dl" className="character-info__container" label="Vehicles">
          {vehiclesData.map((vehicle, i) => (
            <div key={vehicle.name}>
              <Description term="Name" definition={vehicle.name} />
              <Description term="Model" definition={vehicle.model} />
              <Description term="Passengers" definition={vehicle.passengers} />
              {vehiclesData.length - 1 !== i && (
                <hr />
              )}
            </div>
          ))}
        </Container>
      )}
      {starshipsData.length > 0 && (
        <Container tag="dl" className="character-info__container" label="Starships">
          {starshipsData.map((starship, i) => (
            <div key={starship.name}>
              <Description term="Name" definition={starship.name} />
              <Description term="Model" definition={starship.model} />
              <Description term="Passengers" definition={starship.passengers} />
              {starshipsData.length - 1 !== i && (
                <hr />
              )}
            </div>
          ))}
        </Container>
      )}
    </div>
  );
}

export default Character;
