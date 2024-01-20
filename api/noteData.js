import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getNotes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createNotes = (payload) => new Promise((resolve, reject) => {
  console.warn('Payload to createnotes', payload);
  fetch(`${endpoint}/Notess.json`, {
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

const getSingleNotes = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteNotes = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateNotes = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${payload.firebaseKey}.json`, {
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

export {
  getNotes,
  createNotes,
  getSingleNotes,
  deleteNotes,
  updateNotes,
};
