export const characters = {
  get() {
    return fetch('https://swapi.dev/api/people/').then((resp) => resp.json());
  },

  getCharacterById(id) {
    return fetch(`https://swapi.dev/api/people/${id}`).then((resp) => resp.json());
  },

  searchCharacterByName(name) {
    return fetch(`https://swapi.dev/api/people/?search=${name}`).then((resp) => resp.json());
  },
}
