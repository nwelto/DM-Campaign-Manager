import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getCharacter } from '../api/characterData';
import { viewCharacterDetails } from '../api/mergedData';
import CharacterCard from '../components/CharacterCard';

function ShowCharacters() {
  const [characterDetails, setCharacterDetails] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

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

  const handleAddCharacter = () => {
    router.push('/character/new');
  };

  return (
    <div className="text-center my-4">
      <Button onClick={handleAddCharacter} variant="dark" className="signin-btn">Add A Character</Button>
      <div className="d-flex flex-wrap">
        {characterDetails.map((character) => (
          <CharacterCard key={character.firebaseKey} characterObj={character} campaignName={character.campaignObj?.name} onUpdate={getAllCharacters} />
        ))}
      </div>
    </div>
  );
}

export default ShowCharacters;
