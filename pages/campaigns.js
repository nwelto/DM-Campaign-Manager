import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getCampaign } from '../api/campaignData';
import CampaignCard from '../components/CampaignCard';

function ShowCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  const { user } = useAuth();

  const getAllCampaigns = () => {
    getCampaign(user.uid).then(setCampaigns);
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.firebaseKey} campaignObj={campaign} onUpdate={getAllCampaigns} />
        ))}
      </div>

    </div>
  );
}

export default ShowCampaigns;
