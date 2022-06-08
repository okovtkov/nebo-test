import { CharacterData, FilmData, PlanetData, VehicleData, StarshipData } from "../types";

export const characters = {
  get(): Promise<CharacterData[]> {
    return fetch('https://swapi.dev/api/people/').then((resp) => resp.json()).then((resp) => resp.results)
      .catch(alert);
  },

  getCharacterById(id: string): Promise<CharacterData> {
    return fetch(`https://swapi.dev/api/people/${id}`).then((resp) => resp.json())
      .catch(alert);
  },

  searchCharacterByName(name: string): Promise<CharacterData[]> {
    return fetch(`https://swapi.dev/api/people/?search=${name}`).then((resp) => resp.json())
      .then((resp) => resp.results)
      .catch(alert);
  },
};

export const films = {
  getByCharacter(character: CharacterData): Promise<FilmData[]> {
    return Promise.all(character.films.map((url) => {
      return fetch(url).then((resp) => resp.json());
    }))
  }
};

export const planet = {
  getByCharacter(character: CharacterData): Promise<PlanetData> {
    return fetch(character.homeworld).then((resp) => resp.json());
  }
};

export const vehicles = {
  getByCharacter(character: CharacterData): Promise<VehicleData[]> {
    return Promise.all(character.vehicles.map((url) => {
      return fetch(url).then((resp) => resp.json());
    }))
  }
};

export const starships = {
  getByCharacter(character: CharacterData): Promise<StarshipData[]> {
    return Promise.all(character.starships.map((url) => {
      return fetch(url).then((resp) => resp.json());
    }))
  }
};
