import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import {
  FaSkull, FaHeartbeat, FaEdit, FaTrashAlt, FaEye,
} from 'react-icons/fa';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteCharacter, toggleIsDeadStatus } from '../api/characterData';

function CharacterCard({ characterObj, onUpdate }) {
  const handleToggleIsDead = () => {
    toggleIsDeadStatus(characterObj.firebaseKey, !characterObj.isDead)
      .then(() => onUpdate())
      .catch((error) => console.error('Error toggling isDead status:', error));
  };

  const deleteThisCharacter = () => {
    if (window.confirm(`Delete ${characterObj.name}?`)) {
      deleteCharacter(characterObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px', position: 'relative' }}>
      <Card.Img variant="top" src={characterObj.image} alt={characterObj.name} style={{ height: '350px' }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Link href={`/character/${characterObj.firebaseKey}`} passHref>
          <span>
            <FaEye style={{
              color: 'white', cursor: 'pointer', marginRight: '10px', fontSize: '1.5rem', backgroundColor: 'black', borderRadius: '50%', padding: '5px',
            }}
            />
          </span>
        </Link>
        <Link href={`/character/edit/${characterObj.firebaseKey}`} passHref>
          <span>
            <FaEdit style={{
              color: 'white', cursor: 'pointer', marginRight: '10px', fontSize: '1.5rem', backgroundColor: 'black', borderRadius: '50%', padding: '5px',
            }}
            />
          </span>
        </Link>
        <FaTrashAlt
          style={{
            color: 'white', cursor: 'pointer', fontSize: '1.5rem', backgroundColor: 'black', borderRadius: '50%', padding: '5px',
          }}
          onClick={deleteThisCharacter}
        />
      </div>
      <Card.Body>
        <Card.Title>{characterObj.name}</Card.Title>
        <h6>Class: {characterObj.class}</h6>
        <h6>AC: {characterObj.ac}</h6>
        <h6>HP: {characterObj.hp}</h6>
        <Button
          variant="link"
          style={{
            color: characterObj.isDead ? 'green' : 'red',
          }}
          onClick={handleToggleIsDead}
        >
          {characterObj.isDead ? <FaHeartbeat /> : <FaSkull />}
        </Button>
      </Card.Body>
    </Card>
  );
}

CharacterCard.propTypes = {
  characterObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    notes: PropTypes.string,
    class: PropTypes.string,
    ac: PropTypes.number,
    hp: PropTypes.number,
    str: PropTypes.number,
    dex: PropTypes.number,
    con: PropTypes.number,
    int: PropTypes.number,
    wisdom: PropTypes.number,
    cha: PropTypes.number,
    firebaseKey: PropTypes.string,
    isDead: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CharacterCard;
