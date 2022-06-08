export const characters = {
  get() {
    return fetch('https://swapi.dev/api/people/').then((resp) => resp.json())
      .catch(alert);
  },

  getCharacterById(id) {
    return fetch(`https://swapi.dev/api/people/${id}`).then((resp) => resp.json())
      .catch(alert);
  },

  getPlanet(url) {
    return fetch(url).then((resp) => resp.json())
      .catch(alert);
  },

  getFilm(url) {
    return fetch(url).then((resp) => resp.json())
      .catch(alert);
  },

  getVehicle(url) {
    return fetch(url).then((resp) => resp.json())
      .catch(alert);
  },

  getStarship(url) {
    return fetch(url).then((resp) => resp.json())
      .catch(alert);
  },

  searchCharacterByName(name) {
    return fetch(`https://swapi.dev/api/people/?search=${name}`).then((resp) => resp.json())
      .catch(alert);
  },
}
