/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewCampaignDetails } from '../../api/mergedData';
import CharacterCard from '../../components/CharacterCard';

export default function ViewCampaigns() {
  const [campaignDetails, setCampaignDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getCampaignDetails = () => {
    viewCampaignDetails(firebaseKey).then(setCampaignDetails);
  };

  useEffect(() => {
    viewCampaignDetails(firebaseKey).then(setCampaignDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={campaignDetails.image} alt={campaignDetails.name} style={{ width: '400px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5 style={{ fontSize: '3em' }}>{campaignDetails.name} </h5>
      </div>
      <div className="cardContainer d-flex flex-wrap">{campaignDetails.characters?.map((character) => (
        <CharacterCard key={character.firebaseKey} characterObj={character} campaignName={campaignDetails.name} onUpdate={getCampaignDetails} />
      ))}
      </div>
    </div>

  );
}
