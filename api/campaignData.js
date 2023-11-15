import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCampaign = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/campaigns.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createCampaign = (payload) => new Promise((resolve, reject) => {
  console.warn('Payload to createCampaign', payload);
  fetch(`${endpoint}/campaigns.json`, {
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

const deleteSingleCampaign = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/campaigns/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCampaignCharacters = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/characters.json?orderBy="campaign_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleCampaign = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/campaigns/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCampaign = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/campaigns/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCampaign = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/campaigns/${payload.firebaseKey}.json`, {
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

const favoriteCampaign = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/campaigns.json?orderBy="uid"&equalTo="${uid}"`, {
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
  getCampaign,
  createCampaign,
  getSingleCampaign,
  deleteCampaign,
  updateCampaign,
  favoriteCampaign,
  getCampaignCharacters,
  deleteSingleCampaign,
};
