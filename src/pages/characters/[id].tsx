import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { characters } from '../../api/api';
import Container from '../../components/container/container';
import Description from '../../components/description/description';
import HistoryContext from '../../context';
import { CharacterData, FilmData, PlanetData, StarshipData, VehicleData } from '../../types';

function Character() {
  const [data, setData] = useState<CharacterData | null>(null);
  const [planet, setPlanet] = useState<PlanetData | null>(null);
  const [films, setFilms] = useState<FilmData[] | []>([]);
  const [vehicles, setVehicles] = useState<VehicleData[] | []>([]);
  const [starships, setStarships] = useState<StarshipData[] | []>([]);
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
    if (data) {
      characters.getPlanet(data.homeworld).then((resp) => setPlanet(resp));
      Promise.all(data.films.map((url) => {
        return characters.getFilm(url).then((resp) => resp);
      })).then((films) => setFilms(films));
      Promise.all(data.vehicles.map((url) => {
        return characters.getFilm(url).then((resp) => resp);
      })).then((films) => setVehicles(films));
      Promise.all(data.starships.map((url) => {
        return characters.getStarship(url).then((resp) => resp);
      })).then((starships) => setStarships(starships));
    };
  }, [data]);

  const styles = {
    'display': 'flex',
    'alignItems': 'flex-start',
    'flex-wrap': 'wrap',
  };

  if (data === null) return null;

  return (
    <div className="character" style={styles}>
      <Container className="character__container" label="Character" tag="dl">
        <Description term="Name" definition={data.name} />
        <Description term="Birth year" definition={data.birth_year} />
        <Description term="Height" definition={data.height} />
        <Description term="Mass" definition={data.mass} />
        <Description term="Hair color" definition={data.hair_color} />
        <Description term="Eye color" definition={data.eye_color} />
        <Description term="Skin color" definition={data.skin_color} />
        <Description term="Gender" definition={data.gender} />
      </Container>
      {planet && (
        <Container tag="dl" className="character__container" label="Homeworld">
          <Description term="Name" definition={planet.name} />
          <Description term="Climate" definition={planet.climate} />
          <Description term="Rotation period" definition={planet.rotation_period} />
          <Description term="Diameter" definition={planet.diameter} />
          <Description term="Orbital Period" definition={planet.orbital_period} />
          <Description term="Gravity" definition={planet.gravity} />
          <Description term="Terrain" definition={planet.terrain} />
          <Description term="Population" definition={planet.population} />
        </Container>
      )}
      {films.length > 0 && (
        <Container tag="dl" className="character__container" label="Films">
          {films.map((film, i) => (
            <>
              <Description term="Title" definition={film.title} />
              <Description term="Episode" definition={film.episode_id.toString()} />
              <Description term="Director" definition={film.director} />
              {films.length - 1 !== i && (
                <hr />
              )}
            </>
          ))}
        </Container>
      )}
      {vehicles.length > 0 && (
        <Container tag="dl" className="character__container" label="Vehicles">
          {vehicles.map((vehicle, i) => (
            <>
              <Description term="Name" definition={vehicle.name} />
              <Description term="Model" definition={vehicle.model} />
              <Description term="Passengers" definition={vehicle.passengers} />
              {vehicles.length - 1 !== i && (
                <hr />
              )}
            </>
          ))}
        </Container>
      )}
      {starships.length > 0 && (
        <Container tag="dl" className="character__container" label="Starships">
          {starships.map((starship, i) => (
            <>
              <Description term="Name" definition={starship.name} />
              <Description term="Model" definition={starship.model} />
              <Description term="Passengers" definition={starship.passengers} />
              {starships.length - 1 !== i && (
                <hr />
              )}
            </>
          ))}
        </Container>
      )}
    </div>
  );
}

export default Character;
