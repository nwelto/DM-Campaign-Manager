import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCampaign } from '../../../api/campaignData';
import CampaignForm from '../../../components/forms/CampaignForm';

export default function EditCampaign() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCampaign(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CampaignForm obj={editItem} />);
}
