import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGraveyard = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/graveyards.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createGraveyard = (payload) => new Promise((resolve, reject) => {
  console.warn('Payload to creategraveyard', payload);
  fetch(`${endpoint}/graveyards.json`, {
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

const deleteSingleGraveyard = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/graveyards/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getGraveyardCharacters = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters.json?orderBy="graveyard_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleGraveyard = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/graveyards/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteGraveyard = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/graveyards/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateGraveyard = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/graveyards/${payload.firebaseKey}.json`, {
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

const favoriteGraveyard = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/graveyards.json?orderBy="uid"&equalTo="${uid}"`, {
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
  getGraveyard,
  createGraveyard,
  getSingleGraveyard,
  deleteGraveyard,
  updateGraveyard,
  favoriteGraveyard,
  getGraveyardCharacters,
  deleteSingleGraveyard,
};
