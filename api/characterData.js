import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCharacter = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getCharactersByTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters.json?orderBy=team_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createCharacter = (payload) => new Promise((resolve, reject) => {
  console.warn('Payload to createCharacter', payload);
  fetch(`${endpoint}/Characters.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleCharacter = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCharacter = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCharacters = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const favoriteCharacters = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getCharacter,
  createCharacter,
  getSingleCharacter,
  deleteCharacter,
  updateCharacters,
  favoriteCharacters,
  getCharactersByTeam,
};
