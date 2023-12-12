import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function GraveyardCard({ graveyardObj }) {
  console.warn('Graveyard Object in Card:', graveyardObj);
  return (
    <Card style={{ width: '80rem', margin: '10px' }}>
      <Card.Title>{graveyardObj.name}</Card.Title>
      <Card.Img variant="top" src={graveyardObj.image} style={{ height: '400px' }} />
      <Card.Body>
        <Link href={`/graveyard/${graveyardObj.firebaseKey}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/graveyard/edit/${graveyardObj.firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

GraveyardCard.propTypes = {
  graveyardObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default GraveyardCard;
