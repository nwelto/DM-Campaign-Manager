import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCampaign } from '../api/campaignData';

function CampaignCard({ campaignObj, onUpdate }) {
  const deleteThisCampaign = () => {
    if (window.confirm(`Delete ${campaignObj.name}?`)) {
      deleteCampaign(campaignObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={campaignObj.image} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{campaignObj.name}</Card.Title>
        <Link href={`/campaign/${campaignObj.firebaseKey}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/campaign/edit/${campaignObj.firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCampaign} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CampaignCard.propTypes = {
  campaignObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CampaignCard;
