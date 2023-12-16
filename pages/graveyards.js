/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewGraveyardDetails } from '../api/mergedData';
import CharacterCard from '../components/CharacterCard';

export default function ViewGraveyard() {
  const [graveyardDetails, setGraveyardDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewGraveyardDetails(firebaseKey).then(setGraveyardDetails);
  }, [firebaseKey]);

  return (
    <div className="container mt-5">
      <div className="graveyard-details mb-4 d-flex align-items-center">
        <img src="/graveyard.png" alt="Graveyard" style={{ width: '400px' }} />
        <div className="text-white ms-5" style={{ flexShrink: 0 }}>
          <h5 style={{ fontSize: '3em' }}>Graveyard</h5>
        </div>
      </div>
      <div className="character-cards d-flex flex-wrap">
        {graveyardDetails.characters?.filter((character) => character.isDead).map((character) => (
          <CharacterCard
            key={character.firebaseKey}
            characterObj={character}
            graveyardName="Graveyard"
            onUpdate={() => viewGraveyardDetails(firebaseKey).then(setGraveyardDetails)}
          />
        ))}
      </div>
    </div>
  );
}
