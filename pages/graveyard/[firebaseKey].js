/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewGraveyardDetails } from '../../api/mergedData';
import CharacterCard from '../../components/CharacterCard';

export default function ViewGraveyard() {
  const [graveyardDetails, setGraveyardDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewGraveyardDetails(firebaseKey).then(setGraveyardDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={graveyardDetails.image} alt={graveyardDetails.name} style={{ width: '400px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5 style={{ fontSize: '3em' }}>{graveyardDetails.name} </h5>
      </div>
      <div className="cardContainer d-flex flex-wrap">{graveyardDetails.characters?.map((character) => (
        <CharacterCard key={character.firebaseKey} characterObj={character} graveyardName={graveyardDetails.name} onUpdate={viewGraveyardDetails} />
      ))}
      </div>
    </div>

  );
}
