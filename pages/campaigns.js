import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getCampaign } from '../api/campaignData';
import CampaignCard from '../components/CampaignCard';

function ShowCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getAllCampaigns = () => {
    getCampaign(user.uid).then(setCampaigns);
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  const handleAddCampaign = () => {
    router.push('/campaign/new');
  };

  return (
    <div className="text-center my-4">
      <Button onClick={handleAddCampaign} variant="dark" className="signin-btn">Add A Campaign</Button>
      <div className="d-flex flex-wrap">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.firebaseKey} campaignObj={campaign} onUpdate={getAllCampaigns} />
        ))}
      </div>

    </div>
  );
}

export default ShowCampaigns;
