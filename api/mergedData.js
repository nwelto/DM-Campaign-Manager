import { getCampaignCharacters, getSingleCampaign, deleteSingleCampaign } from './campaignData';
import { getSingleCharacter, deleteCharacter } from './characterData';

const viewCharacterDetails = (characterFirebaseKey) => new Promise((resolve, reject) => {
  getSingleCharacter(characterFirebaseKey)
    .then((characterObj) => {
      getSingleCampaign(characterObj.campaign_id)
        .then((campaignObj) => {
          resolve({ campaignObj, ...characterObj });
        });
    }).catch((error) => reject(error));
});

const viewCampaignDetails = (campaignFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCampaign(campaignFirebaseKey), getCampaignCharacters(campaignFirebaseKey)])
    .then(([campaignObj, campaignCharactersArray]) => {
      resolve({ ...campaignObj, characters: campaignCharactersArray });
    }).catch((error) => reject(error));
});

const deleteCampaignCharacters = (campaignId) => new Promise((resolve, reject) => {
  getCampaignCharacters(campaignId).then((charactersArray) => {
    const deleteCharacterPromises = charactersArray.map((character) => deleteCharacter(character.firebaseKey));

    Promise.all(deleteCharacterPromises).then(() => {
      deleteSingleCampaign(campaignId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewCharacterDetails, viewCampaignDetails, deleteCampaignCharacters,
};
