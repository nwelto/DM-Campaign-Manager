/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CharacterCard from '../components/CharacterCard';
import { useAuth } from '../utils/context/authContext';
import { viewGraveyardDetails } from '../api/mergedData';

export default function ViewGraveyard() {
  const [graveyardDetails, setGraveyardDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth(); // Use the useAuth hook to get the current user

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (user?.uid) {
      viewGraveyardDetails(firebaseKey).then((data) => {
        // Filter the characters by the user's UID
        const userCharacters = data.characters?.filter((character) => character.uid === user.uid && character.isDead);
        setGraveyardDetails({ ...data, characters: userCharacters });
      });
    }
  }, [user, firebaseKey]);

  return (
    <div className="container mt-5">
      <div className="graveyard-details mb-4 d-flex align-items-center">
        <img src="/graveyard.png" alt="Graveyard" style={{ width: '400px' }} />
        <div className="text-white ms-5" style={{ flexShrink: 0 }}>
          <h5 style={{ fontSize: '3em' }}>Graveyard</h5>
        </div>
      </div>
      <div className="character-cards d-flex flex-wrap">
        {graveyardDetails.characters?.map((character) => (
          <CharacterCard
            key={character.firebaseKey}
            characterObj={character}
            graveyardName="Graveyard"
            onUpdate={() => viewGraveyardDetails(firebaseKey).then((data) => {
              const userCharacters = data.characters?.filter((char) => char.uid === user.uid && char.isDead);
              setGraveyardDetails({ ...data, characters: userCharacters });
            })}
          />
        ))}
      </div>
    </div>
  );
}
