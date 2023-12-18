import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import { deleteCampaign } from '../api/campaignData';

function CampaignCard({ campaignObj, onUpdate }) {
  const deleteThisCampaign = () => {
    if (window.confirm(`Delete ${campaignObj.name}?`)) {
      deleteCampaign(campaignObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '39rem', margin: '10px' }}>
      <div style={{ position: 'relative' }}>
        <Card.Img variant="top" src={campaignObj.image} style={{ height: '400px' }} />
        <Card.Title style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}
        >
          {campaignObj.name}
        </Card.Title>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Link href={`/campaign/${campaignObj.firebaseKey}`} passHref>
            <span>
              <FaEye style={{
                color: 'white',
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: '1.5rem',
                backgroundColor: 'black',
                borderRadius: '50%',
                padding: '5px',
              }}
              />
            </span>
          </Link>
          <Link href={`/campaign/edit/${campaignObj.firebaseKey}`} passHref>
            <span>
              <FaEdit style={{
                color: 'white',
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: '1.5rem',
                backgroundColor: 'black',
                borderRadius: '50%',
                padding: '5px',
              }}
              />
            </span>
          </Link>
          <FaTrashAlt
            style={{
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.5rem',
              backgroundColor: 'black',
              borderRadius: '50%',
              padding: '5px',
            }}
            onClick={deleteThisCampaign}
          />
        </div>
      </div>
      <Card.Body>
        {/* ...other campaign details... */}
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
