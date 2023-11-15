/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewCampaignDetails } from '../../api/mergedData';

export default function ViewCampaigns() {
  const [campaignDetails, setCampaignDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCampaignDetails(firebaseKey).then(setCampaignDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={campaignDetails.image} alt={campaignDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{campaignDetails.name} </h5>
      </div>
    </div>
  );
}
