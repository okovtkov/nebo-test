export const characters = {
  get() {
    return fetch('https://swapi.dev/api/people/').then((resp) => resp.json());
  },

  getCharacterById(id) {
    return fetch(`https://swapi.dev/api/people/${id}`).then((resp) => resp.json());
  }
}
