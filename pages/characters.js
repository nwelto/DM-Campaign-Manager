import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getCharacter } from '../api/characterData';
import { viewCharacterDetails } from '../api/mergedData';
import CharacterCard from '../components/CharacterCard';

function ShowCharacters() {
  const [characterDetails, setCharacterDetails] = useState([]);
  const { user } = useAuth();

  const getAllCharacters = () => {
    getCharacter(user.uid).then((characterList) => {
      const livingCharacters = characterList.filter((character) => !character.isDead);

      Promise.all(livingCharacters.map((character) => viewCharacterDetails(character.firebaseKey)))
        .then(setCharacterDetails);
    });
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {characterDetails.map((character) => (
          <CharacterCard key={character.firebaseKey} characterObj={character} campaignName={character.campaignObj?.name} onUpdate={getAllCharacters} />
        ))}
      </div>
    </div>
  );
}

export default ShowCharacters;
