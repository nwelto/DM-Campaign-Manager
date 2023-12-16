/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewCampaignDetails } from '../../api/mergedData';
import CharacterCard from '../../components/CharacterCard';

export default function ViewCampaigns() {
  const [campaignDetails, setCampaignDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCampaignDetails(firebaseKey).then(setCampaignDetails);
  }, [firebaseKey]);

  return (
    <div className="container mt-5">
      <div className="campaign-details mb-4 d-flex align-items-center">
        <img src={campaignDetails.image} alt={campaignDetails.name} style={{ width: '400px' }} />
        <div className="text-white ms-5 details" style={{ flexShrink: 0 }}>
          <h5 style={{ fontSize: '3em' }}>{campaignDetails.name}</h5>
        </div>
      </div>
      <div className="character-cards d-flex flex-wrap">
        {campaignDetails.characters?.filter((character) => !character.isDead).map((character) => (
          <CharacterCard
            key={character.firebaseKey}
            characterObj={character}
            campaignName={campaignDetails.name}
            onUpdate={() => viewCampaignDetails(firebaseKey).then(setCampaignDetails)}
          />
        ))}
      </div>
    </div>
  );
}
